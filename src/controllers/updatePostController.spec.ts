import request from "supertest";
import { App } from "../app.js";
import { mongoInMemoryDatabase } from "../helper/tests/mongoInMemory/mongoInMemoryDatabase.js";

describe("UpdatePostController", () => {
  beforeAll(async () => {
    await mongoInMemoryDatabase.open();
  }, 60_000);

  afterAll(async () => {
    await mongoInMemoryDatabase.close();
  });

  beforeEach(async () => {
    await mongoInMemoryDatabase.createData();
  });

  const app = new App();
  
  it("It must be an error if the request came without the post ID", async () => {
    await request(app.express)
      .put("/posts")
      .send({
        name: "João Rico",
        scientificName: "Serpophaga nigricans",
        sighting: "Beira de lago",
        sightingDate: new Date(),
        sightingHour: "1",
        observation: `Ele vive em beira de lagoas, rios e açudes se alimentando de insetos
                 capturados em voo. Há espécies da Argentina ao sudeste do Brasil.`,
        img: "https://ciclovivo.com.br/wp-content/uploads/2014/05/joao-pobre.jpg",
        
      })
      .expect(400);
  });

  it("Should return a status 200", async () => {
    const firstPost = await mongoInMemoryDatabase.getFirstPost();

    await request(app.express)
      .put("/posts")
      .send({
        id: firstPost._id,
        name: "João Rico",
        scientificName: "Serpophaga nigricans",
        sighting: "Beira de lago",
        sightingDate: new Date(),
        sightingHour: "1",
        observation: `Ele vive em beira de lagoas, rios e açudes se alimentando de insetos
                 capturados em voo. Há espécies da Argentina ao sudeste do Brasil.`,
        img: "https://ciclovivo.com.br/wp-content/uploads/2014/05/joao-pobre.jpg",
      })
      .expect(200);
  });
});
