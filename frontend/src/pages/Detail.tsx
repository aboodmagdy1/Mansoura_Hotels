import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";
import { useState } from "react";
import Loader from "../components/Loader";
const Detail = () => {
  const { hotelId } = useParams();
  const { data: hotel, isLoading } = useQuery(
    "FetchHotelById",
    () => apiClient.fetchHotel(hotelId as string),
    { enabled: !!hotelId }
  );

  const [expandDescription, setExpandDescription] = useState(false);
  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  }
  return (
    <>
      {!hotel ? (
        <span className="flex justify-center  text-red-500 text-2xl font-bold">
          Hotel Not Found
        </span>
      ) : (
        <div className="space-y-6">
          <div>
            <span className="flex">
              {Array.from({ length: hotel.starRating }).map(() => (
                <AiFillStar className="fill-yellow-400" />
              ))}
            </span>
            <h1 className="font-bold text-3xl">{hotel.name}</h1>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {hotel.videoUrls &&
              hotel.videoUrls.map((url, index) => (
                <video
                  key={index}
                  src={url}
                  controls
                  className="w-full h-[300px] rounded-md"
                ></video>
              ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {hotel.facilities.map((facility) => (
              <div className="border border-slate-300 rounded-md p-3">
                {facility}
              </div>
            ))}
          </div>
          <div className="grid  grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
            <div className="whitespace-pre-line">
              {expandDescription
                ? hotel.description
                : hotel.description.slice(0, 1000)}

              <button onClick={() => setExpandDescription(!expandDescription)}>
                <span className="text-xl font-semibold text-blue-500">
                  {expandDescription ? "show less" : "show more"}
                </span>
              </button>
            </div>
            <div className="h-fit">
              <GuestInfoForm
                hotelId={hotelId as string}
                pricePerNight={hotel.pricePerNight}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Detail;
