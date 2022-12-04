import { PostEntity } from "../entities/postEntity.js";
import { InMemoryRepository } from "../repositories/inMemoryRepository/inMemoryRepository.js";
import { GetPostByIdService } from "./getPostByIdService.js";



describe("getPostByIdService", () => {
  const postRepository = new InMemoryRepository();
  const sut = new GetPostByIdService(postRepository);

  it("Should be an error with ID does not exists", async () => {
    const result = await sut.execute("123");
    expect(result).toBeInstanceOf(Error);
  });

  it("Should be an postEntity with ID exists", async () => {
    await postRepository.loadDefaultData();
    const result = await sut.execute("123456");
    expect(result).toBeInstanceOf(PostEntity);
  });
});
