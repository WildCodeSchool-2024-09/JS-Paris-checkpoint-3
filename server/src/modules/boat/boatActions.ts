import type { RequestHandler } from "express";

import boatRepository from "./boatRepository";
import type { Boat } from "./boatRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all boats from the database
    const boats = await boatRepository.readAll();

    // Respond with the boats in JSON format
    res.json(boats);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const boatId = Number.parseInt(req.params.id, 10);
    const { coord_x, coord_y, name } = req.body;

    if (!Number.isInteger(boatId)) {
      res.status(400).json({ error: "Invalid boat ID." });
    } else {
      const fieldsToUpdate: Partial<Boat> = { id: boatId };
      if (Number.isInteger(coord_x)) fieldsToUpdate.coord_x = coord_x;
      if (Number.isInteger(coord_y)) fieldsToUpdate.coord_y = coord_y;
      if (typeof name === "string") fieldsToUpdate.name = name;

      const isUpdated = await boatRepository.update(fieldsToUpdate);

      if (!isUpdated) {
        res.status(404).json({ error: "Boat not found." });
      } else {
        res.status(204).end();
      }
    }
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  edit,
};
