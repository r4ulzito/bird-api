import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
} from "@jest/globals";
import { PostEntity } from "../../entities/postEntity.js";
import { mongoInMemoryDatabase } from "../../helper/tests/mongoInMemory/mongoInMemoryDatabase.js";
import { MongoPostRepository } from "./mongoPostRepository.js";

describe("postRepository", () => {
  beforeAll(async () => {
    await mongoInMemoryDatabase.open();
  });

  afterEach(async () => {
    await mongoInMemoryDatabase.clear();
  });

  afterAll(async () => {
    await mongoInMemoryDatabase.close();
  });

  const postEntity = new PostEntity({
    name: "Pardal Novo",
    scientificName: "Pardal científico",
    sighting: "Na árvore",
    sightingDate: new Date(),
    sightingHour: "1",
    observation: "string",
    img: "string",
  });

  const sut = new MongoPostRepository();

  describe("Create", () => {
    it("Should create a post Entity", async () => {
      const entityCreated = await sut.create(postEntity);

      expect(entityCreated).not.toBeNull();
      expect(entityCreated.name).toBe("Pardal Novo");
      expect(entityCreated).toHaveProperty("sightingDate");
    });
  });

  describe("GetAllPosts", () => {
    it("Should return a posts array", async () => {
      await sut.create(postEntity);
      const posts = await sut.findAll();

      expect(Array.isArray(posts)).toBeTruthy;
      expect(posts[0].name).toBe("Pardal Novo");
    });

    it("Should return a empty array if not have posts", async () => {
      const posts = await sut.findAll();

      expect(posts.length).toBe(0);
    });
  });

  describe("Delete", () => {
    it("Should return an entity and delete it", async () => {
      const postEntityCreated = await sut.create(postEntity);
      const postEntitydelete = await sut.delete(postEntityCreated.id);

      expect(postEntitydelete).toBe(1);
    });

    it("Should be a null value if id does not exists", async () => {
      const entityDeleted = await sut.delete("609269995b2e888426d019ef");

      expect(entityDeleted).toBe(0);
    });
  });
});
