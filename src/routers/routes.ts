import { Request, Response, Router } from "express";
import { createPostController } from "../controllers/createPostController.js";
import { deletePostController } from "../controllers/deletePostController.js";
import { getAllPostsController } from "../controllers/getAllPostsController.js";
import { getPostByIdController } from "../controllers/getPostByIdController.js";
import { updatePostController } from "../controllers/updatePostController.js";

const routes = Router();
const pathPost = "/post";
const pathPosts = "/posts";

routes.get("/", (_, res: Response) => {
  return res.status(301).redirect("/posts");
});

routes.post(pathPosts, createPostController.handle);

routes.get(pathPosts, getAllPostsController.handle);

routes.get(`${pathPost}/:id`, getPostByIdController.handle);

routes.put(pathPosts, updatePostController.handle);

routes.delete(`${pathPost}/:id`, deletePostController.handle);

export { routes };
