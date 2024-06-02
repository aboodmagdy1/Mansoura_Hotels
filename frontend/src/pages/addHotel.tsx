import { useAppContext } from "../contexts/AppContext";
import ManageHotelForm from "../forms/ManageHotelForms/ManageHotelForm";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";

const AddHotel = () => {
  const { showMessage } = useAppContext();
  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      showMessage({ message: "Hotell added successfully", type: "SUCCESS" });
    },
    onError: () => {
      showMessage({ message: "Failed to  add hotel", type: "ERROR" });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };
  return <ManageHotelForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddHotel;
