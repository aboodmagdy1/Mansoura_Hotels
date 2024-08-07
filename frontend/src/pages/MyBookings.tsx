import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
const MyBookings = () => {
  const { data: hotels, isLoading } = useQuery(
    "fetchMyBookings",
    apiClient.fetchMyBookings
  );

  console.log(hotels);

  if (!hotels || hotels.length === 0) {
    if (isLoading) {
      return (
        <div className="flex justify-center">
          <Loader />
        </div>
      );
    } else {
      return (
        <span className="flex justify-center font-semibold ">
          Let's book your next destination{"   "}
          <Link className="text-blue-600 ml-2 " to={"/"}>
            book
          </Link>
        </span>
      );
    }
  }
  return (
    <div className="space-y-5 ">
      <h1 className="text-3xl font-bold flex">My Bookings</h1>
      {hotels.map((hotel) => (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded p-8 gap-4">
          <div className="lg:w-full lg:h-[250px] ">
            <img
              src={hotel.imageUrls[0]}
              alt={hotel.name}
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
            <div className="font-bold text-2xl">
              {hotel.name}
              <div className="text-xs font-normal">
                {hotel.city} , {hotel.country}
              </div>
            </div>
            {hotel.bookings.map((booking) => (
              <div>
                <div>
                  <span className="font-bold mr-2">Dates : </span>
                  <span>
                    {new Date(booking.checkIn).toDateString()} -
                    {new Date(booking.checkOut).toDateString()}
                  </span>
                </div>
                <div>
                  <span className="font-bold mr-2">Guests: </span>
                  <span>
                    {booking.adultCount} adults , {booking.childCount} children
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
