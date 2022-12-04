import { model, Schema } from "mongoose";
import { PostEntity } from "../entities/postEntity.js";

const postSchema = new Schema<PostEntity>({
    name: {
        type: String,
        required: true,
    },
    scientificName: {
        type: String,
    },
    sighting: {
        type: String,
        required: true,
    },
    sightingDate: {
        type: Date,
        required: true
    },
    sightingHour: {
        type: String,
        required: true
    },
    observation: {
        type: String,
    },
    img: {
        type: String,
        required: true,
    },
});

export const PostModel = model<PostEntity>("post", postSchema, "posts");
