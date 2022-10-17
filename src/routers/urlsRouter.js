import express from "express";

const router = express.Router();

router.post("urls/shorten");
router.get("urls/:id");
router.get("urls/open/:shortUrl");
router.delete("/urls/:id");
router.get("/users/me");

export default router;
