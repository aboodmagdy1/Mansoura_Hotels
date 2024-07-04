import { useAppContext } from "../contexts/AppContext";

const Hero = () => {
  const { isLoggedIn, role } = useAppContext();

  return (
    <div className="bg-blue-800 pb-16">
      <div className="container mx-auto flex flex-col gap-2 mt-5 ">
        {isLoggedIn && role === "admin" ? (
          <></>
        ) : (
          <>
            <h1 className="text-white text-5xl font-bold">
              Find Your next Stay
            </h1>
            <p className="text-2xl text-white">
              Search low prices on hotels for your dream vacation
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Hero;
