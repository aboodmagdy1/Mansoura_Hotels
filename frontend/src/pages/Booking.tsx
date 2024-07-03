import { useQuery } from "react-query";
import * as apiClient from "../api-client.ts";
import BookingForm from "../forms/BookingForm/BookingForm.tsx";
import { useParams } from "react-router-dom";
import { useSearchContext } from "../contexts/SearchContext.tsx";
import { useEffect, useState } from "react";
import BookingDetailsSummary from "../components/BookingDetailsSummary.tsx";
import { Elements } from "@stripe/react-stripe-js";
import { useAppContext } from "../contexts/AppContext.tsx";
import Loader from "../components/Loader.tsx";

const Booking = () => {
  const { stripePromise } = useAppContext();
  const search = useSearchContext();
  const { data: currentUser, isLoading: isUserLoading } = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser
  );
  const { hotelId } = useParams();
  const { data: hotel, isLoading: isLoadingHotel } = useQuery(
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

  const { data: paymentIntentData, isLoading: isPaymentLoading } = useQuery(
    "createPaymentIntent",
    () =>
      apiClient.createPaymentIntent(
        hotelId as string,
        numberOfNights.toString()
      ),
    {
      enabled: !!hotelId && numberOfNights > 0,
    }
  );
  if (!hotel) {
    return (
      <>
        {isLoadingHotel ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : (
          <div></div>
        )}
      </>
    );
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
      {currentUser && paymentIntentData ? (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: paymentIntentData.clientSecret,
          }}
        >
          <BookingForm
            paymentIntent={paymentIntentData}
            currentUser={currentUser}
          />
        </Elements>
      ) : (
        <>
          {isUserLoading || isPaymentLoading ? (
            <div className="flex justify-center">
              <Loader />
            </div>
          ) : (
            <div className="flex justify-center ">
              <span className="text-xl text-blue-600">
                You Must Chose Checkout Date To Book at least 1 night
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Booking;
