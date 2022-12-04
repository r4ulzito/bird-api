import { Request, Response } from "express";
import { Error } from "mongoose";
import {
  clientErrorResponse,
  serverErrorResponse,
  sucessfulResponse,
} from "../utils/appResponses.js";
import { createPostBodyValitador } from "../utils/bodyValidators.js";
import { MongoPostRepository } from "../repositories/mongoRepository/mongoPostRepository.js";

import { CreatePostService } from "../services/createPostService.js";

class CreatePostController {
  async handle(req: Request, res: Response) {
    try {
      const body = req.body;
      const err = createPostBodyValitador(body);
      if (err) {
        return clientErrorResponse(res, err);
      }

      const mongoRepository = new MongoPostRepository();
      const createPostService = new CreatePostService(mongoRepository);
      const result = await createPostService.execute(body);

      return sucessfulResponse(res, result);
    } catch (error) {
      return serverErrorResponse(res, error as Error);
    }
  }
}

export const createPostController = new CreatePostController();
