import { AiFillStar } from "react-icons/ai";
import { hotelType } from "../../../backend/src/shared/types";
import { Link } from "react-router-dom";

type Props = {
  hotel: hotelType;
};

const SearchResultsCard = ({ hotel }: Props) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-8 gap-8 ">
      <div className="w-full h-[300px]">
        <img
          src={hotel.imageUrls[0]}
          alt={hotel.name}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="grid grid-rows-[1fr_2fr_1fr] ">
        {/* first row */}
        <div>
          <div className="flex  items-center">
            <span className="flex">
              {Array.from({ length: hotel.starRating }).map(() => (
                <AiFillStar className="fill-yellow-400" />
              ))}
            </span>
            <span className="ml-1 text-xl">{hotel.type}</span>
          </div>
          <Link
            to={`/detail/${hotel._id}`}
            className="mt-1 font-bold cursor-pointer text-2xl"
          >
            {hotel.name}
          </Link>
        </div>
        {/* scond row */}
        <div>
          <div className="line-clamp-4">{hotel.description}</div>
        </div>
        {/* third row */}
        <div className="grid grid-cols-2 items-end whitespace-nowrap">
          <div className="flex gap-1 items-center">
            {hotel.facilities.slice(0, 3).map((facility) => (
              <span className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap ">
                {facility}
              </span>
            ))}
            <span className="text-sm">
              {" "}
              {hotel.facilities.length > 3 &&
                `+${hotel.facilities.length - 3} more`}
            </span>
          </div>
          <div className="flex flex-col gap-1 items-end">
            <span className="font-bold">${hotel.pricePerNight}per night</span>
            <Link
              to={`/detail/${hotel._id}`}
              className="bg-blue-600 text-white h-full p-2 text-xl max-w-fit font-bold hover:bg-blue-500"
            >
              View More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsCard;
