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
      "select boat.id, boat.coord_x, boat.coord_y, boat.name, tile.type, tile.has_treasure from boat JOIN tile ON boat.coord_y = tile.coord_y AND boat.coord_x = tile.coord_x order by coord_y, coord_x",
    );

    // Return the array of tiles
    return rows as Boat[];
  }

  async update(boatToUpdate: Partial<Boat>) {
    // your code here
    const [result] = await databaseClient.query<Result>
    ("UPDATE boat SET ? WHERE id = ?", [boatToUpdate, boatToUpdate.id]);

    return result.affectedRows;
  }
}

export default new BoatRepository();
