import Hotel from "../models/hotel";
import { Request, Response } from "express";

// @route Get  api/admin/hotels
// @desc get all hotels (then approve or not)
// @access admin
export const allHotels = async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({});
    res.json(hotels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error: Something went wrong" });
  }
};

// @route Get  api/admin/hotels/:hotelId
// @desc get specific hotel to review
// @access admin
export const getHotel = async (req: Request, res: Response) => {
  try {
    const hotel = await Hotel.findById(req.params.hotelId);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    res.json(hotel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error: Something went wrong" });
  }
};

// @route Put api/admin/hotels/:hotelId
// @desc approve hotel
// @access admin
export const approveHotel = async (req: Request, res: Response) => {
  try {
    const { approved } = req.body;
    const hotel = await Hotel.findByIdAndUpdate(
      req.params.hotelId,
      { approved },
      { new: true }
    );
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.status(200).json(hotel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error: Something went wrong" });
  }
};

// @route Delete api/admin/hotels/:hotelId
// @desc delete hotel and send main to owner
// @access admin
export const deleteHotel = async (req: Request, res: Response) => {
  const userId = req.body.userId;

  try {
    const hotel = await Hotel.findOneAndDelete({
      _id: req.params.hotelId,
      userId,
    });
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    // send email to owner
    res.status(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error: Something went wrong" });
  }
};
