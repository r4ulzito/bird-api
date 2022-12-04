import { afterEach, describe, expect, it } from "@jest/globals";
import { PostEntity } from "../entities/postEntity.js";
import { InMemoryRepository } from "./inMemoryRepository/inMemoryRepository.js";

describe("PostRepository", () => {
  const sut = new InMemoryRepository();

  const postEntity = new PostEntity({
    id: "123456",
    name: "Pardal Novo",
    scientificName: "Pardal científico",
    sighting: "Na árvore",
    sightingDate: new Date(),
    sightingHour: "1",
    observation: "string",
    img: "string",
  });

  afterEach(async () => {
    await sut.clearRepository();
  });

  describe("Create", () => {
    it("Should create a post Entity", async () => {
      await sut.create(postEntity);

      expect(sut.list[0]).not.toBeNull();
      expect(sut.list[0].name).toBe("Pardal Novo");
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
      await sut.clearRepository();
      const posts = await sut.findAll();

      expect(posts.length).toBe(0);
    });
  });

  describe("Delete", () => {
    it("Should return an entity and delete it", async () => {
      await sut.create(postEntity);
      const postEntitydelete = await sut.delete("123456");

      expect(postEntitydelete).toBe(0);
    });

    it("Should be a null value if id does not exists", async () => {
      const entityDeleted = await sut.delete("123456");

      expect(entityDeleted).toBe(-1);
    });
  });
});
