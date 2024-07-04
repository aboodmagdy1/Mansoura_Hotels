import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
const SearchBar = () => {
  // have global states
  const search = useSearchContext();
  const navigate = useNavigate();
  const { isLoggedIn, role } = useAppContext();

  //local states(enhance performance)
  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultsCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);
  //   const [hotelId, setHotelId] = useState<string>(search.hotelId);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate("/search");
  };
  const handleClear = () => {
    setDestination("");
    setCheckIn(new Date());
    setCheckOut(new Date());
    setAdultsCount(1);
    setChildCount(0);
  };

  const minDate = new Date();
  const maxDate = new Date();

  maxDate.setFullYear(maxDate.getFullYear() + 1);

  if (isLoggedIn && role === "admin") {
    return <></>;
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="-mt-8 p-3 bg-red-400  rounded shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5  items-center gap-4"
    >
      <div className="flex flex-row items-center flex-1  bg-white p-2">
        <MdTravelExplore className="mr-2" size={25} />
        <input
          placeholder="Where are you going"
          className="text-md w-full focus:outline-none"
          value={destination}
          onChange={(e) => {
            setDestination(e.target.value);
          }}
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
            value={adultCount}
            onChange={(e) => {
              setAdultsCount(parseInt(e.target.value));
            }}
          />
        </label>
        <label className="flex items-center">
          Children:
          <input
            className="w-full p-1 focus:outline-none font-bold "
            type="number"
            min={0}
            max={20}
            value={childCount}
            onChange={(e) => {
              setChildCount(parseInt(e.target.value));
            }}
          />
        </label>
      </div>
      <div className="flex bg-white px-2 py-2 gap-2">
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
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
      <div className="flex bg-white px-2 py-2 gap-2">
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-out Date"
          className="min-w-full bg-white p-2 focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>

      <div className="flex gap-1 ">
        <button
          type="submit"
          className="w-2/3 bg-blue-600 text-white text-xl font-bold h-full p-2 hover:bg-blue-500 "
        >
          Search
        </button>

        <button
          type="submit"
          className="w-1/3 bg-red-600 text-white text-xl font-bold h-full p-2 hover:bg-red-500 "
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
