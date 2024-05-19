import express from "express";

import { multerUpload } from "../middlewares/multer";
import { addHotel } from "../controllers/hotelsDashboard";
import { creatHotelValidator } from "../utils/validators/createHotelValidator";
import verifyToken from "../middlewares/auth";

const router = express.Router();

//imageFiles is the name of the array filed that has the filed or images in the form
// @route  api/my-hotels
router.post(
  "/",
  verifyToken,
  creatHotelValidator,
  multerUpload.array("imageFiles", 6),
  addHotel
);

export default router;
