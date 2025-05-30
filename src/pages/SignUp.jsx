import { Heading } from "../components/Heading.jsx";
import { SubHeading } from "../components/SubHeading.jsx";
import { InputBox } from "../components/InputBox.jsx";
import { useState } from "react";
import { motion } from "framer-motion";
import signupimage from "/src/assets/signupimage.webp";
import { BottomWarning } from "../components/BottomWarning.jsx";
import { Button } from "../components/Button.jsx";
import axios from "axios";
import Footer from "./FirstPage/Footer/Footer.jsx";
import NavBar from "./NavBar.jsx";
import Spinner from "../components/Spinner.jsx"; // Import Spinner

export const SignUpPage = () => {
  const [name, setName] = useState("");
  const [contactDetails, setContactDetails] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // Message to show popup
  const [role, setRole] = useState("User"); // Default to User
  const [loading, setLoading] = useState(false); // Loading state
  const [isSuccess, setIsSuccess] = useState(false); // Track success or failure

  const handleSignUp = async () => {
    setLoading(true);
    setMessage("");
    setIsSuccess(false);

    try {
      const response = await axios.post(
        "https://mern-backend-qsew.onrender.com/api/vendors/",
        { name, contactDetails, address, email, password, role },
        { headers: { "Content-Type": "application/json" } }
      );

      if (
        response.status === 201 &&
        response.data.message === "User created successfully"
      ) {
        setMessage(response.data.message);
        setIsSuccess(true); // Set success state

        // Clear the form
        setName("");
        setContactDetails("");
        setAddress("");
        setEmail("");
        setPassword("");
      } else {
        setMessage(response.data.message);
        setIsSuccess(false);
      }
    } catch (e) {
      // 🛠 Handle different error formats (e.g., Admin already exists)
      const errorMessage =
        e.response?.data?.message ||
        e.response?.data?.error || // <-- This handles "Admin already exists"
        "An error occurred";

      setMessage(errorMessage);
      setIsSuccess(false);
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 5000); // Clear message after 5 sec
    }
  };

  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-900">
      <NavBar />

      <div className="flex-1 flex flex-col justify-center items-center px-4 py-6 pt-12">
        <div className=" flex flex-col justify-center items-center mt-10">
          <div className="flex flex-col md:flex-row justify-center items-center w-full px-4 sm:px-8 md:px-12 lg:px-20 gap-8">
            <div className="flex flex-col justify-center  md:items-start text-center md:text-left ">
              <Heading
                label="Welcome! Sign up to continue."
                color="text-gray-900 dark:text-white"
              />
              <motion.img
                src={signupimage}
                alt="Contractor Management System"
                className="mt-20 mx-auto mb-10 sm:w-1/2"
                initial={{ opacity: 0, x: -150 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 2 }}
                whileHover={{ scale: 1.2, x: 10, y: -5 }}
                viewport={{ once: true }}
                style={{ height: "200px", width: "auto" }}
              />
            </div>
            <div className="pl-0 md:pl-28 w-full flex justify-center">
              <div className="rounded-lg bg-white w-full sm:w-[18rem] md:w-[20rem] lg:w-[24rem] xl:w-[24rem] text-center p-4 h-max">
                <Heading label="Sign Up" color="font-serif text-blue-500" />
                <SubHeading label="Enter your details to sign up" />
                <label className=" text-sm font-medium text-left py-2 text-blue-500">
                  Role
                </label>
                <select
                  className="w-full border rounded px-2 py-1 mt-1"
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                  <option value="Casher">Casher</option>
                </select>
                <InputBox
                  label="Name"
                  type="text"
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <InputBox
                  label="Phone Number"
                  type="email"
                  placeholder="Enter Your Phone Number"
                  value={contactDetails}
                  onChange={(e) => setContactDetails(e.target.value)}
                />
                <InputBox
                  label="Address"
                  type="address"
                  placeholder=" Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <InputBox
                  label="Email"
                  type="email"
                  placeholder="Please Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <InputBox
                  label="Password"
                  type="password"
                  placeholder="Enter New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="pt-4">
                  <Button label="Sign Up" onClick={handleSignUp} />
                </div>
                <BottomWarning
                  label={"Already have an account?"}
                  buttonText={"Sign In"}
                  to={"/signin"}
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

      {/* Popup success or error message */}
      {message && (
        <div
          className={`fixed top-1/4 left-1/2 transform -translate-x-1/2 p-6
                rounded-lg shadow-lg z-50 opacity-90 transition-all duration-300 ease-in-out
                ${
                  isSuccess
                    ? "bg-green-200 text-green-700"
                    : "bg-red-200 text-red-500"
                }`}
        >
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};
