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
			"select *,boat.id from boat JOIN tile ON boat.coord_x = tile.coord_x and boat.coord_y = tile.coord_y",
			[],
		);

		// Return the array of tiles
		return rows as Boat[];
	}

	async update(boatToUpdate: Partial<Boat>) {
		// your code here
		const [result] = await databaseClient.query<Result>(
			"update boat set coord_x=?, coord_y=? where id=?",
			[boatToUpdate.coord_x, boatToUpdate.coord_y, boatToUpdate.id],
		);

		// Return how many rows were affected
		return result.affectedRows;
	}
}

export default new BoatRepository();
