import express from "express";
import { getShortedIdMiddleware } from "../middlewares/urlsMiddlewares.js";
import { getUrl, redirectUrl } from "../controllers/urlsController.js";

const router = express.Router();

router.post("/urls/shorten");
router.get("/urls/:id", getUrl);
router.get("/urls/open/:shortUrl", getShortedIdMiddleware, redirectUrl);
router.delete("/urls/:id");
router.get("/users/me");

export default router;
