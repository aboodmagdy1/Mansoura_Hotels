import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import React from "react";

const ImagesSection = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  const existingImageUrls = watch("imageUrls");
  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ImageUrl: string
  ) => {
    event.preventDefault();
    setValue(
      "imageUrls",
      existingImageUrls.filter((url) => url !== ImageUrl)
    );
  };

  return (
    <div className="flex flex-col  gap-5 ">
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        {existingImageUrls && (
          <div className="grid grid-cols-6 gap-4 ">
            {existingImageUrls.map((url) => (
              <div className="relative group">
                <img
                  src={url}
                  alt="image"
                  className="min-h-full object-cover "
                />
                <button
                  onClick={(e) => handleDelete(e, url)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0  group-hover:opacity-100 text-white"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          type="file"
          multiple
          accept="image/*"
          className="text-gray-700 font-normal  w-full "
          {...register("imageFiles", {
            validate: (images) => {
              const totalImages =
                images.length + (existingImageUrls?.length || 0);

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
