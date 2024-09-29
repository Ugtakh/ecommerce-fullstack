import { Router } from "express";
import {
  login,
  signup,
  currentUser,
  verifyOtp,
  verifyPassword,
  forgetPassword,
  updateUser,
} from "../controllers/auth-controller";
import { authentication } from "../middlewares/authentication";

const router = Router();

router.route("/current-user").get(authentication, currentUser);
router.route("/verify-password").post(verifyPassword);
router.route("/forget-password").post(forgetPassword);
router.route("/verify-otp").post(verifyOtp);
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/user/:id").put(updateUser);

export default router;
