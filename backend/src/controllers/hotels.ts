import { Request, response, Response } from "express";
import Hotel from "../models/hotel";
import { HotelSearchResponse } from "../shared/types";

// @desc get all hotels (search)
// @route GET /api/hotels/search
// @access Public
export const getHotels = async (req: Request, res: Response) => {
  try {
    //pagination
    const pageNumber = req.query.page ? parseInt(req.query.page.toString()) : 1;
    const pageSize = 8; // limit
    const skip = (pageNumber - 1) * pageSize; // skip this number to get the next to them
    const total = await Hotel.countDocuments();

    const hotels = await Hotel.find().skip(skip).limit(pageSize);
    const response: HotelSearchResponse = {
      data: hotels,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize), // number of pages
      },
    };
    res.json(response);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Something  went wrong" });
  }
};
