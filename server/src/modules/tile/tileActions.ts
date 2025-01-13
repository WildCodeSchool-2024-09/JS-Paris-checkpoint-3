import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const tiles = await tileRepository.readAll();
    res.json(tiles);
  } catch (err) {
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  try {
    const { coord_x, coord_y } = req.body;
    if (!Number.isInteger(coord_x) || !Number.isInteger(coord_y)) {
      res.status(422).json({ error: "Invalid coordinates: must be integers." });
      return;
    }
    const tile = await tileRepository.readByCoordinates(coord_x, coord_y);

    if (tile.length === 0) {
      res.sendStatus(422);
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  validate,
};
