import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
import { PostEntity } from "../entities/postEntity.js";
import { InMemoryRepository } from "../repositories/inMemoryRepository/inMemoryRepository.js";
import { DeletePostService } from "./deletePostService.js";

describe("Delete Post Service", () => {
  beforeEach(async () => {
    await inMemoryRepository.create(postEntity);
  });

  const inMemoryRepository = new InMemoryRepository();
  const deletePostServiceStub = new DeletePostService(inMemoryRepository);
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
  it("Should be 0 if delete sucessful", async () => {
    const postDeletedCount = (await deletePostServiceStub.execute(
      "123456"
    )) as number;

    expect(postDeletedCount).toBe(0);
  });
  it("Should return an Error if delete fail", async () => {
    const postDeletedCount = await deletePostServiceStub.execute("1234");
    expect(postDeletedCount).toBeInstanceOf(Error);
  });
});
