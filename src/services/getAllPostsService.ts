import { PostRepository } from "../repositories/postRepository.js";

export class GetAllPostsService {
  constructor(private readonly postRepository: PostRepository) {}

  async execute() {
    try {
      const result = await this.postRepository.findAll();

      return result;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
