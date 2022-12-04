import { PostEntity } from "../../entities/postEntity.js";
import { PostModel } from "../../models/postModel.js";
import { PostRepository } from "../postRepository.js";

export class MongoPostRepository implements PostRepository {
  async create(doc: PostEntity) {
    return PostModel.create(doc);
  }

  async update(doc: PostEntity) {
    const updated = await PostModel.updateOne({ _id: doc.id }, doc);
    return updated.modifiedCount;
  }

  async findById(id: string): Promise<PostEntity | null> {
    return PostModel.findById({ _id: id });
  }

  async findAll(): Promise<PostEntity[]> {
    return PostModel.find();
  }

  async delete(id: string) {
    const postDelete = await PostModel.deleteOne({ _id: id });
    return postDelete.deletedCount;
  }
}
