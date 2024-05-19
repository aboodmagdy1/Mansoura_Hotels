import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import Hotel, { hotelType } from "../models/hotel";

//@route  /
export const addHotel = async (req: Request, res: Response) => {
  try {
    // 1) get the data from form
    const imageFiles = req.files as Express.Multer.File[];
    const newHotel: hotelType = req.body;
    //2) upload images to cloudinary
    //single upload for each image
    const uploadPromises = imageFiles.map(async (image) => {
      //create a buffer from image
      const base64 = Buffer.from(image.buffer).toString("base64");
      let dataURI = "data:" + image.mimetype + ";base64," + base64;
      const res = await cloudinary.uploader.upload(dataURI);
      return res.url;
    });
    const imagesUrls = await Promise.all(uploadPromises);
    //3) if uploaded successfully, add urls to hotel
    newHotel.imageUrls = imagesUrls;
    newHotel.lastUpdated = new Date();
    newHotel.userId = req.userId;

    //4) save documen to db
    const hotel = await Hotel.create(newHotel);
    //5) send response
    res.status(201).send(hotel);
  } catch (err) {
    console.log("Error:creating hotel : ", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
