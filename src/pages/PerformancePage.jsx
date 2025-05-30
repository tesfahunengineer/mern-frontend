import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import axios from "axios";
import { TopNavBarWithLogout } from "../components/TopNavBarWithLogout.jsx";
import { BottomNavBar } from "../components/BottomNavBar.jsx";
import { Sidebar } from "../components/Sidebar/AdminSidebar.jsx";

const COLORS = ["#4f46e5", "#10b981", "#f59e0b"];

const PerformancePage = () => {
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [topSuppliersData, setTopSuppliersData] = useState([]);
  const [projects, setProjects] = useState([]);
  const [sites, setSites] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedSite, setSelectedSite] = useState("");

  // Fetch filter options once
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const res = await axios.get(
          "https://mern-backend-qsew.onrender.com/api/userpayment/filters"
        );
        setProjects(res.data.projects || []);
        setSites(res.data.sites || []);
      } catch (error) {
        console.error("Failed to fetch filter options", error);
      }
    };

    fetchFilterOptions();
  }, []);

  // Fetch performance data when filters change
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const params = {};
        if (selectedProject) params.project = selectedProject;
        if (selectedSite) params.site = selectedSite;

        const [barRes, pieRes, supplierRes] = await Promise.all([
          axios.get("https://mern-backend-qsew.onrender.com/api/userpayment/performance", {
            params,
          }),
          axios.get(
            "https://mern-backend-qsew.onrender.com/api/userpayment/performance/payment-types",
            { params }
          ),
          axios.get(
            "https://mern-backend-qsew.onrender.com/api/userpayment/performance/top-suppliers",
            { params }
          ),
        ]);

        setBarData(barRes.data);
        setPieData(pieRes.data);
        setTopSuppliersData(supplierRes.data);
      } catch (error) {
        console.error("Failed to load performance data", error);
      }
    };

    fetchAllData();
  }, [selectedProject, selectedSite]);

  return (
    <>
      <TopNavBarWithLogout />
      <Sidebar />
      <div className="p-8 bg-gray-300">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Performance Analysis
        </h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <select
            className="border border-gray-300 p-2 rounded"
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
          >
            <option value="">All Projects</option>
            {projects.map((project) => (
              <option key={project} value={project}>
                {project}
              </option>
            ))}
          </select>

          <select
            className="border border-gray-300 p-2 rounded"
            value={selectedSite}
            onChange={(e) => setSelectedSite(e.target.value)}
          >
            <option value="">All Sites</option>
            {sites.map((site) => (
              <option key={site} value={site}>
                {site}
              </option>
            ))}
          </select>
        </div>

        {/* Row 1: Bar and Pie Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Bar Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Monthly Paid Amount
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={barData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="totalPaid"
                  fill="#4f46e5"
                  label={{ position: "top" }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Payment Type Breakdown
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="type"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Row 2: Top Suppliers */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 text-center">
            Top Suppliers
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={topSuppliersData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="supplier" type="category" />
              <Tooltip />
              <Bar dataKey="totalPaid" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <BottomNavBar />
    </>
  );
};

export default PerformancePage;
