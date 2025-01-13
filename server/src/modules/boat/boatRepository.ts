import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Boat = {
  id: number;
  name: string;
  coord_x: number;
  coord_y: number;
};

class BoatRepository {
  async readAll(where = {}): Promise<Boat[]> {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM boat ORDER BY coord_y, coord_x",
    );
    return rows as Boat[];
  }

  async add(newBoat: Partial<Boat>): Promise<Boat> {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO boat (name, coord_x, coord_y) VALUES (?, ?, ?)",
      
      [newBoat.name, newBoat.coord_x, newBoat.coord_y],
    );
    const insertedId = result.insertId;
    const [rows] = await databaseClient.query<Rows>(
     
      "SELECT * FROM boat WHERE id = ?",
     
      [insertedId],
    );
    return rows[0] as Boat;
  }

  async update(id: number, updatedBoat: Partial<Boat>): Promise<number> {
    const fields: string[] = [];
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const values: any[] = [];

    if (updatedBoat.name !== undefined) {
      fields.push("name = ?");
      values.push(updatedBoat.name);
    }

    if (updatedBoat.coord_x !== undefined) {
      fields.push("coord_x = ?");
      values.push(updatedBoat.coord_x);
    }

    if (updatedBoat.coord_y !== undefined) {
      fields.push("coord_y = ?");
      values.push(updatedBoat.coord_y);
    }

    if (fields.length === 0) {
      return 0;
    }

    const sql = `UPDATE boat SET ${fields.join(", ")} WHERE id = ?`;
    values.push(id);

    const [result] = await databaseClient.query<Result>(sql, values);
    return result.affectedRows;
  }

  async delete(id: number): Promise<number> {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM boat WHERE id = ?",
      
      [id],
    );
    return result.affectedRows;
  }
}

export default new BoatRepository();
