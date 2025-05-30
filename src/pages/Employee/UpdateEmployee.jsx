import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { TopNavBarWithLogout } from "../../components/TopNavBarWithLogout.jsx";
import { BottomNavBar } from "../../components/BottomNavBar.jsx";
import { Sidebar } from "../../components/Sidebar/AdminSidebar.jsx";
import bg from "../../assets/image5.jpg";

const UpdateEmployee = () => {
  const { id } = useParams(); // Get the employee ID from the URL
  const [employee, setEmployee] = useState(null); // Store employee data
  // const [message, setMessage] = useState(""); // Store success/error messages
  const [loading, setLoading] = useState(true); // Loading state
  const [modal, setModal] = useState({ show: false, message: "", type: "" });
  // const [messageType, setMessageType] = useState(""); // Store message type (success/error)
  const navigate = useNavigate(); // For navigation

  // Fetch the employee data when the component mounts
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(`https://mern-backend-qsew.onrender.com/api/employee/${id}`);
        setEmployee(res.data);
        setLoading(false);
      } catch (error) {
        setModal({
          show: true,
          message: "Failed to fetch employee data.",
          type: "error",
        });
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle the form submission to update employee
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show spinner when submitting
    try {
      await axios.put(`https://mern-backend-qsew.onrender.com/api/employee/${id}`, employee);
      setModal({
        show: true,
        message: "Employee updated successfully.",
        type: "success",
      });
      setLoading(false); // Hide spinner before redirect
      setTimeout(() => navigate("/employee_list"), 2000); // Redirect after 2 seconds
    } catch (error) {
      setModal({
        show: true,
        message: "Failed to update employee.",
        type: "error",
      });
      setLoading(false); // Hide spinner on error
    }
  };

  // Handle the delete employee action
  const handleDelete = async () => {
    try {
      await axios.delete(`https://mern-backend-qsew.onrender.com/api/employee/${id}`);
      setModal({
        show: true,
        message: "Employee deleted successfully.",
        type: "error",
      });
      setTimeout(() => navigate("/employee_list"), 2000); // Redirect after 2 seconds
    } catch (error) {
      setModal({
        show: true,
        message: "Failed to delete employee.",
        type: "error",
      });
    }
  };

  if (loading) {
    return (
      <div
        className="flex justify-center items-center min-h-screen bg-gray-100"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <p className="mt-4 text-lg text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col min-h-screen opacity-90"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <TopNavBarWithLogout />
      <Sidebar />
      {modal.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className={`p-6 rounded-lg text-white text-center ${
              modal.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            <p className="text-lg">{modal.message}</p>
            <button
              onClick={() => setModal({ show: false, message: "", type: "" })}
              className="mt-4 px-4 py-2 bg-white text-black rounded-md"
            >
              OK
            </button>
          </div>
        </div>
      )}
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Update Employee
        </h2>

        {/* Display Success or Error Message */}
        {/* {message && (
          <p
            className={`mt-4 text-center text-lg ${
              messageType === "success" ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )} */}

        {/* Update Employee Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Employee ID</label>
            <input
              type="text"
              name="employeeId"
              value={employee.employeeId}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={employee.firstName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Middle Name</label>
            <input
              type="text"
              name="middleName"
              value={employee.middleName || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={employee.lastName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Gender</label>
            <select
              name="gender"
              value={employee.gender}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={employee.dateOfBirth.substring(0, 10)} // Format date for input
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={employee.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={employee.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Position</label>
            <input
              type="text"
              name="position"
              value={employee.position}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Department</label>
            <input
              type="text"
              name="department"
              value={employee.department}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Salary</label>
            <input
              type="number"
              name="salary"
              value={employee.salary}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Project Working</label>
            <input
              type="text"
              name="projectWorking"
              value={employee.projectWorking || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Site Working</label>
            <input
              type="text"
              name="siteWorking"
              value={employee.siteWorking || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex justify-center space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Update Employee
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Delete Employee
            </button>
          </div>
        </form>
      </div>
      <BottomNavBar />
    </div>
  );
};

export default UpdateEmployee;
