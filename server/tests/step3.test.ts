import "dotenv/config";

import request from "supertest"; // Import unique de Supertest

import databaseClient from "../database/client";
import app from "../src/app";
import boatRepository from "../src/modules/boat/boatRepository";

describe("PUT /api/boats/:id", () => {
  let boatId: number;

  beforeAll(async () => {
    // Ajoute un bateau nommé "Flying Dutchman" à mettre à jour
    const response = await request(app)
      .post("/api/boats")
      .send({ name: "Flying Dutchman", coord_x: 5, coord_y: 3 });
    boatId = response.body.id;
  });

  afterAll(async () => {
    // Nettoie la base de données après les tests (si vous avez une route DELETE)
    // Par exemple, supprimer le bateau ajouté
    // await request(app).delete(`/api/boats/${boatId}`);
    await databaseClient.end();
  });

  test("BoatRepository has an update method", () => {
    expect(typeof boatRepository.update).toBe("function");
  });

  test("The update method in BoatRepository takes 2 parameters: id and updatedBoat", () => {
    expect(boatRepository.update).toHaveLength(2);
  });

  test("The update method in BoatRepository performs the SQL request 'update boat set coord_x=???, coord_y=??? where id=???'", async () => {
    const flyingDutchman = (await boatRepository.readAll()).find(
      (boat) => boat.name === "Flying Dutchman",
    );

    if (flyingDutchman == null) {
      throw new Error("We lost the Flying Dutchman!");
    }

    const updatedBoat = {
      coord_x: (flyingDutchman.coord_x + 2) % 12,
      coord_y: (flyingDutchman.coord_y + 1) % 6,
    };

    const affectedRows = await boatRepository.update(flyingDutchman.id, updatedBoat);

    expect(affectedRows).toBe(1); // Correction ici

    const updatedFlyingDutchman = (await boatRepository.readAll()).find(
      (boat) => boat.id === flyingDutchman.id,
    );

    if (updatedFlyingDutchman == null) {
      throw new Error("We lost the updated Flying Dutchman!");
    }

    expect(updatedFlyingDutchman.coord_x).toBe(updatedBoat.coord_x);
    expect(updatedFlyingDutchman.coord_y).toBe(updatedBoat.coord_y);
  });

  test("The update method in BoatRepository returns affectedRows", async () => {
    const flyingDutchman = (await boatRepository.readAll()).find(
      (boat) => boat.name === "Flying Dutchman",
    );

    if (flyingDutchman == null) {
      throw new Error("We lost the Flying Dutchman!");
    }

    const updateData = {
      coord_x: (flyingDutchman.coord_x + 3) % 12,
      coord_y: (flyingDutchman.coord_y + 2) % 6,
    };

    const affectedRows = await boatRepository.update(flyingDutchman.id, updateData);

    expect(affectedRows).toBe(1); // Correction ici

    const updatedFlyingDutchman = (await boatRepository.readAll()).find(
      (boat) => boat.id === flyingDutchman.id,
    );

    if (updatedFlyingDutchman == null) {
      throw new Error("We lost the updated Flying Dutchman!");
    }

    expect(updatedFlyingDutchman.coord_x).toBe(updateData.coord_x);
    expect(updatedFlyingDutchman.coord_y).toBe(updateData.coord_y);
  });

  test("you declared the route PUT /api/boats/:id in router.ts, and it is functional", async () => {
    const flyingDutchman = (await boatRepository.readAll()).find(
      (boat) => boat.name === "Flying Dutchman",
    );

    if (flyingDutchman == null) {
      throw new Error("We lost the Flying Dutchman!");
    }

    const updatedBoat = {
      name: "Flying Dutchman Updated via Route",
      coord_x: (flyingDutchman.coord_x + 1) % 12,
      coord_y: (flyingDutchman.coord_y + 1) % 6,
    };

    const response = await request(app)
      .put(`/api/boats/${flyingDutchman.id}`)
      .send(updatedBoat);

    expect(response.status).toBe(204);

    const updatedFlyingDutchman = (await boatRepository.readAll()).find(
      (boat) => boat.id === flyingDutchman.id,
    );

    if (updatedFlyingDutchman == null) {
      throw new Error("We lost the updated Flying Dutchman!");
    }

    expect(updatedFlyingDutchman.name).toBe(updatedBoat.name);
    expect(updatedFlyingDutchman.coord_x).toBe(updatedBoat.coord_x);
    expect(updatedFlyingDutchman.coord_y).toBe(updatedBoat.coord_y);
  });
});