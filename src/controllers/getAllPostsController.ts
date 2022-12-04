import { Request, Response } from "express";
import {
  clientErrorResponse,
  serverErrorResponse,
  sucessfulResponse,
} from "../utils/appResponses.js";
import { MongoPostRepository } from "../repositories/mongoRepository/mongoPostRepository.js";
import { GetAllPostsService } from "../services/getAllPostsService.js";

class GetAllPostsController {
  async handle(req: Request, res: Response) {
    try {
      const mongoRepository = new MongoPostRepository();
      const getAllPostService = new GetAllPostsService(mongoRepository);
      const result = await getAllPostService.execute();

      return sucessfulResponse(res, result);
    } catch (error) {
      return serverErrorResponse(res, error as Error);
    }
  }
}

export const getAllPostsController = new GetAllPostsController();
