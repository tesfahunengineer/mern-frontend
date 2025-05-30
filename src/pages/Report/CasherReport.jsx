import { useState, useEffect } from "react";
import axios from "axios";
import { TopNavBarWithLogout } from "../../components/TopNavBarWithLogout.jsx";
import { BottomNavBar } from "../../components/BottomNavBar.jsx";
import { CasherSidebar } from "../../components/Sidebar/CasherSidebar.jsx";

function CasherReport() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    employee: "",
    task: "",
    date: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessages, setErrorMessages] = useState(""); // State for error messages
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state
  const [file, setFile] = useState(null); // New state for file

  // Fetch reports for the cashier (logged-in user)
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found after login");
      return;
    }

    const fetchReports = async () => {
      try {
        const res = await axios.get("https://mern-backend-qsew.onrender.com/api/reports/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReports(res.data);
      } catch (err) {
        console.error("Error fetching after login:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  // Handle input changes in the report form
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle report form submission (POST to backend)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.employee || !formData.task || !formData.date) {
      setErrorMessages("All Fields Are Required.");
      return;
    }

    const userId = localStorage.getItem("userId"); // Get the userId from localStorage
    if (!userId) {
      console.error("No user ID found in localStorage.");
      return;
    }

    const dataToSend = new FormData();
    dataToSend.append("employee", formData.employee);
    dataToSend.append("task", formData.task);
    dataToSend.append("date", formData.date);
    dataToSend.append("userId", userId);
    if (file) dataToSend.append("file", file); // Append file if available

    try {
      setIsSubmitting(true); // Set loading state to true

      const response = await axios.post(
        "https://mern-backend-qsew.onrender.com/api/reports",
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setReports((prev) => [response.data, ...prev]); // Add new report
      setFormData({ employee: "", task: "", date: "" });
      setFile(null); // Reset file state
      setSuccessMessage("✅ Successfully Submitted the Report!");

      // Clear message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error submitting report:", error);
      // Check if the error is from the backend and update errorMessages state
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessages(error.response.data.error);
      } else {
        setErrorMessages("An unexpected error occurred.");
      }
    } finally {
      setIsSubmitting(false); // Reset loading state
    }
  };
  useEffect(() => {
    if (errorMessages) {
      const timer = setTimeout(() => {
        setErrorMessages(""); // Clear the error message after 3 seconds
      }, 3000);
      return () => clearTimeout(timer); // Cleanup the timeout if the component is unmounted or if errorMessages changes
    }
  }, [errorMessages]); // Runs when errorMessages state changes
  return (
    <div className="flex flex-col min-h-screen">
      <TopNavBarWithLogout />
      <CasherSidebar />
      <div className="bg-gray-50 min-h-screen p-6">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🏗️ Employee Reports
          </h1>
          <p className="text-gray-600 text-lg">Daily report submission</p>
        </header>

        {/* Full-page Loading Spinner */}
        {isSubmitting && (
          <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
            <div className="spinner-border animate-spin border-4 border-t-4 border-blue-600 w-16 h-16 rounded-full"></div>
          </div>
        )}

        {/* Report Submission Form */}
        <section className="bg-white p-6 rounded-xl shadow-lg mb-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">
            Submit Report
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Employee Name
              </label>
              <input
                name="employee"
                value={formData.employee}
                onChange={handleChange}
                type="text"
                placeholder="e.g., John Doe"
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Task Completed
              </label>
              <textarea
                name="task"
                value={formData.task}
                onChange={handleChange}
                rows="3"
                placeholder="e.g., Installed windows on Level 3"
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                name="date"
                value={formData.date}
                onChange={handleChange}
                type="date"
                className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload File (PDF or Image)
              </label>
              <input
                name="file"
                type="file"
                accept=".pdf,image/*"
                onChange={handleFileChange}
                className="mt-1 p-2 border border-gray-300 rounded-md"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting} // Disable button while submitting
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition transform hover:scale-105 flex items-center justify-center"
            >
              {isSubmitting ? (
                <span className="spinner-border animate-spin border-4 border-t-4 border-blue-600 w-5 h-5 rounded-full mr-2"></span> // Add spinner
              ) : (
                "Submit Report"
              )}
            </button>
          </form>
          {/* Error message display */}
          {errorMessages && (
            <p className="text-red-600 mt-4 text-sm font-medium text-center">
              {errorMessages}
            </p>
          )}
          {successMessage && (
            <p className="text-green-600 mt-4 text-sm font-medium text-center">
              {successMessage}
            </p>
          )}
        </section>

        {/* Reports Table */}
        <section className="bg-white p-6 rounded-xl shadow-lg max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">
            Report History
          </h2>
          {loading ? (
            <p className="text-gray-600">Loading reports...</p>
          ) : reports.length === 0 ? (
            <p className="text-gray-600">No reports available.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border border-gray-200 text-sm sm:text-base">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border-b">Employee</th>
                    <th className="px-4 py-2 border-b">Date</th>
                    <th className="px-4 py-2 border-b">Task Completed</th>
                    <th className="px-4 py-2 border-b">Attachment</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-2 border-b">{report.employee}</td>
                      <td className="px-4 py-2 border-b">{report.date}</td>
                      <td className="px-4 py-2 border-b">{report.task}</td>
                      <td className="px-4 py-2 border-b">
                        {report.file && (
                          <a
                            href={`https://mern-backend-qsew.onrender.com/${report.file}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
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
          )}
        </section>
      </div>
      <BottomNavBar />
    </div>
  );
}

export default CasherReport;
