import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TopNavBarWithLogout } from "../../components/TopNavBarWithLogout.jsx";
import { BottomNavBar } from "../../components/BottomNavBar.jsx";
import { Sidebar } from "../../components/Sidebar/AdminSidebar.jsx";

const ViewEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("https://mern-backend-qsew.onrender.com/api/employee/list");
        setEmployees(res.data);
      } catch (error) {
        setMessage("Failed to fetch employees.");
      }
    };
    fetchEmployees();
  }, []);

  const handleUpdate = (employeeId) => {
    navigate(`/employee_update/${employeeId}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 overflow-x-hidden">
      <TopNavBarWithLogout />
      <div className="flex flex-1 flex-col lg:flex-row">
        <Sidebar />

        <div className="flex-1 p-4 sm:p-6 md:p-8 bg-white bg-opacity-90">
          <div className="max-w-full mx-auto">
            <h2 className="text-xl sm:text-2xl font-semibold text-center text-gray-800 mb-6">
              Employee List
            </h2>

            {message && (
              <p className="text-center text-red-500 text-base">{message}</p>
            )}

            <div className="w-full max-w-[900px] overflow-x-auto mx-auto">
              <table className="min-w-[1000px] w-full border-collapse border border-gray-300 shadow-md text-sm sm:text-base">
                <thead className="bg-gray-200 text-gray-700">
                  <tr>
                    {[
                      "Employee ID",
                      "First Name",
                      "Middle Name",
                      "Last Name",
                      "Gender",
                      "Date of Birth",
                      "Email",
                      "Phone Number",
                      "Position",
                      "Department",
                      "Salary",
                      "Hire Date",
                      "Project Working",
                      "Site Working",
                      "Actions",
                    ].map((header) => (
                      <th
                        key={header}
                        className="px-2 sm:px-4 py-3 border text-left whitespace-nowrap"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {employees.length > 0 ? (
                    employees.map((employee) => (
                      <tr
                        key={employee.employeeId}
                        className="hover:bg-gray-100"
                      >
                        <td className="px-2 sm:px-4 py-2 border">
                          {employee.employeeId}
                        </td>
                        <td className="px-2 sm:px-4 py-2 border">
                          {employee.firstName}
                        </td>
                        <td className="px-2 sm:px-4 py-2 border">
                          {employee.middleName || "-"}
                        </td>
                        <td className="px-2 sm:px-4 py-2 border">
                          {employee.lastName}
                        </td>
                        <td className="px-2 sm:px-4 py-2 border">
                          {employee.gender}
                        </td>
                        <td className="px-2 sm:px-4 py-2 border">
                          {new Date(employee.dateOfBirth).toLocaleDateString()}
                        </td>
                        <td className="px-2 sm:px-4 py-2 border">
                          {employee.email}
                        </td>
                        <td className="px-2 sm:px-4 py-2 border">
                          {employee.phoneNumber}
                        </td>
                        <td className="px-2 sm:px-4 py-2 border">
                          {employee.position}
                        </td>
                        <td className="px-2 sm:px-4 py-2 border">
                          {employee.department}
                        </td>
                        <td className="px-2 sm:px-4 py-2 border">
                          {employee.salary}
                        </td>
                        <td className="px-2 sm:px-4 py-2 border">
                          {new Date(employee.hireDate).toLocaleDateString()}
                        </td>
                        <td className="px-2 sm:px-4 py-2 border">
                          {employee.projectWorking || "-"}
                        </td>
                        <td className="px-2 sm:px-4 py-2 border">
                          {employee.siteWorking || "-"}
                        </td>
                        <td className="px-2 sm:px-4 py-2 border text-center">
                          <button
                            onClick={() => handleUpdate(employee.employeeId)}
                            className="px-3 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 text-sm"
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="15"
                        className="px-4 py-3 text-center text-gray-500"
                      >
                        No employees found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <BottomNavBar />
    </div>
  );
};

export default ViewEmployee;
