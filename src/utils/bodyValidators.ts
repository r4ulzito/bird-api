import { PostEntity } from "../entities/postEntity.js";

export const createPostBodyValitador = (post: PostEntity) => {
  if (new Date(post.sightingDate) > new Date()) {
    return new Error("Creation date cannot be less than the sighting date");
  }
  if (!post.name) {
    return new Error("Name is required");
  }
  if (!post.img) {
    return new Error("Image URL is required");
  }
  if (!post.sighting) {
    return new Error("Sighting is required");
  }
  if (!post.sightingDate) {
    return new Error("SightingDate is required");
  }
};

export const updatePostBodyValidator = (id: string) => {
  if (!id) {
    return new Error("ID is required");
  }
};
