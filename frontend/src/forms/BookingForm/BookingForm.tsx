import { useForm } from "react-hook-form";
import {
  PaymentIntentResponse,
  userType,
} from "../../../../backend/src/shared/types";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useMutation } from "react-query";
import * as apiClient from "../../api-client";
import { useSearchContext } from "../../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";
export type bookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  hotelId: string;
  checkIn: Date;
  checkOut: Date;
  paymentIntentId: string;
  totalConst: number;
};

type Props = {
  currentUser: userType;
  paymentIntent: PaymentIntentResponse;
};
const BookingForm = ({ currentUser, paymentIntent }: Props) => {
  const stripe = useStripe();
  const elements = useElements(); //collect the card details that user enter
  const search = useSearchContext();
  const { hotelId } = useParams();
  const { register, handleSubmit } = useForm<bookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName || "",
      lastName: currentUser.lastName || "",
      email: currentUser.email || "",
      adultCount: search.adultCount || 1,
      childCount: search.childCount || 0,
      hotelId: hotelId || "",
      checkIn: search.checkIn || new Date().toISOString(),
      checkOut: search.checkOut || new Date().toISOString(),
      paymentIntentId: paymentIntent.paymentIntentId,
      totalConst: paymentIntent.totalCost || 0,
    },
  });
  const { showMessage } = useAppContext();

  const { mutate: bookRoom, isLoading } = useMutation(
    apiClient.createRoomBoooking,
    {
      onSuccess: () => {
        showMessage({ message: "Booking Saved!", type: "SUCCESS" });
      },
      onError: () => {
        showMessage({ message: "Error Saving Booking", type: "ERROR" });
      },
    }
  );

  const onSubmit = async (formData: bookingFormData) => {
    if (!stripe || !elements) {
      return;
    }
    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
      },
    });

    if (result.paymentIntent?.status === "succeeded") {
      // book the room
      bookRoom({ ...formData, paymentIntentId: result.paymentIntent.id });
    }
  };
  return (
    <form
      className="border border-slate-300 rounded-lg gap-5 p-5 grid grid-cols-1 "
      onSubmit={handleSubmit(onSubmit)}
    >
      <span className="text-3xl font-bold">Confirm Your Details</span>
      <div className="grid grid-cols-2 gap-6  ">
        <label className="font-bold text-gray-700  text-sm rlex-1">
          First Name :
          <input
            className="mt-1 border rouded w-full py-2 px-3 bg-gray-200 font-normal"
            readOnly
            disabled
            type="text"
            {...register("firstName")}
          />
        </label>
        <label className="font-bold text-gray-700  text-sm rlex-1">
          Last Name :
          <input
            className="mt-1 border rouded w-full py-2 px-3 bg-gray-200 font-normal"
            readOnly
            disabled
            type="text"
            {...register("lastName")}
          />
        </label>
        <label className="font-bold text-gray-700  text-sm rlex-1">
          Email :
          <input
            className="mt-1 border rouded w-full py-2 px-3 bg-gray-200 font-normal"
            readOnly
            disabled
            type="text"
            {...register("email")}
          />
        </label>
      </div>
      <div className="space-y-2">
        <h2 className="font-semibold text-xl">Your Price Summary</h2>
      </div>
      <div className="bg-blue-200 rounded-md p-4 ">
        <div className="font-semibold text:lg">
          Total Cost : ${paymentIntent.totalCost.toFixed(2)}
        </div>
        <div className="text-xs">include taxes and charges</div>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-xl">Payment Details </h3>
        <CardElement
          id="payment-element"
          className="border rounded-md p-2 text-sm"
        />
      </div>

      <div className="flex justify-end">
        <button
          disabled={isLoading}
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-md disabled:bg-gray-500"
        >
          {isLoading ? "Saving..." : "Confirm Booking"}
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
