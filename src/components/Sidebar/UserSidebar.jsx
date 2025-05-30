import { useState } from "react";
import { SidebarLink } from "../SidebarLink.jsx";
import { ChevronDown, ChevronUp } from "lucide-react";

export const UserSidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMaterialRequestOpen, setIsMaterialRequestOpen] = useState(false);

  return (
    <>
      {/* Sidebar Toggle Button */}
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
          {/* Dashboard Link */}
          <SidebarLink label="Dashboard" link="/user_dashboard" />

          {/* Material Request Dropdown */}
          <div>
            <button
              onClick={() => setIsMaterialRequestOpen(!isMaterialRequestOpen)}
              className="flex justify-between items-center w-full p-2 hover:bg-blue-800 rounded-lg"
            >
              <span>Material Request</span>
              {isMaterialRequestOpen ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>

            {isMaterialRequestOpen && (
              <div className="ml-4 mt-2 space-y-2">
                <SidebarLink
                  label="Create Material Request"
                  link="/user_create_material_order"
                />
                <SidebarLink
                  label="View Material Request"
                  link="/view_all_material_order"
                />
              </div>
            )}
          </div>

          {/* Other Sidebar Links */}
          <SidebarLink label="Daily Report" link="/user_report" />
          <SidebarLink label="Payment Request" link="/user_payment" />
        </div>
      </div>
    </>
  );
};
