import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TopNavBarWithLogout } from "../../components/TopNavBarWithLogout.jsx";
import { BottomNavBar } from "../../components/BottomNavBar.jsx";
import { CasherSidebar } from "../../components/Sidebar/CasherSidebar.jsx";
import Spinner from "../../components/Spinner.jsx"; // Import the Spinner component

const CasherMaterialList = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [payingStatus, setPayingStatus] = useState({});
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPurchaseOrders = async () => {
      try {
        const response = await axios.get(
          "https://mern-backend-qsew.onrender.com/api/material_order/allList"
        );
        console.log("API Response:", response.data);
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

  const handlePayment = async (poNumber) => {
    setPayingStatus((prev) => ({ ...prev, [poNumber]: "paying" }));

    try {
      const response = await axios.put(
        `https://mern-backend-qsew.onrender.com/api/material_order/${poNumber}`,
        { status: "Paid" },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Payment Response:", response.data);

      setPurchaseOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === poNumber ? { ...order, status: "Paid" } : order
        )
      );

      navigate(`/payments/${poNumber}`);
    } catch (error) {
      console.error(`Error processing payment for PO ${poNumber}:`, error);
      alert("Failed to process payment.");
    } finally {
      setPayingStatus((prev) => ({ ...prev, [poNumber]: null }));
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );

  if (error)
    return <div className="text-center text-red-500 mt-4">{error}</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <TopNavBarWithLogout />
      <div className="flex flex-grow">
        <CasherSidebar />
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
                      <td className="py-3 px-5">{order.itemDescription}</td>
                      <td className="py-3 px-5">{order.supplier}</td>
                      <td className="py-3 px-5">{order.quantity}</td>
                      <td className="py-3 px-5">{order.unitPrice}</td>
                      <td className="py-3 px-5">{order.totalPrice}</td>
                      <td className="py-3 px-5">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-5 capitalize">{order.status}</td>
                      <td className="py-3 px-5">
                        {order.status === "Paid" ? (
                          <span className="text-green-500">Paid</span>
                        ) : order.status === "Approved" ? (
                          <button
                            onClick={() => handlePayment(order._id)}
                            disabled={payingStatus[order._id]}
                            className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded-md transition flex items-center gap-2"
                          >
                            {payingStatus[order._id] ? (
                              <>
                                <Spinner size="sm" /> Processing...
                              </>
                            ) : (
                              "Pay"
                            )}
                          </button>
                        ) : (
                          <span className="text-gray-500">Not Approved</span>
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

export default CasherMaterialList;
