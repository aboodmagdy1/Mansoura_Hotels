import { useForm, FormProvider } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import { useEffect } from "react";
import { hotelType } from "../../../../backend/src/shared/types";
import VideoSection from "./VideoSection";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  imageUrls: string[];
  videoFiles: FileList;
  videoUrls: string[];
  adultCount: number;
  childCount: number;
};

type Props = {
  hotel?: hotelType;
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
};

const ManageHotelForm = ({ onSave, isLoading, hotel }: Props) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    reset(hotel);
  }, [hotel, reset]);

  const onSubmit = handleSubmit((data: HotelFormData) => {
    const formData = new FormData();

    if (hotel) {
      formData.append("hotelId", hotel._id);
    }
    formData.append("name", data.name);
    formData.append("city", data.city);
    formData.append("country", data.country);
    formData.append("description", data.description);
    formData.append("type", data.type);
    formData.append("pricePerNight", data.pricePerNight.toString());
    formData.append("starRating", data.starRating.toString());
    formData.append("adultCount", data.adultCount.toString());
    formData.append("childCount", data.childCount.toString());

    data.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    if (data.imageUrls) {
      data.imageUrls.forEach((imgUrl, index) => {
        formData.append(`imageUrls[${index}]`, imgUrl);
      });
    }
    if (data.videoUrls) {
      data.videoUrls.forEach((vidUrl, index) => {
        formData.append(`videoUrls[${index}]`, vidUrl);
      });
    }

    Array.from(data.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });
    Array.from(data.videoFiles).forEach((videoFile) => {
      formData.append(`videoFiles`, videoFile);
    });

    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form
        className="flex flex-col gap-10 p-6 bg-white rounded-lg shadow-md"
        onSubmit={onSubmit}
      >
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />
        <VideoSection />
        <div className="flex justify-end">
          <button
            type="submit"
            className="border rounded bg-blue-600 text-white py-2 px-4 font-bold hover:bg-blue-500 text-xl"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
