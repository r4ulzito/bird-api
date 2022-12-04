import { Response } from "express";

export const sucessfulResponse = (res: Response, data: any, status?: number) => {
  const statusCode = status ? status : 200; 
  return res.status(statusCode).json(data);
};

export const clientErrorResponse = (res: Response, e: Error, status?: number) => {
  const statusCode = status ? status : 400; 
  return res.status(statusCode).json({
    message: e.message,
  });
};

export const serverErrorResponse = (res: Response, e: Error, status?: number) => {
  const statusCode = status ? status : 500; 
  return res.status(statusCode).json({
    message: e.message,
  });
};
