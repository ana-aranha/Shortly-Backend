import express from "express";
import { tokenVerification } from "../middlewares/tokenMiddleware.js";
import {
	getShortedIdMiddleware,
	deleteMiddleware,
} from "../middlewares/urlsMiddlewares.js";
import {
	getUrl,
	redirectUrl,
	deleteUrl,
} from "../controllers/urlsController.js";

const router = express.Router();

router.post("/urls/shorten");
router.get("/urls/:id", getUrl);
router.get("/urls/open/:shortUrl", getShortedIdMiddleware, redirectUrl);
router.delete("/urls/:id", tokenVerification, deleteMiddleware, deleteUrl);
router.get("/users/me");

export default router;
