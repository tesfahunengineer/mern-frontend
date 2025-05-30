import { Sidebar } from "../../components/Sidebar/AdminSidebar.jsx";
import { Heading } from "../../components/Heading.jsx";
import { Card1, Card2 } from "../../components/Card.jsx";
import { BottomNavBar } from "../../components/BottomNavBar.jsx";
import { TopNavBarWithLogout } from "../../components/TopNavBarWithLogout.jsx";
import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

export const AdminDashboard = () => {
  const [name, setName] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setName(storedName);
    }
    // Fetch unread messages count
    const fetchUnreadCount = async () => {
      try {
        const res = await axios.get(
          "https://mern-backend-qsew.onrender.com/api/contact/unread-count"
        );
        setUnreadCount(res.data.unreadCount);
      } catch (err) {
        console.error("Failed to fetch unread count:", err.message);
      }
    };

    fetchUnreadCount();
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <TopNavBarWithLogout />

      <div className="flex-1 flex flex-col md:flex-row w-full">
        <Sidebar />

        <div className="flex-1 px-4 sm:px-6 md:px-8 py-6">
          {/* Header */}
          <div className="relative text-center">
            <Heading
              label={`Welcome${name ? `, ${name}` : ""}!`}
              color="text-blue-600"
            />

            {/* Notification Icon */}
            <div className="absolute top-0 right-0">
              <Link to="/messagelist">
                <div className="relative">
                  <Bell className="w-6 h-6 text-blue-600 hover:text-blue-800 cursor-pointer" />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 bg-red-500 text-white text-xs rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </div>
              </Link>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <Card1
              label="View Requested Payment"
              to="/admin_view_payment_request"
            />
            <Card1 label="View Requested Material" to="/material_requested" />
            <Card1 label="Project Schedule" to="/project_schedule" />
            <Card1 label="Employee Reports" to="/employee_performance" />
          </div>

          {/* Large Card */}
          <div className="mt-8">
            <Card2 label="Company Monthly Performance" to="/performance" />
          </div>
        </div>
      </div>

      <BottomNavBar />
    </div>
  );
};
