import express, { NextFunction, Request, Response } from "express";

import { multerUpload } from "../middlewares/multer";
import {
  addHotel,
  updateHotel,
  getAllHotels,
  getHotel,
} from "../controllers/myHotelsDashboard";
import { creatHotelValidator } from "../utils/validators/createHotelValidator";
import verifyToken from "../middlewares/auth";

const router = express.Router();

// dashboard routes

//imageFiles is the name of the array filed that has the filed or images in the form
router.post(
  "/",
  verifyToken,
  multerUpload.fields([
    { name: "imageFiles", maxCount: 6 },
    { name: "videoFiles", maxCount: 2 },
  ]),
  creatHotelValidator,
  addHotel
);

router.get("/", verifyToken, getAllHotels);
router.get("/:id", verifyToken, getHotel);
router.put(
  "/:id",
  verifyToken,
  multerUpload.fields([
    { name: "imageFiles", maxCount: 6 },
    { name: "videoFiles", maxCount: 2 },
  ]),
  updateHotel
);

export default router;
