import express from "express";
import { tokenVerification } from "../middlewares/tokenMiddleware.js";
import {
	getShortedIdMiddleware,
	deleteMiddleware,
	createShortUrlMiddleware,
} from "../middlewares/urlsMiddlewares.js";
import {
	getUrl,
	redirectUrl,
	deleteUrl,
	getUserUrls,
	createShortUrl,
} from "../controllers/urlsController.js";

const router = express.Router();

router.post(
	"/urls/shorten",
	tokenVerification,
	createShortUrlMiddleware,
	createShortUrl,
);
router.get("/urls/:id", getUrl);
router.get("/urls/open/:shortUrl", getShortedIdMiddleware, redirectUrl);
router.delete("/urls/:id", tokenVerification, deleteMiddleware, deleteUrl);
router.get("/users/me", tokenVerification, getUserUrls);

export default router;
