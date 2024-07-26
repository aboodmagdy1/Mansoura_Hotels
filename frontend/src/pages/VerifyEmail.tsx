import { useSearchParams, useNavigate } from "react-router-dom";
import * as apiClient from "../api-client";
import { useQuery } from "react-query";
import { InfinitySpin } from "react-loader-spinner";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const code = searchParams.get("code");
  const { isLoading, isError } = useQuery(
    "verifyEmail",
    () => apiClient.verifyEmail(code as string),
    {
      enabled: !!code,
    }
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Verifying .... <InfinitySpin width="200" color="#4fa94d" />
      </div>
    );
  } else if (isError) {
    return (
      <div className="flex flex-col justify-center items-center ">
        <div className="text-red-500 text-2xl font-semibold mb-4">
          Verification failed
        </div>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={() => navigate("/register")}
        >
          Try Again
        </button>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-center items-center ">
        <div className="text-green-500 text-2xl font-semibold mb-4">
          Email verified successfully
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => navigate("/sign-in")}
        >
          Login
        </button>
      </div>
    );
  }
};

export default VerifyEmail;
