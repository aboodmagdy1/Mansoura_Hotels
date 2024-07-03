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

    // TODO: add if not approved, send notification to hotel owner by mail

    res.status(200).json(hotel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error: Something went wrong" });
  }
};
