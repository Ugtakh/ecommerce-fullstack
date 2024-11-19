import { Router } from "express";

import { authentication } from "../middlewares/authentication";

const router = Router();

router.route("/").post().get(authentication);
router.route("/:id").put(authentication).delete(authentication);

export default router;
