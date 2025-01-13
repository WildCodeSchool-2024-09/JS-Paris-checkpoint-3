import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import boatActions from "./modules/boat/boatActions";

router.get("/api/boats", boatActions.browse);

import gameActions from "./modules/game/gameActions";
import tileActions from "./modules/tile/tileActions";

router.post("/api/games", gameActions.add);

router.get("/api/tiles", tileActions.browse);

/* ************************************************************************* */

export default router;
