import express from "express";
import { getUrl } from "../controllers/urlsController.js";

const router = express.Router();

router.post("/urls/shorten");
router.get("/urls/:id", getUrl);
router.get("/urls/open/:shortUrl");
router.delete("/urls/:id");
router.get("/users/me");

export default router;
