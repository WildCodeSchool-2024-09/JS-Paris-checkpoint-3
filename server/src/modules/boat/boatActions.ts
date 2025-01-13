import type { RequestHandler } from "express";

import boatRepository from "./boatRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const boats = await boatRepository.readAll();

    res.json(boats);
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  const Boats = {
    id: Number(req.params.id),
    name: req.body.name,
    coord_x: req.body.coord_x,
    coord_y: req.body.coord_y,
  };

  const affectedRows = await boatRepository.update(Boats);

  if (affectedRows === 0) {
    res.sendStatus(404);
  } else {
    res.sendStatus(204);
  }
};

export default {
  browse,
  edit,
};
