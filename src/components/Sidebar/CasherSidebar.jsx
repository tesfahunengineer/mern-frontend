import { useState } from "react";
import { SidebarLink } from "../SidebarLink.jsx";

export const CasherSidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      {/* Toggle Button */}
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
          <SidebarLink label="Dashboard" link="/casher_dashboard" />
          <SidebarLink label="Daily Report" link="/casher_report" />
          <SidebarLink
            label="Material Request"
            link="/casher_create_material_order"
          />
          <SidebarLink label="Payments" link="/payments" />
        </div>
      </div>
    </>
  );
};
