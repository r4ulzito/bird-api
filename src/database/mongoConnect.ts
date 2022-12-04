import mongoose from "mongoose";
export class MongoDB {
  async MongoConnect() {
    try {
      const uri = process.env.MONGO_URL || "mongodb://localhost:27017/";
      await mongoose.connect(uri, {
        dbName: process.env.MONGO_DATABASE ?? "default",
      });
      console.log("Database has been inicialize with sucessful");
    } catch (error) {
      console.log(error);
    }
  }

  async MongoDisconnect() {
    try {
      await mongoose.disconnect();
    } catch (error) {
      console.log(error);
    }
  }
}
