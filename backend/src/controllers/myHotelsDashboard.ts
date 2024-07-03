import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import Hotel from "../models/hotel";
import { hotelType } from "../shared/types";
import { Multer } from "multer";

//@route  /api/my-hotels/
//@method POST
//@access private

export const addHotel = async (req: Request, res: Response) => {
  try {
    // 1) get the data from form
    // const mediaFiles = req.files as {[fieldname: string]: Express.Multer.File[];}; because we use multerUpload.fields
    const mediaFiles = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };
    const imageFiles = mediaFiles["imageFiles"] || [];
    const videoFiles = mediaFiles["videoFiles"] || [];

    console.log(imageFiles, videoFiles);

    const newHotel: hotelType = req.body;
    //2) upload images to cloudinary
    //single upload for each image and video

    const imageUrls = await uploadMediaFiles(imageFiles);
    const videoUrls = await uploadMediaFiles(videoFiles);

    // //3) if uploaded successfully, add urls to hotel
    newHotel.imageUrls = imageUrls.map((image) => image.url);
    newHotel.videoUrls = videoUrls.map((video) => video.url);
    newHotel.lastUpdated = new Date();
    newHotel.userId = req.userId;

    //4) save documen to db
    const hotel = await Hotel.create(newHotel);
    //5) send response
    return res.status(201);
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
    const hotels = await Hotel.find({ userId: req.userId, approved: true });
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
      updatedHotel,
      {
        new: true,
      }
    );

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    // update hotel urls of images
    const mediaFiles = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };
    const imageFiles = mediaFiles["imageFiles"] || [];
    const videoFiles = mediaFiles["videoFiles"] || [];

    const updatedImageUrls = (await uploadMediaFiles(imageFiles)).map(
      (img) => img.url
    );
    const updatedVideoUrls = (await uploadMediaFiles(videoFiles)).map(
      (video) => video.url
    );

    // add the new and existing images
    hotel.imageUrls = [...updatedImageUrls, ...(updatedHotel.imageUrls || [])];
    hotel.videoUrls = [...updatedVideoUrls, ...(updatedHotel.videoUrls || [])];

    //just save the new data
    await hotel.save();
    res.status(201).json(hotel);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error updating hotel" });
  }
};

async function uploadMediaFiles(
  files: Express.Multer.File[]
): Promise<{ type: string; url: string }[]> {
  const uploadPromises = files.map(async (file) => {
    //Image Uploading
    if (file.mimetype.startsWith("image/")) {
      const base64 = Buffer.from(file.buffer).toString("base64");
      const dataURI = "data:" + file.mimetype + ";base64," + base64;
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "hotels/images",
      });
      return { type: "image", url: result.url };
    } else if (file.mimetype.startsWith("video/")) {
      // Video Uploading
      const base64 = Buffer.from(file.buffer).toString("base64");
      const dataURI = "data:" + file.mimetype + ";base64," + base64;
      const result = await cloudinary.uploader.upload(dataURI, {
        resource_type: "video",
        folder: `hotels/videos`,
        transformation: {
          width: 640,
          height: 640,
          quality: "auto:best",
          fetch_format: "auto",
          flags: "lossy",
        },
      });
      return { type: "video", url: result.url };
    } else {
      throw new Error("unSupported file type ");
    }
  });

  const uploadResults = await Promise.all(uploadPromises);
  return uploadResults;
}
