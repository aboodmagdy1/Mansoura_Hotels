import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignInForm = () => {
  const queryClient = useQueryClient();
  const { showMessage } = useAppContext();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();
  const navigate = useNavigate();

  const mutations = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      //1)show message
      showMessage({ message: "Sign In Success", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      //2) navigate to home
      navigate("/");
    },
    //thrown from the fetch request
    onError: (error: Error) => {
      showMessage({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((formData) => {
    mutations.mutate(formData);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Sign In</h2>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "password must be at least 6 caracters",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>

      <span className="flex item-center justify-between">
        <span className="text-sm">
          {" "}
          Not Registerd?{" "}
          <Link className="underline" to="/register">
            Register Now!
          </Link>
        </span>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500"
        >
          LogIn
        </button>
      </span>
    </form>
  );
};

export default SignInForm;
