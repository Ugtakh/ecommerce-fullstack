import { Router } from "express";
import {
  createCategory,
  getAllCategory,
} from "../controllers/category-controller";

const router = Router();

router.route("/").get(getAllCategory);
router.route("/").post(createCategory);

export default router;
