import { PostEntity } from "../entities/postEntity.js";

export interface PostRepository {
  create(doc: PostEntity): Promise<PostEntity>;
  update(doc: PostEntity): Promise<number>;
  findById(id: string): Promise<PostEntity | null>
  findAll(): Promise<PostEntity[]>;
  delete(id: string): Promise<number>;
}
