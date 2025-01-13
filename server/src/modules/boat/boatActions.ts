import type { RequestHandler } from "express";

import boatRepository from "./boatRepository";

// biome-ignore format: spaces

const browse: RequestHandler = async (req, res, next) => {
	try {
		const boats = await boatRepository.readAll();

		res.json(boats);
	} catch (err) {
		next(err);
	}
};

// biome-ignore format: spaces

const edit: RequestHandler = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { coord_x, coord_y } = req.body;

		if (coord_x === undefined || coord_y === undefined) {
			res
				.status(400)
				.json({ error: "Missing coordinates in the request body." });
			return;
		}

    // biome-ignore format: spaces

		const affectedRows = await boatRepository.update({
			id: Number(id),
			coord_x: Number(coord_x),
			coord_y: Number(coord_y),
		});

		if (affectedRows === 0) {
			res.status(404).json({ error: "Boat not found." });
			return;
		}

		res.status(204).end();
	} catch (err) {
		next(err);
	}
};

// biome-ignore format: spaces

export default {
	browse,
	edit,
};
