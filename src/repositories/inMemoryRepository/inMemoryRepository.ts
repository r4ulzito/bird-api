import { PostEntity } from "../../entities/postEntity.js";
import { PostRepository } from "../postRepository.js";

export class InMemoryRepository implements PostRepository {
  list: PostEntity[] = [];

  async create(doc: PostEntity) {
    this.list.push(doc);
    return doc;
  }

  async update(doc: PostEntity) {
    const entity = this.list.find((entity) => {
      return entity.id === doc.id;
    }) as PostEntity;

    const index = this.list.indexOf(entity);
    this.list[index] = doc;

    return 1;
  }

  async findById(id: string): Promise<PostEntity | null> {
    const entity = this.list.find((entity) => {
      return entity.id === id;
    });

    return entity ?? null;
  }

  async findAll(): Promise<PostEntity[]> {
    return this.list;
  }

  async delete(id: string) {
    const entity = this.list.find((entity) => {
      return entity.id === id;
    }) as PostEntity;

    const index = this.list.indexOf(entity);

    if (index > -1 && entity) {
      this.list.splice(index, 1);
      return index;
    }

    return -1;
  }

  async clearRepository() {
    this.list.splice(0, this.list.length);
  }

  async loadDefaultData() {
    const postEntity = new PostEntity({
      id: "123456",
      name: "João Pobre",
      scientificName: "Serpophaga nigricans",
      sighting: "Beira de lago",
      sightingDate: new Date(),
      sightingHour: "1",
      observation: `Ele vive em beira de lagoas, rios e açudes se alimentando de insetos
           capturados em voo. Há espécies da Argentina ao sudeste do Brasil.`,
      img: "https://ciclovivo.com.br/wp-content/uploads/2014/05/joao-pobre.jpg",
    });
    this.list.push(postEntity);
  }
}
