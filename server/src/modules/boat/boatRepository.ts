import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

export type Boat = {
  id: number;
  name: string;
  coord_x: number;
  coord_y: number;
};

class BoatRepository {
  async readAll(where = {}) {
    // Execute the SQL SELECT query to retrieve all boats from the "boat" table
    const [rows] = await databaseClient.query<Rows>(
      "select * from boat order by coord_y, coord_x",
    );

    // Return the array of tiles
    return rows as Boat[];
  }

  async update(boatToUpdate: Partial<Boat>): Promise<number> {
    if (!boatToUpdate.id) {
      throw new Error("Missing boat ID for update.");
    }

    const [rows] = await databaseClient.query<Rows>(
      "SELECT id FROM boat WHERE id = ?",
      [boatToUpdate.id],
    );

    if ((rows as Boat[]).length === 0) {
      return 0;
    }

    const fieldsToUpdate = Object.entries(boatToUpdate)
      .filter(([key]) => key !== "id")
      .map(([key]) => `${key} = ?`)
      .join(", ");

    const values = Object.entries(boatToUpdate)
      .filter(([key]) => key !== "id")
      .map(([, value]) => value);

    values.push(boatToUpdate.id);

    const [result] = await databaseClient.query<Result>(
      `UPDATE boat SET ${fieldsToUpdate} WHERE id = ?`,
      values,
    );
    return result.affectedRows || 0;
  }
}

export default new BoatRepository();
