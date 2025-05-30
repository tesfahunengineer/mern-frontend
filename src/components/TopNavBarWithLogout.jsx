import { useNavigate } from "react-router-dom";
import { Button } from "./Button.jsx";

export const TopNavBarWithLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId"); // If you have other relevant data
    navigate("/signin");
  };

  return (
    <div className="bg-gray-950 dark:bg-gray-900 text-white py-3 px-4 w-full relative">
      <div className="flex items-center justify-between flex-wrap gap-2">
        {/* Centered Heading */}
        <h2 className="absolute left-1/2 transform -translate-x-1/2 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold">
          YEKASSA SITE MANAGEMENT SYSTEM
        </h2>

        {/* Logout Button */}
        <div className="ml-auto">
          <Button label="Logout" onClick={handleLogout} />
        </div>
      </div>
    </div>
  );
};
