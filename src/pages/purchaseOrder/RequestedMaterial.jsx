import { useEffect, useState } from "react";
import axios from "axios";
import { TopNavBarWithLogout } from "../../components/TopNavBarWithLogout.jsx";
import { BottomNavBar } from "../../components/BottomNavBar.jsx";
import { Sidebar } from "../../components/Sidebar/AdminSidebar.jsx";
import Spinner from "../../components/Spinner.jsx";

const PurchaseOrderList = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPurchaseOrders = async () => {
      try {
        const response = await axios.get(
          "https://mern-backend-qsew.onrender.com/api/material_order/allList"
        );
        console.log("API Response:", response.data);

        // Directly set the purchaseOrders as response.data is already an array
        setPurchaseOrders(response.data);
      } catch (error) {
        console.error("Error fetching purchase orders:", error);
        setError("Failed to fetch purchase orders");
      } finally {
        setLoading(false);
      }
    };

    fetchPurchaseOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    const action = newStatus === "Approved" ? "approving" : "cancelling";
    setUpdatingStatus((prev) => ({ ...prev, [orderId]: action }));

    try {
      const response = await axios.put(
        `https://mern-backend-qsew.onrender.com/api/material_order/${orderId}`,
        { status: newStatus },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Status Update Response:", response.data);

      // Update local state
      setPurchaseOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error(`Error updating status for order ID ${orderId}:`, error);
      alert("Failed to update material order status.");
    } finally {
      setUpdatingStatus((prev) => ({ ...prev, [orderId]: null }));
    }
  };

  if (loading)
    return (
      <div className="flex justify-center mt-10">
        <Spinner size="lg" />
      </div>
    );
  if (error)
    return <div className="text-center text-red-500 mt-4">{error}</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <TopNavBarWithLogout />
      <div className="flex flex-grow">
        <Sidebar />
        <div className="p-6 mx-auto w-full max-w-6xl flex-grow">
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
            Material Orders
          </h1>
          {purchaseOrders.length === 0 ? (
            <p className="text-center text-gray-500">
              No Material orders found
            </p>
          ) : (
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
              <table className="w-full border-collapse">
                <thead className="bg-gradient-to-r from-gray-500 to-gray-700 text-white">
                  <tr>
                    {[
                      "Material ID",
                      "Item Description",
                      "Supplier",
                      "Quantity",
                      "Unit Price",
                      "Total Price",
                      "Order Date",
                      "Status",
                      "Actions",
                    ].map((header) => (
                      <th key={header} className="py-3 px-5 text-left">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {purchaseOrders.map((order, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-gray-100`}
                    >
                      <td className="py-3 px-5">{order.materialId}</td>{" "}
                      {/* Display materialId */}
                      <td className="py-3 px-5">{order.itemDescription}</td>
                      <td className="py-3 px-5">{order.supplier}</td>
                      <td className="py-3 px-5">{order.quantity}</td>
                      <td className="py-3 px-5">{order.unitPrice}</td>
                      <td className="py-3 px-5">{order.totalPrice}</td>
                      <td className="py-3 px-5">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-5 capitalize">{order.status}</td>
                      <td className="py-3 px-5 flex gap-3">
                        {order.status === "Paid" ? (
                          <button
                            className="bg-green-500 text-white py-1 px-4 rounded-md transition cursor-not-allowed"
                            disabled
                          >
                            Paid
                          </button>
                        ) : order.status === "pending" ? (
                          <>
                            <button
                              onClick={() =>
                                handleStatusChange(order._id, "Approved")
                              } // Use _id
                              disabled={updatingStatus[order._id]}
                              className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-md transition"
                            >
                              {updatingStatus[order._id]
                                ? "Approving..."
                                : "Approve"}
                            </button>
                            <button
                              onClick={() =>
                                handleStatusChange(order._id, "Cancelled")
                              } // Use _id
                              disabled={updatingStatus[order._id]}
                              className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-md transition"
                            >
                              {updatingStatus[order._id]
                                ? "Cancelling..."
                                : "Cancel"}
                            </button>
                          </>
                        ) : order.status === "Approved" ? (
                          <button
                            onClick={() =>
                              handleStatusChange(order._id, "Cancelled")
                            } // Use _id
                            disabled={updatingStatus[order._id]}
                            className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-md transition"
                          >
                            {updatingStatus[order._id]
                              ? "Cancelling..."
                              : "Cancel"}
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              handleStatusChange(order._id, "Approved")
                            } // Use _id
                            disabled={updatingStatus[order._id]}
                            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-md transition"
                          >
                            {updatingStatus[order._id]
                              ? "Approving..."
                              : "Approve"}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <BottomNavBar />
    </div>
  );
};

export default PurchaseOrderList;
