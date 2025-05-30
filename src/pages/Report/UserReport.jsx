import { useState, useEffect } from "react";
import axios from "axios"; // Axios makes API calls easier
import { TopNavBarWithLogout } from "../../components/TopNavBarWithLogout.jsx";
import { BottomNavBar } from "../../components/BottomNavBar.jsx";
import { UserSidebar } from "../../components/Sidebar/UserSidebar.jsx";

function UserReport() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    employee: "",
    task: "",
    date: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state
  const [file, setFile] = useState(null); // 🆕 new file state

  // Fetch reports on mount
  useEffect(() => {
    // const userId = localStorage.getItem("userId");

    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No auth token found.");
          return;
        }

        const response = await axios.get(
          "https://mern-backend-qsew.onrender.com/api/reports/user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setReports(response.data);
      } catch (error) {
        console.error("Error fetching user reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  // Handle input changes
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle form submission (POST to backend)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.employee || !formData.task || !formData.date) return;

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("token");

      const form = new FormData();
      form.append("employee", formData.employee);
      form.append("task", formData.task);
      form.append("date", formData.date);
      if (file) form.append("file", file);

      const response = await axios.post(
        "https://mern-backend-qsew.onrender.com/api/reports",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setReports((prev) => [response.data, ...prev]);
      setFormData({ employee: "", task: "", date: "" });
      setFile(null); // reset file
      setSuccessMessage("✅ Successfully Submitted the Report!");

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error(
        "Error submitting report:",
        error.response?.data || error.message
      );
      setSuccessMessage("❌ Failed to submit the report. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopNavBarWithLogout />
      <UserSidebar />
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
                onChange={(e) => setFile(e.target.files[0])}
                className="mt-1 p-2 border border-gray-300 rounded-md"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition transform hover:scale-105"
            >
              Submit Report
            </button>
          </form>
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
                    <th className="px-4 py-2 border-b">Attachment</th>{" "}
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
                            href={`http://localhost:3000/${report.file}`}
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

export default UserReport;
