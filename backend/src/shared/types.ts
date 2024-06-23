export type hotelType = {
  _id: string;
  userId: string; // to know the user who creates this hotel
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
  videoUrls: string[];
  lastUpdated: Date;
};

export type HotelSearchResponse = {
  data: hotelType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export type userType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};
