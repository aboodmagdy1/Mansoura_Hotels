import { Request, response, Response } from "express";
import Hotel from "../models/hotel";
import { HotelSearchResponse } from "../shared/types";
import { validationMiddleware } from "../middlewares/validationMiddleware";
import Stripe from "stripe";

// @desc get all hotels (search)
// @route GET /api/hotels/search
// @access Public
export const getHotels = async (req: Request, res: Response) => {
  try {
    //pagination
    const pageNumber = req.query.page ? parseInt(req.query.page.toString()) : 1;
    const pageSize = 5; // limit
    const skip = (pageNumber - 1) * pageSize; // skip this number to get the next to them

    //for filtering purposes
    const query = constructSearchQuery(req.query);

    //sorting
    let sortOptions = {};
    switch (req.query.sortOption) {
      case "startRating":
        sortOptions = { startRating: -1 };
        break;
      case "pricePerNightAsc":
        sortOptions = { pricePerNight: 1 };
        break;
      case "pricePerNightDesc":
        sortOptions = { pricePerNight: -1 };
        break;
    }

    const hotels = await Hotel.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);
    const total = await Hotel.countDocuments(query);
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

// @desc get  hotel (details)
// @route GET /api/hotels/:id
// @access Public
export const getHotel = async (req: Request, res: Response) => {
  const id = req.params.id.toString();
  try {
    const hotel = await Hotel.findById(id);
    res.json(hotel);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error Fetching hotel" });
  }
};

//initialize stripe session
const stripe = new Stripe(process.env.STRIPE_API_KEY as string);
//@desc create payment intent
//@route Post api/hotels/:hotelId/bookings/payment-intent
//@access protected
export const createPaymentIntent = async (req: Request, res: Response) => {
  const { numberOfNights } = req.body;
  const { hotelId } = req.params;
  const userId = req.userId;
  const hotel = await Hotel.findById(hotelId);
  if (!hotel) {
    return res.status(400).json({ mesage: "hotel not found " });
  }

  // 1) calc total cost
  // we calculate it for data integrity and security purposes
  const totalCost = hotel.pricePerNight * numberOfNights;

  //2) create payment intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalCost,
    currency: "usd",
    // for check if the payment has successfully or fail
    metadata: {
      hotelId,
      userId,
    },
  });

  if (!paymentIntent.client_secret) {
    return res.status(500).json({ message: "Error creating payment intent " });
  }

  const response = {
    totalCost,
    paymentIntentId: paymentIntent.id,
    clientSecret: paymentIntent.client_secret,
  };

  res.send(response);
};

const constructSearchQuery = (queryParams: any) => {
  let constructedQuery: any = {};

  if (queryParams.destination) {
    constructedQuery.$or = [
      { city: new RegExp(queryParams.destination, "i") },
      { country: new RegExp(queryParams.destination, "i") },
    ];
  }

  if (queryParams.adultCount) {
    constructedQuery.adultCount = {
      $gte: parseInt(queryParams.adultCount),
    };
  }

  if (queryParams.childCount) {
    constructedQuery.childCount = {
      $gte: parseInt(queryParams.childCount),
    };
  }

  if (queryParams.facilities) {
    constructedQuery.facilities = {
      $all: Array.isArray(queryParams.facilities)
        ? queryParams.facilities
        : [queryParams.facilities],
    };
  }

  if (queryParams.types) {
    constructedQuery.type = {
      $in: Array.isArray(queryParams.types)
        ? queryParams.types
        : [queryParams.types],
    };
  }

  if (queryParams.stars) {
    const starRatings = Array.isArray(queryParams.stars)
      ? queryParams.stars.map((star: string) => parseInt(star))
      : [parseInt(queryParams.stars)];

    constructedQuery.starRating = { $in: starRatings };
  }

  if (queryParams.maxPrice) {
    constructedQuery.pricePerNight = {
      $lte: parseInt(queryParams.maxPrice).toString(),
    };
  }

  return constructedQuery;
};
