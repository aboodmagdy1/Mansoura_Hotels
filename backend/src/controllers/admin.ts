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
      { approved, updateApprove: false },
      { new: true }
    );
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    //  find the owner of the hotel and get email address
    const owner = await User.findById(hotel.userId);
    if (owner) {
      // change the role form user to owner
      owner.role = "owner";
      // send email to owner
      const message = `
  After careful review of ${hotel.name} details, we have <br/><br/>
  ${
    approved
      ? `<h3 style="color: #1E90FF;">Approved: Your hotel is approved to be displayed on our platform.</h3>`
      : `<h3 style="color: #FF6347;">Rejected: Unfortunately, your hotel does not meet our criteria for listing.</h3> <br/><br/>We will send you detailed reasons for this decision shortly.`
  }
`;

      await sendMail({
        recipientMail: owner.email,
        subject: "Hotel Approval Status",
        htmlContent: `
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        h1 {
          color: #333;
          font-size: 24px;
        }
        h3 {
          font-size: 18px;
          margin-bottom: 10px;
        }
        p {
          font-size: 16px;
        }
      </style>
    </head>
    <body>
      <h1>Hotel Approval Status</h1>
      <p>Dear ${owner.firstName} ${owner.lastName},</p>
      <p>${message}</p>
    </body>
    </html>
  `,
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
    // before the deletion happen we cansel all the bookings of this hotel
    res.status(200).json(hotel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error: Something went wrong" });
  }
};
