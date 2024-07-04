import * as apiClient from "../api-client";
import { useQuery } from "react-query";
import Loader from "../components/Loader";
import HotelCard_Admin from "../components/HotelCard_Admin";

import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

const Admin = () => {
  const { data: hotels, isLoading } = useQuery(
    "adminHotels",
    apiClient.fetchAllHotels_Admin
  );

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  }

  // Filter hotels based on their approval status
  const approvedHotels = hotels?.filter((hotel) => hotel.approved);
  const pendingHotels = hotels?.filter((hotel) => !hotel.approved);

  return (
    <div className="bg-gray-100 min-h-screen p-5">
      <div className="bg-white shadow-md rounded-lg p-4 mb-5">
        <Tabs variant="soft-rounded" colorScheme="blue">
          <TabList className="flex justify-center mb-5">
            <Tab
              className="text-lg font-semibold text-gray-600 transition rounded-md px-4 py-2"
              _selected={{ bg: "blue", color: "white" }}
            >
              DB Hotels
            </Tab>
            <Tab
              className="text-lg font-semibold text-gray-600 transition rounded-md px-4 py-2"
              _selected={{ bg: "blue", color: "white" }}
            >
              Approved Hotels
            </Tab>
            <Tab
              className="text-lg font-semibold text-gray-600 transition rounded-md px-4 py-2"
              _selected={{ bg: "blue", color: "white" }}
            >
              Pending Hotels
            </Tab>
          </TabList>
          {/* make a line to devide the sections  */}
          <div className="border-b-2 border-blue-200 mb-4"></div>
          <TabPanels>
            <TabPanel>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {hotels?.map((hotel) => (
                  <div
                    key={hotel._id}
                    className="bg-white shadow-md rounded-lg p-2"
                  >
                    <HotelCard_Admin hotel={hotel} />
                  </div>
                ))}
              </div>
            </TabPanel>
            <TabPanel>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {approvedHotels?.map((hotel) => (
                  <div
                    key={hotel._id}
                    className="bg-white shadow-md rounded-lg p-2"
                  >
                    <HotelCard_Admin hotel={hotel} />
                  </div>
                ))}
              </div>
            </TabPanel>
            <TabPanel>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {pendingHotels?.map((hotel) => (
                  <div
                    key={hotel._id}
                    className="bg-white shadow-md rounded-lg p-2"
                  >
                    <HotelCard_Admin hotel={hotel} />
                  </div>
                ))}
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
