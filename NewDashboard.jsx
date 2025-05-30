import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import PropTypes from "prop-types";
import {
  ClipboardList,
  FileText,
  Bell,
  Activity,
  UserCircle,
  ChevronDown,
  // Search,
  Plus,
  Menu,
  X,
} from "lucide-react";
// import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

// Reusable status badge
const StatusBadge = ({ label, status }) => {
  const colorMap = {
    Approved:
      "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    Rejected: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
    Pending:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
        {label}
      </span>
      <span
        className={`px-3 py-1 text-xs font-semibold rounded-full ${colorMap[status]}`}
      >
        {status}
      </span>
    </div>
  );
};

StatusBadge.propTypes = {
  label: PropTypes.string.isRequired,
  status: PropTypes.oneOf(["Approved", "Rejected", "Pending"]).isRequired,
};

// Card component
const Card = ({ icon: Icon, title, count, description, statuses }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-all flex flex-col justify-between border border-gray-100 dark:border-gray-700">
    <div className="flex items-start gap-4 mb-4">
      <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900">
        <Icon className="text-blue-600 dark:text-blue-300 w-5 h-5" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          {title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {description}
        </p>
      </div>
    </div>

    <div className="flex justify-between items-end mt-auto">
      <span className="text-blue-600 dark:text-blue-300 text-2xl font-bold">
        {count}
      </span>
      {!statuses && (
        <button className="text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors">
          View all
        </button>
      )}
    </div>

    {statuses && (
      <div className="mt-4 grid grid-cols-1 gap-2">
        {statuses.map((statusItem, index) => (
          <StatusBadge
            key={index}
            label={statusItem.label}
            status={statusItem.status}
          />
        ))}
        <button className="text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors mt-2 text-left">
          +2 more requests
        </button>
      </div>
    )}
  </div>
);

Card.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  description: PropTypes.string.isRequired,
  statuses: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      status: PropTypes.oneOf(["Approved", "Rejected", "Pending"]).isRequired,
    })
  ),
};

// Dashboard layout
const Dashboard = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // Ensure the correct theme is applied on mount
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and mobile menu button */}
            <div className="flex items-center">
              <button
                className="md:hidden p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
              <div className="ml-4 md:ml-0">
                <h1 className="font-serif text-xl font-bold text-gray-900 dark:text-white">
                  Dashboard
                </h1>
              </div>
            </div>

            {/* Search bar - hidden on mobile */}
            <div className="flex-1 max-w-md mx-4">
              <div className="relative">
                {/* //Search Icon
                <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <Search className="h-5 w-5" />
                </div> */}
                {/* Input */}
                <input
                  type="text"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Search..."
                />
              </div>
            </div>

            {/* Profile and theme toggle */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <span className="text-yellow-400 text-lg">☀️</span>
                ) : (
                  <span className="text-indigo-500 text-lg">🌙</span>
                )}
              </button>

              <label className="relative cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center border-2 border-blue-500">
                    <UserCircle className="w-6 h-6 text-gray-500 dark:text-gray-300" />
                  </div>
                )}
              </label>
            </div>
          </div>
        </div>
      </header>
      {/* Sidebar for mobile */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 flex md:hidden"
          onClick={() => setMobileMenuOpen(false)} // this catches clicks outside the sidebar
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-30" />

          {/* Sidebar */}
          <div
            className="relative z-50 w-80 bg-white dark:bg-gray-800 shadow-xl"
            onClick={(e) => e.stopPropagation()} // prevents closing when clicking inside sidebar
          >
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                Menu
              </h2>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
            <nav className="flex flex-col gap-4 p-4">
              <Link
                to="/dashboard"
                className="text-left text-gray-700 dark:text-gray-200  hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/projects"
                className="text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Projects
              </Link>
              <Link
                to="/reports"
                className="text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Reports
              </Link>
              <Link
                to="/settings"
                className="text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Settings
              </Link>
            </nav>
          </div>
        </div>
      )}
      {/* Main content */}
      <main
        className={`transition-all duration-300 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${
          mobileMenuOpen ? "ml-80" : ""
        }`}
      >
        {" "}
        {/* Page title and actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 w-full">
          {/* Left: Text Section with more space */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Wellcome
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Welcome back! Here&apos;s what&apos;s happening with your
              projects.
            </p>
          </div>

          {/* Right: Button Section with shrinked width */}
          <div className="mt-4 md:mt-0 md:ml-4 flex-shrink-0">
            <button className="flex items-center gap-1 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Plus className="w-4 h-4" />
              New Request
            </button>
          </div>
        </div>
        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card
            icon={ClipboardList}
            title="Assigned Tasks"
            count="12"
            description="Pending and completed tasks"
          />
          <Card
            icon={Bell}
            title="Notifications"
            count="3"
            description="New system messages"
          />
          <Card
            icon={FileText}
            title="Material Requests"
            count="5"
            description="Status of your requests"
            statuses={[
              { label: "Cement", status: "Approved" },
              { label: "Sand", status: "Rejected" },
              { label: "Gravel", status: "Pending" },
            ]}
          />
          <Card
            icon={Activity}
            title="Recent Activity"
            count="7"
            description="This week's actions"
          />
        </div>
        {/* Additional sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Projects */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Recent Projects
              </h3>
              <button className="text-sm text-blue-600 dark:text-blue-300 hover:underline">
                View all
              </button>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                      <ClipboardList className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-800 dark:text-white">
                        Project {item}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Updated 2 days ago
                      </p>
                    </div>
                  </div>
                  <button className="text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors">
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between px-4 py-3  dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <span className="text-sm font-medium text-gray-800 dark:text-white ">
                  Create New Task
                </span>
                <ClipboardList className="w-4 h-4 text-gray-500 dark:text-gray-900" />
              </button>
              <button className="w-full flex items-center justify-between px-4 py-3  dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <span className="text-sm font-medium text-gray-800 dark:text-white">
                  Submit Report
                </span>
                <FileText className="w-4 h-4 text-gray-500 dark:text-text-gray-900" />
              </button>
              <button className="w-full flex items-center justify-between px-4 py-3  dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <span className="text-sm font-medium text-gray-800 dark:text-white ">
                  Check Messages
                </span>
                <Bell className="w-4 h-4 text-gray-500 dark:text-text-gray-900" />
              </button>
              <button className="w-full flex items-center justify-between px-4 py-3 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <span className="text-sm font-medium text-gray-800 dark:text-white">
                  Request Material
                </span>
                <Bell className="w-4 h-4 text-gray-500 dark:text-text-gray-900" />
              </button>
              <button className="w-full flex items-center justify-between px-4 py-3 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <span className="text-sm font-medium text-gray-800 dark:text-white">
                  View Activity Logs
                </span>
                <Activity className="w-4 h-4 text-gray-500 dark:text-text-gray-900" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
