import { Link } from "react-router-dom";
import { hotelType } from "../../../backend/src/shared/types";
import { AiFillStar } from "react-icons/ai";

type Props = {
  hotel: hotelType;
};

const HotelCard_Admin = ({ hotel }: Props) => {
  return (
    <Link
      to={`/admin/hotels/${hotel._id}`}
      className="relative cursor-pointer overflow-hidden rounded-md shadow-lg transition-transform transform hover:scale-105"
    >
      <div className="absolute bottom-0 p-4 bg-black bg-opacity-50 w-full rounded-md">
        <span className="text-white font-bold tracking-tight text-2xl block">
          {hotel.name}
        </span>
        <span className="flex items-center mt-1">
          {Array.from({ length: hotel.starRating }).map((_, index) => (
            <AiFillStar key={index} className="fill-yellow-400" />
          ))}
        </span>
      </div>
      <div className="h-[300px]">
        <img
          alt={hotel.name}
          src={hotel.imageUrls[0]}
          className="w-full h-full object-cover object-center rounded-md"
        />
      </div>
    </Link>
  );
};

export default HotelCard_Admin;
