import { useQuery } from "react-query";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";
import * as apiClient from "../api-client";
import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import Loader from "../components/Loader";

const MyHotels = () => {
  const { showMessage } = useAppContext();
  const { data: hotelsData, isLoading } = useQuery(
    "fetchMyHotels",
    apiClient.fetchMyHotles,
    {
      onError: () => {
        showMessage({
          message: "Error Fetching this hotel data",
          type: "ERROR",
        });
      },
    }
  );

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="flex items-center bg-blue-600 text-white text-xl font-bold p-3 hover:bg-blue-500 rounded-md"
        >
          Add Hotel
        </Link>
      </div>
      {!hotelsData || hotelsData?.length === 0 ? (
        <div className="flex justify-center">
          <span className="text-1xl font-bold text-black-500">
            Let's Start by adding your first hotel
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {hotelsData.map((hotel) => (
            <div
              key={hotel._id}
              className="flex flex-col justify-between border border-slate-300 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-2xl font-bold mb-4">{hotel.name}</h2>
              <div className="text-right flex flex-col">
                <p className="text-md font-bold mb-3 ">
                  Status :{" "}
                  {hotel.approved ? (
                    <span className="border border-slate-400 p-2 rounded-lg bg-green-200">
                      Approved
                    </span>
                  ) : (
                    <span className="border border-slate-400 p-2 rounded-lg bg-red-200">
                      {hotel.updateApprove ? "Pending updates" : " Pending"}
                    </span>
                  )}
                </p>
              </div>
              <div className="whitespace-pre-line mb-4">
                {hotel.description.slice(0, 400)} ......
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-4">
                <div className="flex items-center border border-slate-300 rounded-md p-3 bg-gray-50">
                  <BsMap className="mr-2 text-blue-500" />
                  {hotel.city}, {hotel.country}
                </div>
                <div className="flex items-center border border-slate-300 rounded-md p-3 bg-gray-50">
                  <BsBuilding className="mr-2 text-blue-500" />
                  {hotel.type}
                </div>
                <div className="flex items-center border border-slate-300 rounded-md p-3 bg-gray-50">
                  <BiMoney className="mr-2 text-blue-500" />$
                  {hotel.pricePerNight} per night
                </div>
                <div className="flex items-center border border-slate-300 rounded-md p-3 bg-gray-50">
                  <BiHotel className="mr-2 text-blue-500" />
                  {hotel.adultCount} adults, {hotel.childCount} children
                </div>
                <div className="flex items-center border border-slate-300 rounded-md p-3 bg-gray-50">
                  <BiStar className="mr-2 text-blue-500" />
                  {hotel.starRating} Star Rating
                </div>
              </div>
              <div className="flex justify-end">
                <Link
                  className="flex items-center bg-blue-600 text-white text-xl font-bold p-3 hover:bg-blue-500 rounded-md"
                  to={`/edit-hotel/${hotel._id}`}
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyHotels;
