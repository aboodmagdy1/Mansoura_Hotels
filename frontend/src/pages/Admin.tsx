import * as apiClient from "../api-client";
import { useQuery } from "react-query";
import Loader from "../components/Loader";
import HotelCard_Admin from "../components/HotelCard_Admin";
import { Link } from "react-router-dom";
const Admin = () => {
  const { data: hotels, isLoading } = useQuery(
    "adminHotels",
    apiClient.fetchAllHotels_Admin
  );
  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  }
  return (
    <div className="bg-gray-100 min-h-screen p-5 flex flex-col gap-5 ">
      <div className="bg-white shadow-md rounded-lg p-4">
        <Link
          to={`/admin`}
          className="text-black text-xl font-bold  border border-gray-300 rounded-md p-2 bg-blue-200 hover:bg-blue-300"
        >
          DB Hotels
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {hotels?.map((hotel) => (
          <div className="bg-white shadow-md rounded-lg p-2">
            <HotelCard_Admin key={hotel._id} hotel={hotel} />{" "}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
