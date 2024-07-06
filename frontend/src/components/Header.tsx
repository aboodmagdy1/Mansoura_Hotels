import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";
const Header = () => {
  const { isLoggedIn, role } = useAppContext();
  return (
    <div className="bg-blue-800 py-4">
      <div className="container mx-auto flex justify-between">
        <span className="text-white text-3xl font-bold tracking-tight ">
          <Link to="/">Mansour-Hotels</Link>
        </span>
        <span>
          {isLoggedIn && role == "admin" ? (
            <span className="text-white text-2xl border border-white-500 rounded-lg p-3 font-bold">
              <Link to="/admin">Admin Dashboard View</Link>
            </span>
          ) : (
            ""
          )}
        </span>
        <span className="flex space-x-2 ">
          {isLoggedIn ? (
            <>
              {role === "user" && (
                <Link
                  className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                  to="/my-bookings"
                >
                  My Bookings
                </Link>
              )}

              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                to="/my-hotels"
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : isLoggedIn && role === "admin" ? (
            <>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex items-center bg-white text-blue-600 px-3 font-bold "
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
