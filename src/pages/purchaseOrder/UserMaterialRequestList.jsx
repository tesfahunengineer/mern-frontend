import { useEffect, useState } from "react";
import axios from "axios";
import { TopNavBarWithLogout } from "../../components/TopNavBarWithLogout.jsx";
import { BottomNavBar } from "../../components/BottomNavBar.jsx";
import { UserSidebar } from "../../components/Sidebar/UserSidebar.jsx";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import Spinner from "../../components/Spinner.jsx"; // Import the Spinner component

const UserPurchaseOrderList = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Create an instance of useNavigate

  useEffect(() => {
    const fetchPurchaseOrders = async () => {
      try {
        const response = await axios.get(
          "https://mern-backend-qsew.onrender.com/api/material_order/allList",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (Array.isArray(response.data)) {
          setPurchaseOrders(response.data);
        } else {
          throw new Error("Data is not an array");
        }
      } catch (error) {
        console.error("Error fetching mateial request:", error);
        setError("Failed to fetch material request");
      } finally {
        setLoading(false);
      }
    };

    fetchPurchaseOrders();
  }, []);

  const handleUpdate = (orderId) => {
    // Navigate to the update page with the order ID
    navigate(`/update_material/${orderId}`);
  };

  const handleDelete = async (orderId) => {
    // Ask for confirmation before deletion
    const confirmation = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (confirmation) {
      try {
        await axios.delete(
          `https://mern-backend-qsew.onrender.com/api/material_order/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        // Filter out the deleted order from the state
        setPurchaseOrders(
          purchaseOrders.filter((order) => order._id !== orderId)
        );
      } catch (error) {
        console.error("Error deleting request:", error);
        setError("Failed to delete the material request");
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <UserSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Top Navbar */}
        <TopNavBarWithLogout />

        <main className="p-6 flex-1 overflow-auto">
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
            Material Request List
          </h1>
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <Spinner />
            </div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : purchaseOrders.length === 0 ? (
            <p className="text-center text-gray-500">
              No Material Request found
            </p>
          ) : (
            <div className="overflow-x-auto rounded-lg shadow-lg bg-white p-4 ml-5">
              <table className="min-w-full table-auto border border-gray-300">
                <thead className="bg-gray-600 text-white">
                  <tr>
                    <th className="py-3 px-4 border">Material Id</th>
                    <th className="py-3 px-4 border">Item Description</th>
                    <th className="py-3 px-4 border">Supplier</th>
                    <th className="py-3 px-4 border">Quantity</th>
                    <th className="py-3 px-4 border">Unit Price(Birr)</th>
                    <th className="py-3 px-4 border">Total Price(Birr)</th>
                    <th className="py-3 px-4 border">Order Date</th>
                    <th className="py-3 px-4 border">Unit of Measurement</th>
                    <th className="py-3 px-4 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseOrders.map((order, index) => (
                    <tr
                      key={index}
                      className="even:bg-gray-100 hover:bg-blue-50 transition-all duration-200"
                    >
                      <td className="py-3 px-4 border">{order.materialId}</td>
                      <td className="py-3 px-4 border">
                        {order.itemDescription}
                      </td>
                      <td className="py-3 px-4 border">{order.supplier}</td>
                      <td className="py-3 px-4 border">{order.quantity}</td>
                      <td className="py-3 px-4 border">
                        {order.unitPrice} ETB
                      </td>
                      <td className="py-3 px-4 border">
                        {order.totalPrice} ETB
                      </td>
                      <td className="py-3 px-4 border">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 border">
                        {order.unitOfMeasurement}
                      </td>
                      <td className="py-3 px-4 border text-center">
                        {order.status === "Approved" ||
                        order.status === "Paid" ? (
                          <button
                            className="text-green-600 cursor-not-allowed"
                            disabled
                          >
                            Approved
                          </button>
                        ) : (
                          <>
                            <button
                              className="text-blue-600 hover:text-blue-800 mr-2"
                              onClick={() => handleUpdate(order._id)}
                            >
                              Update
                            </button>
                            <button
                              className="text-red-600 hover:text-red-800"
                              onClick={() => handleDelete(order._id)}
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>

        {/* Bottom Navbar */}
        <BottomNavBar />
      </div>
    </div>
  );
};

export default UserPurchaseOrderList;
