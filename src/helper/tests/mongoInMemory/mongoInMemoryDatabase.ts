import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { decrementDay } from "../../../utils/dateUtils.js";

class MongoInMemoryDatabase {
  private mongoServer?: MongoMemoryServer;
  private static instance: MongoInMemoryDatabase;

  private constructor() {}

  public static getInstance() {
    if (!MongoInMemoryDatabase.instance) {
      MongoInMemoryDatabase.instance = new MongoInMemoryDatabase();
    }
    return MongoInMemoryDatabase.instance;
  }

  public async open() {
    try {
      this.mongoServer = await MongoMemoryServer.create();

      const uri = this.mongoServer.getUri();
      await mongoose.connect(uri);
    } catch (error) {
      console.log("Failed to create database.");
      console.log(error);
      throw error;
    }
  }
  public async close() {
    try {
      await mongoose.connection.dropDatabase();
      await mongoose.disconnect();
      if (this.mongoServer) {
        await this.mongoServer.stop();
      }
    } catch (error) {
      console.log("Failed to close to database.");
      console.log(error);
      throw error;
    }
  }

  public async clear() {
    try {
      const collections = mongoose.connection.collections;
      for (const nameCollection in collections) {
        const collection = collections[nameCollection];
        await collection.deleteMany({});
      }
    } catch (error) {
      console.log("Failed to clean the collections in memory.");
      console.log(error);
      throw error;
    }
  }

  public async createData() {
    try {
      const post = mongoose.connection.collection("posts");
      await post.insertOne({
        name: "Arara Azul",
        scientificName: "Anodorhynchus hyacinthinus",
        sighting: "Amazonas",
        sightingDate: decrementDay(2),
        sightingHour: "10:40",
        observation: "A arara-azul é uma espécie de arara que se destaca pela beleza de suas penas azul-cobalto e por seu tamanho, sendo a maior espécie do grupo dos psitacídeos.",
        img: "https://s1.static.brasilescola.uol.com.br/be/conteudo/images/arara-azul.jpg",
    });
    } catch (error) {
      console.log("Failed to launch database collections.");
      console.log(error);
      throw error;
    }
  }

  async getFirstPost() {
    try {
      const post = mongoose.connection.collection("posts");
      const allPosts = await post.find().toArray();

      return allPosts[0];
    } catch (error) {
      console.log("Something went wrong finding the posts.");
      console.log(error);
      throw error;
    }
  }
}

export const mongoInMemoryDatabase = MongoInMemoryDatabase.getInstance();
