import { useState, useEffect } from "react";
import { Heading } from "../components/Heading.jsx";
import { SubHeading } from "../components/SubHeading.jsx";
import { InputBox } from "../components/InputBox.jsx";
import { BottomWarning } from "../components/BottomWarning.jsx";
import axios from "axios";
import { motion } from "framer-motion";
import logo from "/src/assets/logo.jpg";
import { useNavigate } from "react-router-dom";
import Footer from "./FirstPage/Footer/Footer.jsx";
import NavBar from "./NavBar.jsx";
import Spinner from "../components/Spinner.jsx"; // Import Spinner

export const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (errorMessage) {
      console.log("Error message updated:", errorMessage);
      const timer = setTimeout(() => {
        setErrorMessage(""); // Hide error after 3 seconds
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleSignIn = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post(
        "https://mern-backend-qsew.onrender.com/api/vendors/signin",
        { email, password }
      );

      if (response.data.token && response.data.role) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("userId", response.data.id);

        //console.log("Sign-in response:", response.data);

        if (response.data.role === "User") navigate("/user_dashboard");
        else if (response.data.role === "Admin") navigate("/admin_dashboard");
        else if (response.data.role === "Casher") navigate("/casher_dashboard");
      } else {
        setErrorMessage("Invalid response from the server.");
      }
    } catch (error) {
      console.error("Sign-in error:", error);

      if (error.response && error.response.data) {
        const errorMsg =
          error.response.data.message || error.response.data.error;

        if (errorMsg.includes("User doesn't exist")) {
          setErrorMessage("❌ User not found. Please sign up first.");
        } else if (errorMsg.includes("Incorrect password")) {
          setErrorMessage("⚠️ Incorrect email or password.");
        } else {
          setErrorMessage(errorMsg); // Show any other backend message
        }
      } else {
        setErrorMessage("⚠️ Network error. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex  flex-col min-h-screen dark:bg-gray-900">
      <NavBar />
      <div className="flex-1 pt-24 sm:pt-28 md:pt-32 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 w-full max-w-screen-xl mx-auto">
        <div className="h-screen flex flex-col justify-center items-center">
          <div className="h-screen flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-6">
            {/* Left Side (Logo & Heading) */}
            <div className=" font-serif flex flex-col justify-center items-center text-center md:text-left md:pr-28 w-full md:w-1/2 mt-5 sm:mt-0">
              <Heading
                label="Welcome! To Yekassa Site Management"
                color="text-gray-900 dark:text-white"
                className=" text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold "
              />
              <motion.img
                src={logo}
                alt="Contractor Management System"
                className="mx-auto mt-10 mb-10 h-40 w-3/4 rounded-lg shadow-lg transition-transform duration-100 hover:scale-105 sm:h-48 md:h-56 lg:h-64"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 2 }}
                whileHover={{ scale: 1.2, x: 10, y: -5 }}
              />
            </div>

            {/* Right Side (Sign In Form) */}
            <div className="w-full md:w-1/2 flex justify-center max-lg:z-10">
              <div className="font-serif rounded-lg bg-white w-80 text-center p-4 shadow-lg ">
                <Heading label="Sign In" color="text-blue-500" />
                <SubHeading label="Enter your credentials to sign in" />
                <InputBox
                  label="Email"
                  placeholder="Enter Your Email"
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <InputBox
                  label="Password"
                  placeholder="Enter Your Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="pt-4">
                  <button
                    onClick={handleSignIn}
                    disabled={loading}
                    className="flex justify-center items-center w-full px-4 py-2 bg-blue-500 text-white rounded-md"
                  >
                    Sign In
                  </button>
                </div>

                <BottomWarning
                  label={"Don't have an account?"}
                  buttonText={"Sign Up"}
                  to={"/signup"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* Full-page spinner overlay */}
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <Spinner />
        </div>
      )}

      {/* 🔥 Error Popup Box 🔥 */}
      {errorMessage && (
        <div className="fixed top-20 right-10 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fadeInOut">
          {errorMessage}
        </div>
      )}

      {/* Tailwind animation */}
      <style>
        {`
          @keyframes fadeInOut {
            0% { opacity: 0; transform: translateY(-10px); }
            10% { opacity: 1; transform: translateY(0); }
            90% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-10px); }
          }

          .animate-fadeInOut {
            animation: fadeInOut 3s ease-in-out;
          }
        `}
      </style>
    </div>
  );
};
