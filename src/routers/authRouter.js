import express from "express";
import { signUpMiddleware } from "../middlewares/authMiddlewares.js";
import { signIn, signUp } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signUpMiddleware, signUp);
router.post("/signin", signIn);

export default router;
