import { UserSidebar } from "../../components/Sidebar/UserSidebar.jsx";
import { Heading } from "../../components/Heading.jsx";
import { Card1, Card2 } from "../../components/Card.jsx";
import { BottomNavBar } from "../../components/BottomNavBar.jsx";
import { TopNavBarWithLogout } from "../../components/TopNavBarWithLogout.jsx";
import { useEffect, useState } from "react";

export const UserDashboard = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setName(storedName);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <TopNavBarWithLogout />

      <div className="flex flex-1 flex-col lg:flex-row">
        <UserSidebar />

        <div className="flex-1 p-6 lg:p-10">
          <div className="text-center mb-6">
            <Heading
              label={`Welcome${name ? `, ${name}` : ""}!`}
              color="text-blue-600"
            />
          </div>

          {/* Main Content */}
          <div className="flex flex-col gap-6 lg:flex-row justify-between">
            <Card1
              label="Create New Material Request"
              to="/user_create_material_order"
              className="flex-1"
            />
            <Card1 label="Daily Reports" to="/user_report" className="flex-1" />
            <Card1
              label="View All Material Request"
              to="/view_all_material_order"
              className="flex-1"
            />
            <Card1
              label="View Specific Material Request"
              to="/user_view_specific_material"
              className="flex-1"
            />
          </div>

        
          
        </div>
      </div>

      <BottomNavBar />
    </div>
  );
};
