import express from "express";
import { getRanking } from "../controllers/rankingController.js";

const router = express.Router();

router.get("/ranking", getRanking);

export default router;
