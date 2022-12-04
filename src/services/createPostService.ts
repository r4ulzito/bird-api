import { PostEntity } from "../entities/postEntity.js";
import { PostRepository } from "../repositories/postRepository.js";

export class CreatePostService {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(post: PostEntity) {
    try {
      const response = await this.postRepository.create({
        ...post,
      });

      return response;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
