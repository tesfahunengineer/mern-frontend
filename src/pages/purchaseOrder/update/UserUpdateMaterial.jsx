import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { TopNavBarWithLogout } from "../../../components/TopNavBarWithLogout.jsx";
import { BottomNavBar } from "../../../components/BottomNavBar.jsx";
import { UserSidebar } from "../../../components/Sidebar/UserSidebar.jsx";

const UpdateMaterial = () => {
  const { orderId } = useParams(); // Get the orderId from the URL
  const navigate = useNavigate();

  const [order, setOrder] = useState({
    itemDescription: "",
    supplier: "",
    quantity: "",
    unitPrice: "",
    totalPrice: "",
    orderDate: "",
    unitOfMeasurement: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState("");

  // Fetch the current order details when the component is mounted
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `https://mern-backend-qsew.onrender.com/api/material_order/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setOrder(response.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
        setError("Failed to fetch order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `https://mern-backend-qsew.onrender.com/api/material_order/${orderId}`,
        order,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response", response);

      setSuccess("Material updated successfully!");
      setError(""); // Clear error if any
      // Delay navigation to show success message
      setTimeout(() => {
        navigate("/view_all_material_order");
      }, 2000); // 2 seconds delay
    } catch (error) {
      console.error("Error updating request:", error);
      setError(
        error?.response?.data?.message || "Failed to update the request."
      );
      setSuccess(""); // Clear success if any
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <UserSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <TopNavBarWithLogout />

        <main className="p-6 flex-1 overflow-auto">
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
            Update Material Request
          </h1>

          {loading ? (
            <div className="text-center text-gray-600 animate-pulse">
              Loading request details...
            </div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
              <form onSubmit={handleSubmit}>
                {/* Item Description */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Item Description
                  </label>
                  <input
                    type="text"
                    name="itemDescription"
                    value={order.itemDescription}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Supplier */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Supplier
                  </label>
                  <input
                    type="text"
                    name="supplier"
                    value={order.supplier}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Quantity */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={order.quantity}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Unit Price */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Unit Price (Birr)
                  </label>
                  <input
                    type="number"
                    name="unitPrice"
                    value={order.unitPrice}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Total Price */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Total Price (Birr)
                  </label>
                  <input
                    type="number"
                    name="totalPrice"
                    value={order.totalPrice}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Order Date */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Order Date
                  </label>
                  <input
                    type="date"
                    name="orderDate"
                    value={order.orderDate}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Unit of Measurement */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Unit of Measurement
                  </label>
                  <input
                    type="text"
                    name="unitOfMeasurement"
                    value={order.unitOfMeasurement}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Updating..." : "Update Order"}
                  </button>
                </div>
                {/* Message below button */}
                {error && (
                  <p className="mt-4 text-red-600 text-sm font-medium">
                    {error}
                  </p>
                )}
                {success && (
                  <p className="mt-4 text-green-600 text-sm font-medium">
                    {success}
                  </p>
                )}
              </form>
            </div>
          )}
        </main>

        {/* Bottom Navbar */}
        <BottomNavBar />
      </div>
    </div>
  );
};

export default UpdateMaterial;
