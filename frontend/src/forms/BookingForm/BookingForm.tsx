import { useForm } from "react-hook-form";
import { userType } from "../../../../backend/src/shared/types";
type bookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
};

type Props = {
  currentUser: userType;
};
const BookingForm = ({ currentUser }: Props) => {
  const { register, handleSubmit } = useForm<bookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName || "",
      lastName: currentUser.lastName || "",
      email: currentUser.email || "",
    },
  });
  return (
    <form className="border border-slate-300 rounded-lg gap-5 p-5 grid grid-cols-1 ">
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
    </form>
  );
};

export default BookingForm;
