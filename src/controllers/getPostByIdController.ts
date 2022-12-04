import { Request, Response } from "express";
import {
  clientErrorResponse,
  serverErrorResponse,
  sucessfulResponse,
} from "../utils/appResponses.js";
import { MongoPostRepository } from "../repositories/mongoRepository/mongoPostRepository.js";
import { GetPostByIdService } from "../services/getPostByIdService.js";

class GetPostByIdController {
  async handle(req: Request, res: Response) {
    try {
      const id: string = req.params["id"];

      const mongoRepository = new MongoPostRepository();
      const postService = new GetPostByIdService(mongoRepository);
      const result = await postService.execute(id);

      if (result instanceof Error) {
        return clientErrorResponse(res, result);
      }

      return sucessfulResponse(res, result);
    } catch (error) {
      return serverErrorResponse(res, error as Error);
    }
  }
}

export const getPostByIdController = new GetPostByIdController();
