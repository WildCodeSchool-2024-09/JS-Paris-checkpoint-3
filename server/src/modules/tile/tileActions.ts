import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const tiles = await tileRepository.readAll();
    if (tiles.length > 0) res.status(200).json(tiles);
    else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  try {
    const coordX = req.body.coord_x;
    const coordY = req.body.coord_y;
    const tiles = await tileRepository.readByCoordinates(coordX, coordY);
    if (tiles.length > 0) next();
    else res.sendStatus(422);
  } catch (error) {
    next(error);
  }
};

export default {
  browse,
  validate,
};
