import { Link } from "react-router-dom";
import { hotelType } from "../../../backend/src/shared/types";
import { AiFillStar } from "react-icons/ai";

type Props = {
  hotel: hotelType;
};

const LatestDestinationCard = ({ hotel }: Props) => {
  return (
    <Link
      to={`/detail/${hotel._id}`}
      className="relative cursor-pointer overflow-hidden rounded-md"
    >
      <div className="absolute bottom-0 p-4 bg-black bg-opacity-50 w-full rounded-md">
        <span className="text-white font-bold tracking-tight text-2xl">
          {hotel.name}
        </span>
        <span className="flex">
          {Array.from({ length: hotel.starRating }).map(() => (
            <AiFillStar className="fill-yellow-400" />
          ))}
        </span>
      </div>
      <div className="h-[300px]">
        <img
          alt={hotel.name}
          src={hotel.imageUrls[0]}
          className="w-full h-full object-cover object-center"
        />
      </div>
    </Link>
  );
};

export default LatestDestinationCard;
