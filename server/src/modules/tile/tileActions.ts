import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  // your code here
  try {
    const tile = await tileRepository.readAll();
    res.json(tile);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  // your code here
  try {
    const tile = await tileRepository.readByCoordinates(
      req.body.coord_x,
      req.body.coord_y,
    );
    if (tile?.length === 0) {
      res.sendStatus(422);
    } else {
      next();
    }
  } catch (error) {
    next();
  }
};

// put your validation rules here

export default {
  browse,
  validate,
};
