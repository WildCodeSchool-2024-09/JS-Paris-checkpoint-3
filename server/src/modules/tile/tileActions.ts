import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

// biome-ignore format: spaces

const browse: RequestHandler = async (req, res, next) => {
	try {
		const tiles = await tileRepository.readAll();

		res.json(tiles);
	} catch (err) {
		next(err);
	}
};

// biome-ignore format: spaces

const validate: RequestHandler = async (req, res, next) => {
	// your code here
};

// biome-ignore format: spaces

export default {
	browse,
	validate,
};
