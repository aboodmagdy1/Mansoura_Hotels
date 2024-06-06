import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import Hotel from "../models/hotel";
import { hotelType } from "../shared/types";

//@route  /api/my-hotels/
//@method POST
//@access private

export const addHotel = async (req: Request, res: Response) => {
  try {
    // 1) get the data from form
    const imageFiles = req.files as Express.Multer.File[];
    const newHotel: hotelType = req.body;
    //2) upload images to cloudinary
    //single upload for each image
    const imagesUrls = await uploadImages(imageFiles);
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

//@route  /api/my-hotels/
//@method GET
//@access private
export const getAllHotels = async (req: Request, res: Response) => {
  //1) check if logged in then extract user (by verify token middleware)
  //2) get hotels with this user id and send response
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    res.json(hotels);
  } catch (err) {
    console.log("Error: getting all hotels: ", err);
    res.status(500).json({ message: "Error fetching hotels" });
  }
};

//@route  /api/my-hotels/:id
//@method GET
//@access private
export const getHotel = async (req: Request, res: Response) => {
  const id = req.params.id.toString();
  try {
    const hotel = await Hotel.findOne({ _id: id, userId: req.userId });
    res.json(hotel);
  } catch (err) {
    console.log("Error: getting hotel: ", err);
    res.status(500).json({ message: "Error fetching hotel" });
  }
};

//@route  /api/my-hotels/:id
//@method PUT
//@access private
export const updateHotel = async (req: Request, res: Response) => {
  try {
    const updatedHotel: hotelType = req.body;
    updatedHotel.lastUpdated = new Date();

    // update hotel body
    const hotel = await Hotel.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.userId,
      },
      updateHotel,
      {
        new: true,
      }
    );

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    // update hotel urls of images
    const imageFiles = req.files as Express.Multer.File[];
    const updatedImageUrls = await uploadImages(imageFiles);

    // add the new and existing images
    hotel.imageUrls = [...updatedImageUrls, ...(updatedHotel.imageUrls || [])];

    //just save the new data
    await hotel.save();
  } catch (err) {
    res.status(500).json({ message: "Error updating hotel" });
  }
};
async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    //create a buffer from image
    const base64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + base64;
    const res = await cloudinary.uploader.upload(dataURI);
    return res.url;
  });
  const imagesUrls = await Promise.all(uploadPromises);
  return imagesUrls;
}
