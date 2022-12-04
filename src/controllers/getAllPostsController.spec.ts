import request from "supertest";
import { App } from "../app.js";
import { mongoInMemoryDatabase } from "../helper/tests/mongoInMemory/mongoInMemoryDatabase.js";

describe("getAllPostsController", () => {
  beforeAll(async () => {
    await mongoInMemoryDatabase.open();
  });

  afterAll(async () => {
    await mongoInMemoryDatabase.close();
  });

  beforeEach(async () => {
    await mongoInMemoryDatabase.createData();
  });

  afterEach(async () => {
    await mongoInMemoryDatabase.clear();
  });

  const app = new App();
  it("Should return a 200 status if the requisition is successful", async () => {
    await request(app.express).get("/posts").expect(200);
  });

  it("Should return an empty array if there are no posts in the database", async () => {
    await mongoInMemoryDatabase.clear();

    const response = await request(app.express).get("/posts").expect(200);

    expect(response.body.length).toBe(0);
  });

  it("Should return a 404 status if the url not is valid", async () => {
    await request(app.express).get("/poasd").expect(404);
  });
});
