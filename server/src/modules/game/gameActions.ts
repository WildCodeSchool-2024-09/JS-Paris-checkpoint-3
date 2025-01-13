import type { RequestHandler } from "express";
import boatRepository from "../boat/boatRepository";
import tileRepository from "../tile/tileRepository";

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

export default {
  add,
};
