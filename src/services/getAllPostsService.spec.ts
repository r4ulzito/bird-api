import { describe, expect, it } from "@jest/globals";
import { PostEntity } from "../entities/postEntity.js";
import { GetAllPostsService } from "./getAllPostsService.js";
import { InMemoryRepository } from "../repositories/inMemoryRepository/inMemoryRepository.js";

describe("GetAllPostService", () => {
    const inMemoryRepository = new InMemoryRepository();
    const sut = new GetAllPostsService(inMemoryRepository);

    it("should be return a post entity array", async () => {
        const postEntity = new PostEntity({
            name: "Pardal Novo",
            scientificName: "Pardal científico",
            sighting: "Na árvore",
            sightingDate: new Date(),
            sightingHour: "1",
            observation: "string",
            img: "string",
        });

        await inMemoryRepository.create(postEntity);

        const posts = await sut.execute() as PostEntity[];

        expect(Array.isArray(posts)).toBeTruthy();
        expect(posts[0].name).toBe("Pardal Novo");
    });
});
