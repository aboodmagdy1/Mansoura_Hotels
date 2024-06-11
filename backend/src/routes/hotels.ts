import express from "express";
import { getHotels } from "../controllers/hotels";

const router = express.Router();

router.get("/search", getHotels);

export default router;
