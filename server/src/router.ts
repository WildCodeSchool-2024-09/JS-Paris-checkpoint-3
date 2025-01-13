import express from "express";
import boatActions from "./modules/boat/boatActions";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

router.get("/api/boats", boatActions.browse);
router.post("/api/boats", boatActions.add);

import tileActions from "./modules/tile/tileActions";

router.put("/api/boats/:id", tileActions.validate, boatActions.update);

router.delete("/api/boats/:id", boatActions.remove);

import gameActions from "./modules/game/gameActions";
router.post("/api/games", gameActions.add);

/* ************************************************************************* */
router.get("/api/tiles", tileActions.browse);

export default router;
