import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { AiFillStar } from "react-icons/ai";
import GuestInfo from "../components/GuestInfor";
const Detail = () => {
  const { hotelId } = useParams();
  const { data: hotel } = useQuery(
    "FetchHotelById",
    () => apiClient.fetchHotel(hotelId as string),
    { enabled: !!hotelId }
  );

  if (!hotel) {
    return <> </>;
  }
  return (
    <div className="space-y-6">
      <div>
        <span className="flex">
          {Array.from({ length: hotel.starRating }).map(() => (
            <AiFillStar className="fill-yellow-400" />
          ))}
        </span>
        <h1 className="font-bold text-3xl">{hotel.name}</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {hotel.imageUrls.map((url) => (
          <div className="h-[300px]">
            <img
              src={url}
              alt={hotel.name}
              className="rounded-md w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        {hotel.facilities.map((facility) => (
          <div className="border border-slate-300 rounded-md p-3">
            {facility}
          </div>
        ))}
      </div>
      <div className="grid  grid-cols-1 lg:grid-cols-[2fr_1fr] ">
        <div className="whitespace-pre-line">{hotel.description}</div>
        <div className="h-fit">
          <GuestInfo />
        </div>
      </div>
    </div>
  );
};

export default Detail;
