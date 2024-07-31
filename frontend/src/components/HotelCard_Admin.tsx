import { Link } from "react-router-dom";
import { hotelType } from "../../../backend/src/shared/types";

type Props = {
  hotel: hotelType;
};

const HotelCard_Admin = ({ hotel }: Props) => {
  return (
    <Link
      to={`/admin/hotels/${hotel._id}`}
      className=" cursor-pointer overflow-hidden rounded-md"
    >
      <div>
        <div className="h-[300px] mb-auto">
          <img
            alt={hotel.name}
            src={hotel.imageUrls[0]}
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="p-4 bg-blue-300 w-full rounded-md flex justify-between">
          <span className="text-white font-bold tracking-tight text-2xl">
            {hotel.name}
          </span>

          <span className="text-white font-bold tracking-tight text-2xl">
            Status: {hotel.updateApprove ? "updated" : "reviewd"}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard_Admin;
