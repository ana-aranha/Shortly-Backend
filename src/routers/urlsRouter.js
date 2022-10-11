import express from "express";

const router = express.Router();

router.post("urls/shorten");
router.get("urls/:id");
router.get("urls/opne/:shortUrl");
router.delete("/urls/:id");

export default router;
