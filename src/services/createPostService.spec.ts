import { describe, it } from "@jest/globals";
import { PostEntity } from "../entities/postEntity.js";
import { InMemoryRepository } from "../repositories/inMemoryRepository/inMemoryRepository.js";
import { CreatePostService } from "./createPostService.js";

describe("Create Post Service", () => {
    const inMemoryRepository = new InMemoryRepository();
    const sut = new CreatePostService(inMemoryRepository);
    
    it("Should create and return a post entity", async () => {
        const postEntity = new PostEntity({
            id: "123456",
            name: "João Pobre",
            scientificName: "Serpophaga nigricans",
            sighting: "Beira de lago",
            sightingDate: new Date(),
            sightingHour: "1",
            observation: `Ele vive em beira de lagoas, rios e açudes se alimentando de insetos
           capturados em voo. Há espécies da Argentina ao sudeste do Brasil.`,
            img: "https://ciclovivo.com.br/wp-content/uploads/2014/05/joao-pobre.jpg",
        });
        const postCreated = await sut.execute(postEntity) as PostEntity;

        expect(postCreated.name).toBe("João Pobre");
    });
});