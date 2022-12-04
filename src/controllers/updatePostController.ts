import { Request, Response } from "express";
import {
  clientErrorResponse,
  serverErrorResponse,
  sucessfulResponse,
} from "../utils/appResponses.js";
import { MongoPostRepository } from "../repositories/mongoRepository/mongoPostRepository.js";
import { UpdatePostService } from "../services/updatePostService.js";
import { updatePostBodyValidator } from "../utils/bodyValidators.js";

class UpdatePostController {
  async handle(req: Request, res: Response) {
    try {
      const body = req.body;
      const err = updatePostBodyValidator(body.id);
      if (err) {
        return clientErrorResponse(res, err);
      }

      const mongoRepository = new MongoPostRepository();
      const postService = new UpdatePostService(mongoRepository);
      const result = await postService.execute(body);

      if (result instanceof Error) {
        return clientErrorResponse(res, result, 404);
      }

      return sucessfulResponse(res, result);
    } catch (error) {
      return serverErrorResponse(res, error as Error);
    }
  }
}

export const updatePostController = new UpdatePostController();
