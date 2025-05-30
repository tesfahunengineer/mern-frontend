import { useState } from "react";
import axios from "axios";
import { TopNavBarWithLogout } from "../../components/TopNavBarWithLogout.jsx";
import { BottomNavBar } from "../../components/BottomNavBar.jsx";
import { Sidebar } from "../../components/Sidebar/AdminSidebar.jsx";
import backgroundImage from "../../assets/image5.jpg"; // Adjust the path

const EmployeePage = () => {
  const [formData, setFormData] = useState({
    employeeId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    email: "",
    position: "",
    department: "",
    salary: "",
    hireDate: "",
    phoneNumber: "",
    projectWorking: "",
    siteWorking: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"
  const [loading, setLoading] = useState(false); // loading state
  const [showPopup, setShowPopup] = useState(false); // control popup visibility

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const response = await axios.post(
        "https://mern-backend-qsew.onrender.com/api/employee/",
        formData
      );
      setLoading(false); // Stop loading
      setMessage(response.data.message); // Success message
      setMessageType("success"); // Success type
      setShowPopup(true); // Show popup
      setFormData({
        employeeId: "",
        firstName: "",
        middleName: "",
        lastName: "",
        gender: "",
        dateOfBirth: "",
        email: "",
        position: "",
        department: "",
        salary: "",
        hireDate: "",
        phoneNumber: "",
        projectWorking: "",
        siteWorking: "",
      });
    } catch (error) {
      setLoading(false); // Stop loading
      console.error("Error adding employee:", error);
      setMessage(error.response?.data?.message || "Failed to add employee.");
      setMessageType("error"); // Error type
      setShowPopup(true); // Show popup
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Background Image with Opacity */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      {/* Content Wrapper */}
      <div className=" flex flex-col min-h-screen">
        <TopNavBarWithLogout />
        <Sidebar />

        {/* Main Content */}
        <main className="flex-grow pb-32 z-10">
          <div className="max-w-4xl mx-auto mt-10 mb-5 px-4 sm:px-4 md:px-6 p-8 bg-white shadow-xl rounded-2xl">
            <h2 className="text-3xl font-bold text-center mb-8 text-blue-700">
              Register New Employee
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Employee ID */}
              <div>
                <label className="block font-medium mb-1 text-gray-700">
                  Employee ID:
                </label>
                <input
                  type="text"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                  placeholder="Enter employee ID"
                  className="input-style"
                />
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-medium mb-1 text-gray-700">
                    First Name:
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    className="input-style"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1 text-gray-700">
                    Middle Name:
                  </label>
                  <input
                    type="text"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    placeholder="Enter middle name"
                    className="input-style"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1 text-gray-700">
                    Last Name:
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    className="input-style"
                  />
                </div>
              </div>

              {/* Gender & Date of Birth */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1 text-gray-700">
                    Gender:
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="input-style"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium mb-1 text-gray-700">
                    Date of Birth:
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="input-style"
                  />
                </div>
              </div>

              {/* Email & Phone Number */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1 text-gray-700">
                    Email:
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    className="input-style"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1 text-gray-700">
                    Phone Number:
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="input-style"
                  />
                </div>
              </div>

              {/* Job Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1 text-gray-700">
                    Position:
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    placeholder="Enter job position"
                    className="input-style"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1 text-gray-700">
                    Department:
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="Enter department"
                    className="input-style"
                  />
                </div>
              </div>

              {/* Salary & Hire Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1 text-gray-700">
                    Salary:
                  </label>
                  <input
                    type="number"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    placeholder="Enter salary"
                    className="input-style"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1 text-gray-700">
                    Hire Date:
                  </label>
                  <input
                    type="date"
                    name="hireDate"
                    value={formData.hireDate}
                    onChange={handleChange}
                    className="input-style"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
              >
                Register Employee
              </button>
            </form>

            {/* Loading Spinner (Full Page) */}
            {loading && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                <div className="spinner-border animate-spin border-t-4 border-blue-500 rounded-full w-16 h-16"></div>
              </div>
            )}

            {/* Popup Message */}
            {showPopup && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                <div
                  className={`bg-white p-8 rounded-lg shadow-xl ${
                    messageType === "success"
                      ? "border-green-600"
                      : "border-red-600"
                  } border`}
                >
                  <h3
                    className={`text-center text-lg ${
                      messageType === "success"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {message}
                  </h3>
                  <button
                    onClick={() => setShowPopup(false)}
                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
        <BottomNavBar className="fixed bottom-0 w-full z-50" />
      </div>
    </div>
  );
};

export default EmployeePage;
