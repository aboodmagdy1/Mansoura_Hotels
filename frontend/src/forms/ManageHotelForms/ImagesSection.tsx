import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="flex flex-col  gap-5 ">
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        <input
          type="file"
          multiple
          accept="image/*"
          className="text-gray-700 font-normal  w-full "
          {...register("imageFiles", {
            validate: (images) => {
              const totalImages = images.length;
              if (totalImages === 0) {
                return "Please upload at least one image";
              }
              if (totalImages > 6) {
                return "You can upload a maximum of 6 images";
              }
              return true;
            },
          })}
        />
        {errors.imageFiles && (
          <span className="text-red-500 text-sm font-bold">
            {errors.imageFiles.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default ImagesSection;
