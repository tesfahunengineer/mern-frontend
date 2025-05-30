import { useState, useEffect } from "react";
import axios from "axios";
import { TopNavBarWithLogout } from "../../components/TopNavBarWithLogout.jsx";
import { BottomNavBar } from "../../components/BottomNavBar.jsx";
import { Sidebar } from "../../components/Sidebar/AdminSidebar.jsx";

const EmployeePerformance = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://mern-backend-qsew.onrender.com/api/reports/allreport"
        );
        setReports(response.data);
      } catch (err) {
        setError("Failed to fetch reports");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TopNavBarWithLogout />
      <div className="flex flex-1 flex-col lg:flex-row">
        <Sidebar />
        <div className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 w-full">
          <h1 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-6">
            Employee Reports
          </h1>

          {loading && (
            <div className="flex justify-center items-center space-x-2 text-blue-500">
              <svg
                className="animate-spin h-6 w-6 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z"
                ></path>
              </svg>
              <span>Loading...</span>
            </div>
          )}

          {error && <p className="text-red-500 text-center">{error}</p>}

          {reports.length > 0 ? (
            <div className="overflow-x-auto mt-6">
              <table className="w-full min-w-[600px] table-auto border-collapse">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">Employee</th>
                    <th className="px-4 py-3 text-left">Task</th>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">File</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report) => (
                    <tr key={report._id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-4">{report.employee}</td>
                      <td className="px-4 py-4">{report.task}</td>
                      <td className="px-4 py-4">
                        {new Date(report.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4">
                        {report.file && (
                          <a
                            href={`http://localhost:3000/${report.file}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline break-all"
                          >
                            {report.file.split("\\").pop().replace(/^\d+_/, "")}
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            !loading && (
              <p className="text-center text-gray-600 mt-6">No reports found</p>
            )
          )}
        </div>
      </div>
      <BottomNavBar />
    </div>
  );
};

export default EmployeePerformance;
