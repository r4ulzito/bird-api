import { App } from "../app.js";
import request from "supertest";
import { mongoInMemoryDatabase } from "../helper/tests/mongoInMemory/mongoInMemoryDatabase.js";

beforeAll(async () => {
  await mongoInMemoryDatabase.open();
});

afterAll(async () => {
  await mongoInMemoryDatabase.close();
});

beforeEach(async () => {
  await mongoInMemoryDatabase.createData();
});
describe("GetPostByIdController", () => {
  const app = new App();

  it("Should return a status 404 if post does not exists", async () => {
    const firstPost = await mongoInMemoryDatabase.getFirstPost();

    await request(app.express).get(`/post/`).expect(404);
  });

  it("Should return a status 200 if post exists", async () => {
    const firstPost = await mongoInMemoryDatabase.getFirstPost();

    await request(app.express).get(`/post/${firstPost._id}`).expect(200);
  });
});
