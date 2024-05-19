import { body } from "express-validator";
import { validationMiddleware } from "../../middlewares/validationMiddleware";

// check is a middleware so we pass to the route array of middlewares
export const creatHotelValidator = [
  body("name").notEmpty().withMessage("hotel name is required"),
  body("city").notEmpty().withMessage("City is required"),
  body("country").notEmpty().withMessage("Country is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("type").notEmpty().withMessage("Type is required"),
  body("pricePerNight")
    .notEmpty()
    .isNumeric()
    .withMessage("PricePerNight is required and must be a number "),
  body("facilities")
    .notEmpty()
    .isArray()
    .withMessage("Facilities are required and must be array"),
  body("adultCount")
    .notEmpty()
    .isNumeric()
    .withMessage("Adult count is required and must be a number"),
  body("childCount")
    .notEmpty()
    .isNumeric()
    .withMessage("Child count is required and must be a number"),

  validationMiddleware,
];

// NOTe : the imageUrls will be checked by multer
