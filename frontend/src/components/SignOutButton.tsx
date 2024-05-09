import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const SignOutButton = () => {
  const queryClient = useQueryClient();
  const { showMessage } = useAppContext();
  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken"); //enfore the query with this name to run in the success
      showMessage({ message: "Logged Out successfuly", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showMessage({ message: error.message, type: "ERROR" });
    },
  });

  const handleOnClick = () => {
    mutation.mutate();
  };

  return (
    <button
      onClick={handleOnClick}
      className="text-blue-600 px-3 bg-white font-bold hover:bg-gray-100"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
