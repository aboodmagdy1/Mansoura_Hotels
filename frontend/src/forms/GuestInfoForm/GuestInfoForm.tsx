import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useSearchContext } from "../../contexts/SearchContext";
import { useAppContext } from "../../contexts/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

type Props = {
  hotelId: string;
  pricePerNight: number;
};

type GuestInfoFromData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};
const GustInfoForm = ({ hotelId, pricePerNight }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  // to make the fields filled with the values of search
  const search = useSearchContext();
  const { isLoggedIn } = useAppContext();
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<GuestInfoFromData>({
    defaultValues: {
      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn,
      checkOut: search.checkOut,
    },
  });

  const handleSignInClicked = (data: GuestInfoFromData) => {
    search.saveSearchValues("", checkIn, checkOut, adultCount, childCount);
    navigate("/sign-in", { state: { from: location } });
  };

  const onSubmit = (data: GuestInfoFromData) => {
    search.saveSearchValues("", checkIn, checkOut, adultCount, childCount);
    navigate(`/hotel/${hotelId}/booking`);
  };

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const minDate = new Date();
  const maxDate = new Date();

  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const adultCount = watch("adultCount");
  const childCount = watch("childCount");

  return (
    <div className="flex flex-col p-4 gap-4 bg-blue-200">
      <h3 className="text-md font-bold">${pricePerNight}</h3>
      <form
        onSubmit={
          isLoggedIn
            ? handleSubmit(onSubmit)
            : handleSubmit(handleSignInClicked)
        }
      >
        <div className="grid grid-cols-1 gap-4 items-center">
          <div>
            <DatePicker
              required
              selected={checkIn}
              onChange={(date) => setValue("checkIn", date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              className="min-w-full bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full"
            />
          </div>
          <div>
            <DatePicker
              required
              selected={checkOut}
              onChange={(date) => setValue("checkOut", date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              className="min-w-full bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full"
            />
          </div>
          <div className="flex bg-white px-2 py-1 gap-2">
            <label className="flex items-center">
              Adults:
              <input
                className="w-full p-1 focus:outline-none font-bold "
                type="number"
                min={1}
                max={20}
                {...register("adultCount", {
                  required: "this field is required",
                  min: {
                    value: 1,
                    message: "There must be at leas one adult",
                  },
                  valueAsNumber: true,
                })}
              />
            </label>
            {errors.adultCount && (
              <span className="text-red-500 text-sm font-semibold">
                {errors.adultCount.message}
              </span>
            )}
            <label className="flex items-center">
              Children:
              <input
                className="w-full p-1 focus:outline-none font-bold "
                type="number"
                min={0}
                max={20}
                {...register("childCount", {
                  valueAsNumber: true,
                })}
              />
            </label>
            {errors.childCount && (
              <span className="text-red-500 text-sm font-semibold">
                {errors.childCount.message}
              </span>
            )}
          </div>

          {isLoggedIn ? (
            <button className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500  text-xl">
              Book Now
            </button>
          ) : (
            <button className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500  text-xl">
              Sign to book
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GustInfoForm;
