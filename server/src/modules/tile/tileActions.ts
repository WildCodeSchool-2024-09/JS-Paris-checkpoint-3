import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all tile from the database
    const tile = await tileRepository.readAll();

    // Respond with the tile in JSON format
    res.json(tile);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
const validate: RequestHandler = async (req, res, next) => {
  const tile = {
    coord_x: req.body.coord_x,
    coord_y: req.body.coord_y,
  };

  const affectedRows = await tileRepository.readByCoordinates(
    tile.coord_x,
    tile.coord_y,
  );

  if (affectedRows.length === 0) {
    res.sendStatus(422);
  } else {
    next();
  }
};

export default {
  browse,
  validate,
};
