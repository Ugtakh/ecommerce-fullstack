import { Router } from "express";
import {
  createProduct,
  getAllProduct,
  getProduct,
  updateProduct,
} from "../controllers/product-controller";
import { authentication } from "../middlewares/authentication";
import { authorize } from "../middlewares/authorize";

const router = Router();

// Public routes
router.route("/").get(getAllProduct);
router.route("/:productId").get(getProduct);

// Admin route
router.route("/").post(createProduct);
router.route("/:id").put(authentication, authorize, updateProduct);

export default router;
