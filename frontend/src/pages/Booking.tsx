import { useQuery } from "react-query";
import * as apiClient from "../api-client.ts";
import BookingForm from "../forms/BookingForm/BookingForm.tsx";
import { useParams } from "react-router-dom";
import { useSearchContext } from "../contexts/SearchContext.tsx";
import { useEffect, useState } from "react";
import BookingDetailsSummary from "../components/BookingDetailsSummary.tsx";

const Booking = () => {
  const search = useSearchContext();
  const { data: currentUser } = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser
  );
  const { hotelId } = useParams();
  const { data: hotel } = useQuery(
    "fetchHoteById",
    () => apiClient.fetchHotel(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );
  const [numberOfNights, setNumberOfNights] = useState<number>(0);
  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);
      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  if (!hotel) {
    return <></>;
  }
  return (
    <div className="grid md:grid-cols-[1fr_2fr]">
      <BookingDetailsSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNights={numberOfNights}
        hotel={hotel}
      />
      {currentUser && <BookingForm currentUser={currentUser} />}
    </div>
  );
};

export default Booking;
