import express from "express";
const router = express.Router();
import {
  registerUser,
  loginUser,
  currentUser,
} from "../controllers/userController.js";
import { validateToken } from "../middleware/uservalidateToken.js";
router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/current").get(validateToken, currentUser);

export default router;
