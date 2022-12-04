import { PostEntity } from "../entities/postEntity.js";
import { InMemoryRepository } from "../repositories/inMemoryRepository/inMemoryRepository.js";
import { UpdatePostService } from "./updatePostService.js";

describe("UpdatePostService", () => {
  const postRepository = new InMemoryRepository();
  const sut = new UpdatePostService(postRepository);

  beforeAll(async () => {
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

    await postRepository.create(postEntity);
  });

  it("Should be an error if Post ID does not exists", async () => {
    const postRequest = {
      id: "1234567",
      name: "João Rico",
      scientificName: "Serpophaga nigricans",
      sighting: "Beira de lago",
      sightingDate: new Date(),
      sightingHour: "1",
      observation: `Ele vive em beira de lagoas, rios e açudes se alimentando de insetos
                 capturados em voo. Há espécies da Argentina ao sudeste do Brasil.`,
      img: "https://ciclovivo.com.br/wp-content/uploads/2014/05/joao-pobre.jpg",
    };
    const result = await sut.execute(postRequest);

    expect(result).toBeInstanceOf(Error);
  });

  it("Should be 1 as a result", async () => {
    const postRequest = {
      id: "123456",
      name: "João Rico",
      scientificName: "Serpophaga nigricans",
      sighting: "Beira de lago",
      sightingDate: new Date(),
      sightingHour: "1",
      observation: `Ele vive em beira de lagoas, rios e açudes se alimentando de insetos
                 capturados em voo. Há espécies da Argentina ao sudeste do Brasil.`,
      img: "https://ciclovivo.com.br/wp-content/uploads/2014/05/joao-pobre.jpg",
    };
    const result = await sut.execute(postRequest);

    expect(result).toBe(1);
  });
});
