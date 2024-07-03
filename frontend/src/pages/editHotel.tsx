import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";

import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/ManageHotelForms/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";
import Loader from "../components/Loader";

const EditHotel = () => {
  const { showMessage } = useAppContext();
  const { hotelId } = useParams();
  const { data: hotel, isLoading: isLoadingHotel } = useQuery(
    "fetchMyHotelById",
    () => apiClient.fetchHotelById(hotelId || ""),
    {
      enabled: !!hotelId, // mean make this fetch only if hotelId is not null
    }
  );

  const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
    onSuccess: () => {
      showMessage({ message: "Hotel Saved!", type: "SUCCESS" });
    },
    onError: () => {
      showMessage({ message: "Error Saving Hotel", type: "ERROR" });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };
  return (
    <>
      {isLoadingHotel ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : (
        <ManageHotelForm
          hotel={hotel}
          onSave={handleSave}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default EditHotel;
