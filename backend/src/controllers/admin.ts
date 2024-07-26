import Hotel from "../models/hotel";
import { Request, Response } from "express";
import User from "../models/user";
import { sendMail } from "../utils/sendMails";

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
    const { approved, message } = req.body;
    const hotel = await Hotel.findByIdAndUpdate(
      req.params.hotelId,
      { approved },
      { new: true }
    );
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    //  find the owner of the hotel and get email address
    const owner = await User.findById(hotel.userId);
    if (owner) {
      // send email to owner
      await sendMail({
        recipientMail: owner.email,
        subject: "Hotel Approviation",
        htmlContent: `<h1 style="color:red , ">Your Hotel has been ${
          approved ? "Approved" : "Rejected"
        }</h1> <p>${message}</p>`,
      });
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
    res.status(200).json(hotel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error: Something went wrong" });
  }
};
