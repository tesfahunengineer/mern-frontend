import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import navigation

const FreeTrialComponent = () => {
  const TRIAL_DAYS = 30;
  const navigate = useNavigate(); // Initialize navigation

  const getStoredTrialStart = () => {
    const storedDate = localStorage.getItem("trialStartDate");
    return storedDate ? new Date(storedDate) : null;
  };

  const [trialStartDate, setTrialStartDate] = useState(getStoredTrialStart);
  const [daysLeft, setDaysLeft] = useState(TRIAL_DAYS);

  useEffect(() => {
    if (!trialStartDate) {
      const startDate = new Date();
      localStorage.setItem("trialStartDate", startDate);
      setTrialStartDate(startDate);
    } else {
      const currentDate = new Date();
      const diffTime = Math.max(
        TRIAL_DAYS -
          Math.floor((currentDate - trialStartDate) / (1000 * 60 * 60 * 24)),
        0
      );
      setDaysLeft(diffTime);
    }
  }, [trialStartDate]);

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg text-center">
      {daysLeft > 0 ? (
        <>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            🎉 Free Trial Activated!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            You have{" "}
            <span className="font-semibold text-indigo-500">{daysLeft}</span>{" "}
            days left.
          </p>
          <button
            onClick={() => navigate("/dashboard")} // Navigate to Dashboard
            className="mt-4 px-5 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
          >
            Enjoy the Trial
          </button>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-red-600">
            ⏳ Free Trial Expired!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Upgrade to continue using our services.
          </p>
          <button
            onClick={() => navigate("/pricing")} // Example upgrade page
            className="mt-4 px-5 py-2 bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-700 transition duration-300"
          >
            Upgrade Now
          </button>
        </>
      )}
    </div>
  );
};

export default FreeTrialComponent;
