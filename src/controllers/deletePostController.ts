import { Request, Response } from "express";
import {
  clientErrorResponse,
  serverErrorResponse,
  sucessfulResponse,
} from "../utils/appResponses.js";
import { MongoPostRepository } from "../repositories/mongoRepository/mongoPostRepository.js";
import { DeletePostService } from "../services/deletePostService.js";

export class DeletePostController {
  async handle(req: Request, res: Response) {
    try {
      const id: string = req.params["id"];

      const mongoRepository = new MongoPostRepository();
      const deletePostService = new DeletePostService(mongoRepository);
      const result = await deletePostService.execute(id);

      if (result instanceof Error) {
        return clientErrorResponse(res, result, 404);
      }

      return sucessfulResponse(res, result);
    } catch (error) {
      console.log(error as string)
      return serverErrorResponse(res, error as Error)
    }
  }
}

export const deletePostController = new DeletePostController();
