import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { AiFillStar } from "react-icons/ai";
import { FaWifi, FaSwimmingPool, FaParking } from "react-icons/fa"; // Example icons
import { useState } from "react";
import Loader from "../components/Loader";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"; // Using Chakra UI for tabs
import Tooltip from "@mui/material/Tooltip"; // Using Material UI for tooltips

const HotelDetails_Admin = () => {
  const { hotelId } = useParams();
  const { data: hotel, isLoading } = useQuery(
    "fetchHotel_Admin",
    () => apiClient.fetchHotel_Admin(hotelId as string),
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
        <span className="flex justify-center text-red-500 text-2xl font-bold">
          Hotel Not Found
        </span>
      ) : (
        <div className="space-y-6 p-6 bg-gray-100 rounded-lg shadow-lg">
          {/* Summary Section */}
          <div className="flex justify-between items-center bg-white p-4 rounded-md shadow-md">
            <div>
              <h1 className="font-bold text-3xl">{hotel.name}</h1>
              <div className="flex">
                {Array.from({ length: hotel.starRating }).map((_, index) => (
                  <AiFillStar key={index} className="fill-yellow-400" />
                ))}
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg">
                {hotel.city}, {hotel.country}
              </p>
              <p className="text-md">Price: ${hotel.pricePerNight}</p>
              <p className="text-md">
                Appreviation : {hotel.approved ? "approved" : "pending"}
              </p>
            </div>
          </div>

          {/* Tabs for Sections */}
          <Tabs variant="soft-rounded" colorScheme="blue">
            <TabList className="bg-white p-2 rounded-md shadow-sm flex justify-center space-x-4">
              <Tab
                className="text-lg font-semibold text-gray-600 transition rounded-md px-4 py-2"
                _selected={{ bg: "blue.500", color: "black" }}
              >
                Overview
              </Tab>
              <Tab
                className="text-lg font-semibold text-gray-600 transition rounded-md px-4 py-2"
                _selected={{ bg: "blue.500", color: "black" }}
              >
                Media
              </Tab>
              <Tab
                className="text-lg font-semibold text-gray-600 transition rounded-md px-4 py-2"
                _selected={{ bg: "blue.500", color: "black" }}
              >
                Facilities
              </Tab>
              <Tab
                className="text-lg font-semibold text-gray-600 transition rounded-md px-4 py-2"
                _selected={{ bg: "blue.500", color: "black" }}
              >
                Description
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <div className="space-y-4">
                  <p>
                    <strong>Cit:</strong> {hotel.city}
                  </p>
                  <p>
                    <strong>CountrY:</strong> {hotel.country}
                  </p>
                  <p>{/* <strong>Email:</strong> {hotel.email} */}</p>
                </div>
              </TabPanel>
              <TabPanel>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                  {hotel.imageUrls.map((url, index) => (
                    <div key={index} className="h-[300px]">
                      <img
                        src={url}
                        alt={hotel.name}
                        className="rounded-md w-full h-full object-cover object-center"
                      />
                    </div>
                  ))}
                </div>
              </TabPanel>
              <TabPanel>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  {hotel.facilities.map((facility, index) => (
                    <Tooltip key={index} title={facility}>
                      <div className="border border-slate-300 rounded-md p-3 flex items-center">
                        {facility.includes("WiFi") && (
                          <FaWifi className="mr-2" />
                        )}
                        {facility.includes("Pool") && (
                          <FaSwimmingPool className="mr-2" />
                        )}
                        {facility.includes("Parking") && (
                          <FaParking className="mr-2" />
                        )}
                        {facility}
                      </div>
                    </Tooltip>
                  ))}
                </div>
              </TabPanel>
              <TabPanel>
                <div className="whitespace-pre-line">
                  {expandDescription
                    ? hotel.description
                    : hotel.description.slice(0, 1000)}
                  <button
                    onClick={() => setExpandDescription(!expandDescription)}
                  >
                    <span className="text-xl font-semibold text-blue-500">
                      {expandDescription ? "show less" : "show more"}
                    </span>
                  </button>
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      )}
    </>
  );
};

export default HotelDetails_Admin;
