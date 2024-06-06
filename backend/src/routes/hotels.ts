import express, { NextFunction, Request, Response } from "express";

import { multerUpload } from "../middlewares/multer";
import {
  addHotel,
  updateHotel,
  getAllHotels,
  getHotel,
} from "../controllers/hotelsDashboard";
import { creatHotelValidator } from "../utils/validators/createHotelValidator";
import verifyToken from "../middlewares/auth";

const router = express.Router();

//imageFiles is the name of the array filed that has the filed or images in the form
router.post(
  "/",
  verifyToken,
  multerUpload.array("imageFiles", 6),
  creatHotelValidator,
  addHotel
);

router.get("/", verifyToken, getAllHotels);
router.get("/:id", verifyToken, getHotel);
router.put(
  "/:id",
  verifyToken,
  multerUpload.array("imageFiles", 6),
  updateHotel
);

export default router;
