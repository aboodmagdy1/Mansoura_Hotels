import { RegisterFormData } from "./pages/register";
import { SignInFormData } from "./pages/SignIn";
import {
  HotelSearchResponse,
  hotelType,
  PaymentIntentResponse,
  userType,
} from "../../backend/src/shared/types";
import { bookingFormData } from "./forms/BookingForm/BookingForm";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

// ----------------------------- Authntication & Authrization--------------------------
export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include", //tell the browser to set the cookie that come back from the server
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/sign-in`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody;
};

export const fetchCurrentUser = async (): Promise<userType> => {
  const response = await fetch(`${API_BASE_URL}/api/users/me`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching current user");
  }

  return response.json();
};
export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST", //because we crete fake token
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error during logout");
  }
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include", //send the cookie with the request
  });

  if (!response.ok) {
    throw new Error("Invalid token");
  }

  return response.json();
};

//------------------------------- dashboard--------------------------------------

export const addMyHotel = async (hotelFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  });

  if (!response.ok) {
    throw new Error("Failed to add hotel");
  }

  return response.json();
};

export const fetchMyHotles = async (): Promise<hotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }

  return response.json();
};

// my own hotels
export const fetchHotelById = async (hotelId: string): Promise<hotelType> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching hotel");
  }
  return response.json();
};
export const updateMyHotelById = async (
  hotelFormData: FormData
): Promise<hotelType> => {
  const response = await fetch(
    `${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`,
    {
      method: "PUT",
      credentials: "include",
      body: hotelFormData,
    }
  );

  if (!response.ok) {
    throw new Error("Error updating hotel");
  }

  return response.json();
};

// ----------------------------Search ----------------------------------------------

// all are string besause the data in quey is key:"string"
export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};

export const searchHotels = async (
  searchParams: SearchParams
): Promise<HotelSearchResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append("destination", searchParams.destination || "");
  queryParams.append("checkIn", searchParams.checkIn || "");
  queryParams.append("checkOut", searchParams.checkOut || "");
  queryParams.append("childCount", searchParams.childCount || "");
  queryParams.append("adultCount", searchParams.adultCount || "");
  queryParams.append("page", searchParams.page || "");

  //filtering params
  queryParams.append("maxPrice", searchParams.maxPrice || "");
  queryParams.append("sortOption", searchParams.sortOption || "");

  searchParams.facilities?.forEach((facility) => {
    queryParams.append("facilities", facility);
  });

  searchParams.types?.forEach((type) => {
    queryParams.append("types", type);
  });

  searchParams.stars?.forEach((star) => {
    queryParams.append("stars", star);
  });

  const response = await fetch(
    `${API_BASE_URL}/api/hotels/search?${queryParams}`
  );
  if (!response.ok) {
    throw new Error("Error fetching Hotels");
  }
  return response.json();
};

// ----------------------------Public Hotels----------------------------------------
export const fetchHotels = async (): Promise<hotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/hotels`);
  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }
  return response.json();
};
export const fetchHotel = async (hotelId: string): Promise<hotelType> => {
  const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`);
  if (!response.ok) {
    throw new Error("Error fetching hotel");
  }
  return response.json();
};

// ----------------------------Booking----------------------------------------
export const createPaymentIntent = async (
  hotelId: string,
  numberOfNights: string
): Promise<PaymentIntentResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`,
    {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ numberOfNights }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error fetching payment intent");
  }
  return response.json();
};

export const createRoomBoooking = async (formData: bookingFormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`,
    {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );
  if (!response.ok) {
    throw new Error("Error fetching booking");
  }
};
export const fetchMyBookings = async (): Promise<hotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-bookings`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Unable to  fetch bookings");
  }
  return response.json();
};

// ----------------------------Admin DashBoard----------------------------------------
// get all hotels to show in the admin dashboard
export const fetchAllHotels_Admin = async (): Promise<hotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/admin/hotels`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching hotels For admin ");
  }
  return response.json();
};
// get specific hotel to review
export const fetchHotel_Admin = async (hotelId: string): Promise<hotelType> => {
  const response = await fetch(`${API_BASE_URL}/api/admin/hotels/${hotelId}`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching hotel for admin");
  }
  return response.json();
};
// @desc send status of hotel appreviation to approve or not
export const approveHotel = async (hotelId: string, approved: boolean) => {
  const response = await fetch(`${API_BASE_URL}/api/admin/hotels/${hotelId}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ approved }),
  });

  if (!response.ok) {
    throw new Error("Error approving hotel");
  }
  return response.json();
};

// @desc delete this hotel from DB and send owner id to send email
export const deleteHotel = async (hotelId: string, userId: string) => {
  const response = await fetch(`${API_BASE_URL}/api/admin/hotels/${hotelId}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });

  if (!response.ok) {
    throw new Error("Error deleteing  hotel");
  }
  return response.json();
};
