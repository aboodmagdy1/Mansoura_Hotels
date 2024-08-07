import mongoose from "mongoose";
import { BoookingType, hotelType } from "../shared/types";

const bookingSchema = new mongoose.Schema<BoookingType>({
  userId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  adultCount: {
    type: Number,
    required: true,
  },
  childCount: {
    type: Number,
    required: true,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
  totalCost: {
    type: Number,
  },
});

const hotelSchema = new mongoose.Schema<hotelType>({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  adultCount: {
    type: Number,
    required: true,
  },
  childCount: {
    type: Number,
    required: true,
  },
  facilities: [
    {
      type: String,
      required: true,
    },
  ],
  pricePerNight: {
    type: Number,
    required: true,
  },
  starRating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  imageUrls: [
    {
      type: String,
      required: true,
    },
  ],
  videoUrls: [{ type: String }],
  lastUpdated: {
    type: Date,
    required: true,
  },
  bookings: [bookingSchema],

  // for creating approviation
  approved: {
    type: Boolean,
    default: false,
  },
  // for updating a approviation ()
  updateApprove: {
    type: Boolean,
    default: false,
  },
});

const Hotel = mongoose.model<hotelType>("Hotel", hotelSchema);

export default Hotel;
