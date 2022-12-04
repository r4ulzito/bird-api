import { PostRepository } from "../repositories/postRepository.js";

export class DeletePostService {
  constructor(private readonly postRepository: PostRepository) {}
  async execute(id: string) {
    try {
      const postEntity = await this.postRepository.findById(id);
      if (!postEntity) {
        return new Error("Post does not exists!");
      }

      const response = await this.postRepository.delete(id);

      return response;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
