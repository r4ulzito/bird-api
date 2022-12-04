import request from "supertest";
import { App } from "../app.js";
import { decrementDay, incrementDay } from "../utils/dateUtils.js";
import { mongoInMemoryDatabase } from "../helper/tests/mongoInMemory/mongoInMemoryDatabase.js";

describe("CreatePostController", () => {
  beforeAll(async () => {
    await mongoInMemoryDatabase.open();
  }, 60_000);

  afterAll(async () => {
    await mongoInMemoryDatabase.close();
  });

  afterEach(async () => {
    await mongoInMemoryDatabase.clear();
  });

  const app = new App();

  it("Should create and return a status 200", async () => {
    await request(app.express)
      .post("/posts")
      .send({
        name: "Pardal",
        scientificName: "Pardal científico",
        sighting: "Na árvore",
        sightingDate: decrementDay(2),
        sightingHour: "1",
        observation: "string",
        img: "string",
      })
      .expect(200);
  });

  it("Should return a 400 status if sightingDate is greater than createDate", async () => {
    await request(app.express)
      .post("/posts")
      .send({
        name: "Pardal",
        scientificName: "Pardal científico",
        sighting: "Na árvore",
        sightingDate: incrementDay(2),
        sightingHour: 1,
        observation: "string",
        img: "string",
      })
      .expect(400);
  });
});
