import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";

export const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isEmployeeOpen, setIsEmployeeOpen] = useState(false);

  return (
    <>
      {/* Toggle Button (Hamburger / Close Icon) */}
      <div className="fixed top-4 left-4 z-50">
        {showSidebar ? (
          <button className="text-white" onClick={() => setShowSidebar(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 transition-transform hover:scale-110 hover:text-blue-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        ) : (
          <button onClick={() => setShowSidebar(true)}>
            <svg
              fill="#2563EB"
              viewBox="0 0 100 80"
              width="35"
              height="35"
              className="transition-transform hover:scale-110"
            >
              <rect width="100" height="10"></rect>
              <rect y="30" width="100" height="10"></rect>
              <rect y="60" width="100" height="10"></rect>
            </svg>
          </button>
        )}
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-blue-950 text-white z-40 p-6 transition-transform duration-300
        ${showSidebar ? "translate-x-0" : "-translate-x-full"}
        w-3/4 sm:w-1/2 md:w-64 lg:w-72`}
      >
        <div className="mt-16 text-base space-y-4">
          <Link
            to="/admin_dashboard"
            className="block p-2 hover:bg-blue-800 rounded-lg"
          >
            Dashboard
          </Link>

          {/* Employee Dropdown */}
          <div>
            <button
              onClick={() => setIsEmployeeOpen(!isEmployeeOpen)}
              className="flex justify-between items-center w-full p-2 hover:bg-blue-800 rounded-lg"
            >
              <span>Employee</span>
              {isEmployeeOpen ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>

            {isEmployeeOpen && (
              <div className="ml-4 mt-2 space-y-2">
                <Link
                  to="/employee"
                  className="block p-2 hover:bg-blue-800 rounded-lg"
                >
                  Create Employee
                </Link>
                <Link
                  to="/employee_list"
                  className="block p-2 hover:bg-blue-800 rounded-lg"
                >
                  View Employees
                </Link>
                <Link
                  to="/specific_employee"
                  className="block p-2 hover:bg-blue-800 rounded-lg"
                >
                  Specific Employee
                </Link>
              </div>
            )}
          </div>

          {/* Other Sidebar Links */}
          <Link
            to="/material_requested"
            className="block p-2 hover:bg-blue-800 rounded-lg"
          >
            Requested Material
          </Link>
          <Link
            to="/project_schedule"
            className="block p-2 hover:bg-blue-800 rounded-lg"
          >
            Project Schedule
          </Link>
          <Link
            to="/task_schedule"
            className="block p-2 hover:bg-blue-800 rounded-lg"
          >
            Task Schedule
          </Link>
        </div>
      </div>
    </>
  );
};
