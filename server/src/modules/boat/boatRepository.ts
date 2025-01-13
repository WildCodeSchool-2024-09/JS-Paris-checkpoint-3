import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Boat = {
  id: number;
  name: string;
  coord_x: number;
  coord_y: number;
};

class BoatRepository {
  async readAll(where?: { name?: string }) {
    // Execute the SQL SELECT query to retrieve all boats from the "boat" table
    if (!where) {
      const [rows] = await databaseClient.query<Rows>(
        "select boat.id, boat.coord_x, boat.coord_y, boat.name, tile.type, tile.has_treasure from boat left join tile on boat.coord_x = tile.coord_x and boat.coord_y = tile.coord_y order by boat.coord_y, boat.coord_x",
      );
      return rows as Boat[];
    }
    const [rows] = await databaseClient.query<Rows>(
      "select boat.id, boat.coord_x, boat.coord_y, boat.name, tile.type, tile.has_treasure from boat left join tile on boat.coord_x = tile.coord_x and boat.coord_y = tile.coord_y where boat.name = ? order by boat.coord_y, boat.coord_x",
      [where.name],
    );
    return rows as Boat[];
  }

  async update(boatToUpdate: Partial<Boat>) {
    const [result] = await databaseClient.query<Result>(
      "update boat set coord_x = ?, coord_y = ? where id = ?",
      [boatToUpdate.coord_x, boatToUpdate.coord_y, boatToUpdate.id],
    );
    return result.affectedRows;
  }
}

export default new BoatRepository();
