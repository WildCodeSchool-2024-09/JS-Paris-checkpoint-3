
import type { NextFunction, Request, RequestHandler, Response } from "express";
import tileRepository from "../tile/tileRepository";

const validate: RequestHandler = async (
  req: Request, 
  res: Response, 
  next: NextFunction,
) => {
  const { coord_x, coord_y } = req.body;

  const isValidCoordX = 
  typeof coord_x === 'number' && coord_x >= 0 && coord_x <= 11;
  const isValidCoordY = 
  typeof coord_y === 'number' && coord_y >= 0 && coord_y <= 5;

  if (isValidCoordX && isValidCoordY) {
    return next();
  }
    return res.sendStatus(422);
  }

export default {
  validate,
};
