import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import React from "react";

const VideoSection = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  const existingVideoUrls = watch("videoUrls");
  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    VideoUrl: string
  ) => {
    event.preventDefault();
    setValue(
      "videoUrls",
      existingVideoUrls.filter((url) => url !== VideoUrl)
    );
  };

  return (
    <div className="flex flex-col  gap-5 ">
      <h2 className="text-2xl font-bold mb-3">Videos</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        {existingVideoUrls && (
          <div className="grid grid-cols-6 gap-4 ">
            {existingVideoUrls.map((url) => (
              <div className="relative group">
                <video
                  src={url}
                  className="min-h-full object-cover w-full"
                  controls
                />
                <button
                  onClick={(e) => handleDelete(e, url)}
                  className="absolute top-0 left-0 m-2 bg-black bg-opacity-50 text-white p-1 rounded"
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
          accept="video/*"
          className="text-gray-700 font-normal  w-full "
          {...register("videoFiles", {
            validate: (videos) => {
              const totalVideos =
                videos.length + (existingVideoUrls?.length || 0);

              if (totalVideos > 2) {
                return "You can upload a maximum of 2 videos";
              }
              return true;
            },
          })}
        />
        {errors.videoFiles && (
          <span className="text-red-500 text-sm font-bold">
            {errors.videoFiles.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default VideoSection;
