import request from "supertest";
import { App } from "../app.js";
import { mongoInMemoryDatabase } from "../helper/tests/mongoInMemory/mongoInMemoryDatabase.js";

describe("Delete Post Controller", () => {
  beforeAll(async () => {
    await mongoInMemoryDatabase.open();
  });

  afterAll(async () => {
    await mongoInMemoryDatabase.close();
  });

  beforeEach(async () => {
    await mongoInMemoryDatabase.createData();
  });

  const app = new App();
  it("Should return a status 200 if delete is success", async () => {
    const firstPost = await mongoInMemoryDatabase.getFirstPost();

    await request(app.express)
      .delete(`/post/${firstPost._id}`)
      .expect(200);
  });
  it("Should return a status 404 if delete is failed", async () => {
    await request(app.express)
      .delete(`/post/635b568546577096e7234680`)
      .expect(404);
  });
});
