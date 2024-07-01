import { Response, Request } from "express";
import User from "../models/user";
import Hotel from "../models/hotel";
import { hotelType } from "../shared/types";
//@route api/my-bookings
//@desc get all bookings
export const getBookings = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    // get the booked hotels for the user
    const hotels = await Hotel.find({
      bookings: {
        $elemMatch: { userId: userId },
      },
    });
    //array of booked hotels and booking details of this user
    const results = hotels.map((hotel) => {
      // get the booking of the current user on this hotel
      const userBookings = hotel.bookings.filter(
        (booking) => booking.userId === userId
      );

      //الاوتيل الي عامل عليه حجز وبيانات الحجز
      const hotelWithUserBookings: hotelType = {
        ...hotel.toObject(),
        bookings: userBookings,
      };

      return hotelWithUserBookings;
    });

    res.status(200).json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Unable to fetch Bookings" });
  }
};
