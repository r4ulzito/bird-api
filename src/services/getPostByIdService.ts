import { PostRepository } from "../repositories/postRepository.js";

export class GetPostByIdService {
  constructor(private repository: PostRepository) {}

  async execute(id: string) {
    try {
      const post = await this.repository.findById(id);
      if (!post) {
        return new Error("Post does not exists!");
      }

      return post;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
