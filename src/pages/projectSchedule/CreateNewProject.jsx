import { useState } from "react";
import axios from "axios";
import { TopNavBarWithLogout } from "../../components/TopNavBarWithLogout.jsx";
import { BottomNavBar } from "../../components/BottomNavBar.jsx";
import { Sidebar } from "../../components/Sidebar/AdminSidebar.jsx";

const CreateProject = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("ongoing");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProject = {
      name,
      description,
      start_date: startDate,
      end_date: endDate,
      status,
    };

    try {
      const response = await axios.post(
        "https://mern-backend-qsew.onrender.com/api/projects",
        newProject
      );

      setMessage(`Project "${response.data.name}" created successfully!`);
      setName("");
      setDescription("");
      setStartDate("");
      setEndDate("");
      setStatus("ongoing");
    } catch (err) {
      setMessage("Error creating project");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TopNavBarWithLogout />
      <div className="flex flex-1 flex-col lg:flex-row">
        <Sidebar />
        <div className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 max-w-xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">
            Create New Project
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Name:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Description:
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <div className="flex-1">
                <label className="block mb-1 font-medium text-gray-700">
                  Start Date:
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex-1">
                <label className="block mb-1 font-medium text-gray-700">
                  End Date:
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Status:
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200 transform hover:scale-105"
              >
                Create Project
              </button>
            </div>
          </form>

          {message && (
            <p
              className={`mt-4 text-center font-medium ${
                message.includes("successfully")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
      <BottomNavBar />
    </div>
  );
};

export default CreateProject;
