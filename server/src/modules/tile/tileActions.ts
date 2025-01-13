import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
	try {
		// Fetch all boats from the database
		const tiles = await tileRepository.readAll();

		// Respond with the boats in JSON format
		res.json(tiles);
	} catch (err) {
		// Pass any errors to the error-handling middleware
		next(err);
	}
};

const validate: RequestHandler = async (req, res, next) => {
	// your code here
	try {
		const tilesarray = await tileRepository.readByCoordinates(
			Number(req.body.coord_x),
			Number(req.body.coord_y),
		);
		if (tilesarray.length > 0) {
			next();
		} else {
			res.sendStatus(422);
		}
	} catch (error) {
		next(error);
	}
};

export default {
	browse,
	validate,
};
