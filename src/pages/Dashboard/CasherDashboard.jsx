import { CasherSidebar } from "../../components/Sidebar/CasherSidebar.jsx";
import { Heading } from "../../components/Heading.jsx";
import { Card1, Card2 } from "../../components/Card.jsx";
import { BottomNavBar } from "../../components/BottomNavBar.jsx";
import { TopNavBarWithLogout } from "../../components/TopNavBarWithLogout.jsx";
import { useEffect, useState } from "react";

export const CasherDashboard = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setName(storedName);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Top Navigation Bar */}
      <TopNavBarWithLogout />

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col lg:flex-row w-full">
        {/* Sidebar */}
        <CasherSidebar />

        {/* Main Content */}
        <div className="flex-1 px-4 sm:px-6 md:px-8 py-6">
          {/* Header */}
          <div className="relative text-center">
            <Heading
              label={`Welcome${name ? `, ${name}` : ""}!`}
              color="text-blue-600"
            />

            {/* Notification Icon */}
            <div className="absolute top-0 right-0">
              {/* Your notification icon or links */}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <Card1
              label="Create New Material Request"
              to="/casher_create_material_order"
            />
            <Card1 label="Daily Reports" to="/casher_report" />
            <Card1
              label="View All Material Request"
              to="/casher_view_all_material_order"
            />
            <Card1
              label="View Specific Material Request"
              to="/casher_view_specific_material"
            />
          </div>

          {/* Large Card */}
          <div className="mt-8">
            <Card2 label="Click To See Contractor Payment" to="/userpaid" />
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <BottomNavBar />
    </div>
  );
};
