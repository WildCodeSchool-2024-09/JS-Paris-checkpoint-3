import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Boat = {
  id: number;
  name: string;
  coord_x: number;
  coord_y: number;
};

class BoatRepository {
  async readAll(where = {}) {
    // Execute the SQL SELECT query to retrieve all boats from the "boat" table
    const [rows] = await databaseClient.query<Rows>(
      "select * from boat order by coord_y, coord_x"
    );

    // Return the array of tiles
    return rows as Boat[];
  }

  async update(boatToUpdate: Partial<Boat>) {
    const { id, coord_x, coord_y } = boatToUpdate;

    if (!id || coord_x === undefined || coord_y === undefined) {
      throw new Error("Missing id, coord_x, or coord_y for the update");
    }

    const [result] = await databaseClient.query<Result>(
      "UPDATE boat SET coord_x = ?, coord_y = ? WHERE id = ?",
      [coord_x, coord_y, id]
    );

    return result.affectedRows;
  }
}

export default new BoatRepository();
