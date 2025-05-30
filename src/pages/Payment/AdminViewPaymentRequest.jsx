import { useEffect, useState } from "react";
import axios from "axios";
import { TopNavBarWithLogout } from "../../components/TopNavBarWithLogout.jsx";
import { BottomNavBar } from "../../components/BottomNavBar.jsx";
import { Sidebar } from "../../components/Sidebar/AdminSidebar.jsx";
import Spinner from "../../components/Spinner.jsx";
// import dollar from "../../assets/dollar.jpg";

const AdminViewPaymentRequest = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "https://mern-backend-qsew.onrender.com/api/userpayment/paid"
        );
        setOrders(response.data);
      } catch (error) {
        setError("Failed to fetch orders.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const approveOrder = async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.put(
        `https://mern-backend-qsew.onrender.com/api/userpayment/${orderId}/approve`,
        {}, // Body can be empty for approval
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Order approved:", response.data);
      // Update the state to reflect the approved status
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? { ...order, status: response.data.status }
            : order
        )
      );
    } catch (error) {
      console.error("Error approving order:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-cover bg-center">
      <TopNavBarWithLogout />

      <div className="flex flex-1 flex-col lg:flex-row">
        <Sidebar />

        <div className="w-full p-2 sm:p-4 flex-1 bg-white bg-opacity-90 rounded-lg shadow-md">
          <h2 className="text-xl sm:text-2xl font-semibold text-center text-blue-600 mb-4">
            Requested Payment List
          </h2>

          {loading ? (
            <div className="flex justify-center mt-10">
              <Spinner size="lg" />
            </div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : orders.length === 0 ? (
            <p className="text-center text-lg text-gray-500">
              No orders found.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-[1000px] w-full bg-white shadow-md rounded-lg text-sm sm:text-base">
                <thead>
                  <tr className="bg-blue-600 text-white text-left">
                    {[
                      "Requested By",
                      "Phone Number",
                      "Material ID",
                      "Item Description",
                      "Supplier",
                      "Quantity",
                      "Unit of Measure",
                      "Unit Price",
                      "Paid Amount",
                      "Payment Type",
                      "Cheque Number",
                      "Remaining Balance",
                      "Site",
                      "Project",
                      "Total Price",
                      "Status",
                      "Created At",
                      "Action",
                    ].map((header) => (
                      <th
                        key={header}
                        className="px-2 sm:px-4 py-2 whitespace-nowrap"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b hover:bg-gray-100">
                      <td className="px-2 sm:px-4 py-2">
                        {order.requestedBy || "N/A"}
                      </td>
                      <td className="px-2 sm:px-4 py-2">
                        {order.phoneNumber || "N/A"}
                      </td>
                      <td className="px-2 sm:px-4 py-2">{order.materialId}</td>
                      <td className="px-2 sm:px-4 py-2">
                        {order.itemDescription}
                      </td>
                      <td className="px-2 sm:px-4 py-2">{order.supplier}</td>
                      <td className="px-2 sm:px-4 py-2">{order.quantity}</td>
                      <td className="px-2 sm:px-4 py-2">
                        {order.unitOfMeasure}
                      </td>
                      <td className="px-2 sm:px-4 py-2">
                        {order.unitPrice.toFixed(2)}
                      </td>
                      <td className="px-2 sm:px-4 py-2">
                        {order.paidAmount.toFixed(2)}
                      </td>
                      <td className="px-2 sm:px-4 py-2">{order.paymentType}</td>
                      <td className="px-2 sm:px-4 py-2">
                        {order.paymentType === "Cheque"
                          ? order.chequeNumber
                          : "N/A"}
                      </td>
                      <td className="px-2 sm:px-4 py-2">
                        {order.remainingBalance.toFixed(2)}
                      </td>
                      <td className="px-2 sm:px-4 py-2">{order.site}</td>
                      <td className="px-2 sm:px-4 py-2">{order.project}</td>
                      <td className="px-2 sm:px-4 py-2">
                        {order.totalPrice.toFixed(2)}
                      </td>
                      <td className="px-2 sm:px-4 py-2">
                        <span
                          className={`px-2 py-1 rounded text-xs sm:text-sm ${
                            order.status === "Approved"
                              ? "bg-green-500 text-white"
                              : "bg-yellow-500 text-white"
                          }`}
                        >
                          {order.status || "Pending"}
                        </span>
                      </td>
                      <td className="px-2 sm:px-4 py-2">
                        {new Date(order.createdAt).toLocaleString()}
                      </td>
                      <td className="px-2 sm:px-4 py-2">
                        {order.status === "Paid" ||
                        order.status === "Approved" ? (
                          <span className="text-gray-400 text-sm">
                            ✓ {order.status}
                          </span>
                        ) : (
                          <button
                            onClick={() => approveOrder(order._id)}
                            className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition"
                          >
                            Approve
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

export default AdminViewPaymentRequest;
