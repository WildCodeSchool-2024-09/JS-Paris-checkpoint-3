import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Tile = {
  id: number;
  coord_x: number;
  coord_y: number;
};

class TileRepository {
  async browse(): Promise<Tile[]> {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM tile ORDER BY coord_y, coord_x",
    );
    return rows as Tile[];
  }

  async readByCoordinates(coordX: number, coordY: number): Promise<Tile[]> {
    try {
      const [rows] = await databaseClient.query<Rows>(
        "SELECT * FROM tile WHERE coord_x = ? AND coord_y = ?",
        [coordX, coordY],
      );
      return rows as Tile[];
    } catch (err) {
      console.error("Error reading tiles by coordinates:", err);
      
      return [];
    }
  }

  async add(newTile: Partial<Tile>): Promise<Tile> {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO tile (coord_x, coord_y) VALUES (?, ?)",
      
      [newTile.coord_x, newTile.coord_y],
    );
    const insertedId = result.insertId;
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM tile WHERE id = ?",
      
      [insertedId],
    );
    return rows[0] as Tile;
  }
}

export default new TileRepository();
