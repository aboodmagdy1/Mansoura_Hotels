import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../api-client";
import { useState } from "react";
import SearchResultsCard from "../components/SearchResultsCard";
import Pagination from "../components/pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import TypesFilter from "../components/hotelTypesFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";
import PriceFilter from "../components/PriceFilter";
import SortByList from "../components/SortByList";

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedTypes, setselectedTypes] = useState<string[]>([]);
  const [selectedFacilities, setselectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [selectedSortOption, setSelectedSortOption] = useState<
    string | undefined
  >();
  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption: selectedSortOption,
  };

  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;

    setSelectedStars((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
  };
  const handleTypesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hotelType = event.target.value;

    setselectedTypes((prevtypes) =>
      event.target.checked
        ? [...prevtypes, hotelType]
        : prevtypes.filter((type) => type !== hotelType)
    );
  };
  const handleFacilitiesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hotelFacility = event.target.value;

    setselectedFacilities((prevFacilities) =>
      event.target.checked
        ? [...prevFacilities, hotelFacility]
        : prevFacilities.filter((facility) => facility !== hotelFacility)
    );
  };

  const { data: hotelData } = useQuery(["searchHotels", searchParams], () => {
    return apiClient.searchHotels(searchParams);
  });
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5 ">
        <div className="rounded-lg border border-slate-300 p-5 h-fit sticky">
          <div className="space-y-5">
            <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
              Filter by:
            </h3>
            <StarRatingFilter
              selectedStars={selectedStars}
              onChange={handleStarsChange}
            />
            <TypesFilter
              selectedTypes={selectedTypes}
              onChange={handleTypesChange}
            />
            <FacilitiesFilter
              selectedFacilities={selectedFacilities}
              onChange={handleFacilitiesChange}
            />
            <PriceFilter
              selectedPrice={selectedPrice}
              onChange={(value?: number) => setSelectedPrice(value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-5 ">
          <div className="flex justify-between items-center ">
            <span className="text-xl font-bold ">
              {hotelData?.pagination.total} Hotels found
              {search.destination ? `in ${search.destination}` : ""}
            </span>
            <SortByList
              selectedOption={selectedSortOption}
              onChange={(option?: string) => setSelectedSortOption(option)}
            />
          </div>
          {hotelData?.data.map((hotel) => (
            <SearchResultsCard hotel={hotel} />
          ))}
          {hotelData?.pagination.total ? (
            <div>
              <Pagination
                page={hotelData?.pagination.page || 1}
                pages={hotelData?.pagination.pages || 1}
                onPageChange={(page) => setPage(page)}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
