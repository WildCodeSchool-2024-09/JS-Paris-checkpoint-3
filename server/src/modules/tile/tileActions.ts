import { ne } from "@faker-js/faker/.";
import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const tiles = await tileRepository.readAll();
    res.json(tiles);
    // your code here
  } catch (err) {
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  try {
    const { coord_x, coord_y } = req.body;
    const coordinates = await tileRepository.readByCoordinates(
      coord_x,
      coord_y,
    );
    if (coord_x < 0 || coord_x > 11 || coord_y < 0 || coord_y > 5) {
      res.sendStatus(422);
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
  // your code here
};

const edit: RequestHandler = async (req, res, next) => {
  const tiles = {
    id: Number(req.params.id),
    coord_x: Number(req.body.coord_x),
    coord_y: Number(req.body.coord_y),
  };
  const affectedRows = await tileRepository.update(tiles);
  if (affectedRows === 0) {
    res.sendStatus(404);
  } else {
    res.sendStatus(204);
  }

  // your code here
};

export default {
  browse,
  validate,
  edit,
};
