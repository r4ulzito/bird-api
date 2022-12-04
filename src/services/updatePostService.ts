import { PostRepository } from "../repositories/postRepository.js";

export interface UpdateProps {
  id: string;
  name?: string;
  scientificName?: string;
  sighting?: string;
  sightingDate?: Date;
  sightingHour?: string;
  observation?: string;
  img?: string;
}

export class UpdatePostService {
  constructor(private repository: PostRepository) {}

  async execute(doc: UpdateProps) {
    try {
      const postEntity = await this.repository.findById(doc.id);

      if (!postEntity) {
        return new Error("Post does not exists");
      }

      postEntity.name = doc.name ?? postEntity.name;
      postEntity.scientificName =
        doc.scientificName ?? postEntity.scientificName;
      postEntity.sighting = doc.sighting ?? postEntity.sighting;
      postEntity.sightingDate = doc.sightingDate ?? postEntity.sightingDate;
      postEntity.sightingHour = doc.sightingHour ?? postEntity.sightingHour;
      postEntity.observation = doc.observation ?? postEntity.observation;
      postEntity.img = doc.img ?? postEntity.img;

      const result = await this.repository.update(postEntity);

      return result;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
