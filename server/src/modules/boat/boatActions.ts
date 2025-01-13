import type { RequestHandler } from "express";
import boatRepository from "../boat/boatRepository";
import tileRepository from "../tile/tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const boats = await boatRepository.readAll();
    res.status(200).json(boats);
  } catch (err) {
    console.error("Error fetching boats:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const blackPearl = (await boatRepository.readAll()).find(
      (boat) => boat.name === "Black Pearl",
    );

    if (blackPearl == null) {
      res.status(404).json({ message: "Black Pearl not found" });
      return;
    }

    const updatedBoatData = { coord_x: 1, coord_y: 1 };

    const affectedBoats = await boatRepository.update(
      blackPearl.id,
      updatedBoatData,
    );

    if (affectedBoats === 0) {
      res.sendStatus(404);
      return;
    }

    const treasureIsland = await tileRepository.getRandomIsland();
    const affectedTiles = await tileRepository.hideTreasure(treasureIsland);

    if (affectedTiles === 0) {
      res.sendStatus(404);
      return;
    }

    res.sendStatus(201);
  } catch (err) {
    console.error("Error in add action:", err);
    next(err);
  }
};

const update: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedBoat = req.body;

    const affectedRows = await boatRepository.update(Number(id), updatedBoat);

    if (affectedRows === 0) {
      res.status(404).json({ message: "Boat not found" });
      return;
    }

    res.status(204).send();
  } catch (err) {
    console.error("Error updating boat:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const remove: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const affectedRows = await boatRepository.delete(Number(id));

    if (affectedRows === 0) {
      res.status(404).json({ message: "Boat not found" });
      return;
    }

    res.status(204).send();
  } catch (err) {
    console.error("Error deleting boat:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default {
  browse,
  add,
  update,
  remove,
};
