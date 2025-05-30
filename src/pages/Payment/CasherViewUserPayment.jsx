import { useEffect, useState } from "react";
import axios from "axios";
import { TopNavBarWithLogout } from "../../components/TopNavBarWithLogout.jsx";
import { BottomNavBar } from "../../components/BottomNavBar.jsx";
import { CasherSidebar } from "../../components/Sidebar/CasherSidebar.jsx";
import Spinner from "../../components/Spinner.jsx";
import { useNavigate } from "react-router-dom"; // Import useNavigate for page navigation

const CasherViewPaymentRequest = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [payingStatus, setPayingStatus] = useState({});
  const navigate = useNavigate(); // Hook to navigate to other pages

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

  const payOrder = async (orderId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    // Show loading state for that specific order
    setPayingStatus((prev) => ({ ...prev, [orderId]: true }));

    try {
      // Navigate to the payment page directly
      navigate(`/payments/${orderId}`);
    } catch (error) {
      console.error("Error initiating payment:", error);
      // Handle error if needed
      alert("Failed to initiate payment.");
    } finally {
      setPayingStatus((prev) => ({ ...prev, [orderId]: false }));
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-cover bg-center">
      <TopNavBarWithLogout />
      <div className="flex flex-1">
        <CasherSidebar />
        <div className="container mx-auto p-4 flex-1 bg-white bg-opacity-90 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
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
              <table className="min-w-full bg-white shadow-md rounded-lg">
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
                      <th key={header} className="px-4 py-2">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b hover:bg-gray-100">
                      <td className="px-4 py-2">
                        {order.requestedBy || "N/A"}
                      </td>
                      <td className="px-4 py-2">
                        {order.phoneNumber || "N/A"}
                      </td>
                      <td className="px-4 py-2">{order.materialId}</td>
                      <td className="px-4 py-2">{order.itemDescription}</td>
                      <td className="px-4 py-2">{order.supplier}</td>
                      <td className="px-4 py-2">{order.quantity}</td>
                      <td className="px-4 py-2">{order.unitOfMeasure}</td>
                      <td className="px-4 py-2">
                        {order.unitPrice.toFixed(2)}
                      </td>
                      <td className="px-4 py-2">
                        {order.paidAmount.toFixed(2)}
                      </td>
                      <td className="px-4 py-2">{order.paymentType}</td>
                      <td className="px-4 py-2">
                        {order.paymentType === "Cheque"
                          ? order.chequeNumber
                          : "N/A"}
                      </td>
                      <td className="px-4 py-2">
                        {order.remainingBalance.toFixed(2)}
                      </td>
                      <td className="px-4 py-2">{order.site}</td>
                      <td className="px-4 py-2">{order.project}</td>
                      <td className="px-4 py-2">
                        {order.totalPrice.toFixed(2)}
                      </td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-2 py-1 rounded ${
                            order.status === "Paid"
                              ? "bg-green-500 text-white"
                              : "bg-yellow-500 text-white"
                          }`}
                        >
                          {order.status || "Pending"}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        {new Date(order.createdAt).toLocaleString()}
                      </td>
                      <td className="px-4 py-2">
                        {order.status === "Paid" ? (
                          <span className="text-gray-400">Paid</span>
                        ) : order.status === "Approved" ? (
                          <button
                            onClick={() => payOrder(order._id)}
                            disabled={payingStatus[order._id]}
                            className={`px-4 py-1 rounded transition ${
                              payingStatus[order._id]
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-500 hover:bg-blue-700 text-white"
                            }`}
                          >
                            {payingStatus[order._id] ? "Processing..." : "Pay"}
                          </button>
                        ) : (
                          <button
                            disabled
                            className="px-4 py-1 bg-gray-300 text-gray-600 rounded cursor-not-allowed"
                            title="Only approved requests can be paid"
                          >
                            Not Approved
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

export default CasherViewPaymentRequest;
