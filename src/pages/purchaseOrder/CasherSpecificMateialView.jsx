import { useState } from "react";
import axios from "axios";
import { TopNavBarWithLogout } from "../../components/TopNavBarWithLogout.jsx";
import { BottomNavBar } from "../../components/BottomNavBar.jsx";
import { CasherSidebar } from "../../components/Sidebar/CasherSidebar.jsx";

const CasherSpecificMateialView = () => {
  const [itemDescription, setItemDescription] = useState("");
  const [filteredPurchaseOrders, setFilteredPurchaseOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    if (!itemDescription.trim()) {
      setError("Please enter an Item Description");
      return;
    }

    setLoading(true);
    setError("");
    setFilteredPurchaseOrders([]);

    try {
      const response = await axios.get(
        "https://mern-backend-qsew.onrender.com/api/material_order/allList"
      );

      const orders = response.data || [];

      const filteredOrders = orders.filter((order) =>
        order.itemDescription
          .toLowerCase()
          .includes(itemDescription.toLowerCase())
      );

      if (filteredOrders.length > 0) {
        setFilteredPurchaseOrders(filteredOrders);
      } else {
        setError("No Material orders found with this item description.");
      }
    } catch (error) {
      console.error("Error fetching purchase orders:", error);
      setError("Failed to fetch purchase order details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopNavBarWithLogout />
      <CasherSidebar />
      <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center justify-center">
        <div className="w-full max-w-xl bg-white shadow-xl rounded-lg p-6 transition-all duration-300">
          <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
            Fetch Material Order by Item Description
          </h2>
          <h2>Please Enter the Item Description to Fetch</h2>

          {/* Input Field */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Enter Item Description"
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
            />
            <button
              onClick={handleFetch}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded transition duration-200 shadow-md"
            >
              Fetch
            </button>
          </div>

          {/* Loading/Error Message */}
          {loading && <p className="text-gray-600 animate-pulse">Loading...</p>}
          {error && (
            <p className="text-red-500 bg-red-100 border border-red-300 p-2 rounded mb-2">
              {error}
            </p>
          )}

          {/* Display Purchase Orders */}
          {filteredPurchaseOrders.length > 0 && (
            <div className="mt-4 bg-gray-100 p-4 rounded shadow-sm border border-gray-200 animate-fade-in">
              <h3 className="text-xl font-semibold mb-3 text-green-700 border-b pb-2">
                Material Order Details
              </h3>
              <div className="space-y-4 text-gray-700">
                {filteredPurchaseOrders.map((purchaseOrder) => (
                  <div
                    key={purchaseOrder._id}
                    className="p-4 border rounded-lg bg-white shadow-md"
                  >
                    <p>
                      <strong>Item Description:</strong>{" "}
                      {purchaseOrder.itemDescription}
                    </p>
                    <p>
                      <strong>Supplier:</strong> {purchaseOrder.supplier}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {purchaseOrder.quantity}
                    </p>
                    <p>
                      <strong>Unit Price (Birr):</strong>{" "}
                      {purchaseOrder.unitPrice}
                    </p>
                    <p>
                      <strong>Total Price (Birr):</strong>{" "}
                      {purchaseOrder.totalPrice}
                    </p>
                    <p>
                      <strong>Order Date:</strong>{" "}
                      {new Date(purchaseOrder.orderDate).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Unit of Measurement:</strong>{" "}
                      {purchaseOrder.unitOfMeasurement}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span
                        className={`px-2 py-1 rounded text-white ${
                          purchaseOrder.status === "Approved"
                            ? "bg-green-500"
                            : purchaseOrder.status === "Cancelled"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                        }`}
                      >
                        {purchaseOrder.status || "N/A"}
                      </span>
                    </p>

                    {/* Action Button */}
                    {purchaseOrder.status === "Approved" ? (
                      <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-md transition duration-200">
                        Pay
                      </button>
                    ) : purchaseOrder.status === "Cancelled" ? (
                      <button className="mt-2 bg-gray-400 text-white px-4 py-2 rounded shadow-md font-bold">
                        Not Approved
                      </button>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <BottomNavBar />
    </div>
  );
};

export default CasherSpecificMateialView;
