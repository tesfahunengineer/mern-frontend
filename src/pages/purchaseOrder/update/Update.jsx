import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { TopNavBarWithLogout } from "../../../components/TopNavBarWithLogout.jsx";
import { BottomNavBar } from "../../../components/BottomNavBar.jsx";
import { CasherSidebar } from "../../../components/Sidebar/CasherSidebar.jsx";

const Update = () => {
  const { poNumber } = useParams(); // Get the PO number from the URL
  const [purchaseOrder, setPurchaseOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    vendor: "",
    orderDate: "",
    deliveryDate: "",
    expectedDeliveryDate: "",
    quantity: 0,
    status: "pending",
    qualityRating: 0,
    issueDate: "",
    acknowledgementDate: "",
  });

  const navigate = useNavigate();

  // Fetch the specific purchase order by PO number
  useEffect(() => {
    // console.log("PO Number from URL:", poNumber); // Add this
    const fetchPurchaseOrder = async () => {
      try {
        const response = await axios.get(
          `https://mern-backend-qsew.onrender.com/api/purchase_order/${poNumber}`
        );
        console.log("API Response:", response.data);

        if (response.data.purchaseOrder) {
          const po = response.data.purchaseOrder;
          setPurchaseOrder(po);
          setFormData({
            vendor: po.vendor || "",
            orderDate: po.orderDate
              ? new Date(po.orderDate).toISOString().slice(0, 10)
              : "",
            deliveryDate: po.deliveryDate
              ? new Date(po.deliveryDate).toISOString().slice(0, 10)
              : "",
            expectedDeliveryDate: po.expectedDeliveryDate
              ? new Date(po.expectedDeliveryDate).toISOString().slice(0, 10)
              : "",
            quantity: po.quantity || 0,
            status: po.status || "pending",
            qualityRating: po.qualityRating || 0,
            issueDate: po.issueDate
              ? new Date(po.issueDate).toISOString().slice(0, 10)
              : "",
            acknowledgementDate: po.acknowledgementDate
              ? new Date(po.acknowledgementDate).toISOString().slice(0, 10)
              : "",
          });
        } else {
          throw new Error("Purchase Order not found");
        }
      } catch (error) {
        console.error("Error fetching purchase order:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Status code:", error.response.status);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Request error message:", error.message);
        }
        setError("Failed to fetch purchase order");
      } finally {
        setLoading(false);
      }
    };

    fetchPurchaseOrder();
  }, [poNumber]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission to update the purchase order
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      console.log("Token being sent:", token); // Debug line

      const response = await axios.put(
        `https://mern-backend-qsew.onrender.com/api/purchase_order/${poNumber}`,
        {
          vendor: formData.vendor,
          orderDate: formData.orderDate,
          deliveryDate: formData.deliveryDate,
          expectedDeliveryDate: formData.expectedDeliveryDate,
          quantity: Number(formData.quantity),
          status: formData.status,
          qualityRating: Number(formData.qualityRating),
          issueDate: formData.issueDate,
          acknowledgementDate: formData.acknowledgementDate,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Update Response:", response.data);

      alert("Purchase order updated successfully!");
      navigate("/purchase_orders");
    } catch (error) {
      console.error("Error updating purchase order:", error);
      if (error.response?.data?.message) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("Failed to update purchase order");
      }
    }
  };

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 mt-4">{error}</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <TopNavBarWithLogout />
      <CasherSidebar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">
          Update Purchase Order - PO #{poNumber}
        </h1>
        {purchaseOrder && (
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="mb-4">
              <label htmlFor="vendor" className="block font-semibold">
                Vendor
              </label>
              <input
                type="text"
                id="vendor"
                name="vendor"
                value={formData.vendor}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="orderDate" className="block font-semibold">
                Order Date
              </label>
              <input
                type="date"
                id="orderDate"
                name="orderDate"
                value={formData.orderDate}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="expectedDeliveryDate"
                className="block font-semibold"
              >
                Expected Delivery Date
              </label>
              <input
                type="date"
                id="expectedDeliveryDate"
                name="expectedDeliveryDate"
                value={formData.expectedDeliveryDate}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
              {/* Delivery Date */}
              <div className="mb-4">
                <label htmlFor="deliveryDate" className="block font-semibold">
                  Delivery Date
                </label>
                <input
                  type="date"
                  id="deliveryDate"
                  name="deliveryDate"
                  value={formData.deliveryDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>

              {/* Quantity */}
              <div className="mb-4">
                <label htmlFor="quantity" className="block font-semibold">
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>

              {/* Status */}
              <div className="mb-4">
                <label htmlFor="status" className="block font-semibold">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Quality Rating */}
              <div className="mb-4">
                <label htmlFor="qualityRating" className="block font-semibold">
                  Quality Rating
                </label>
                <input
                  type="number"
                  id="qualityRating"
                  name="qualityRating"
                  value={formData.qualityRating}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  step="0.1"
                />
              </div>

              {/* Issue Date */}
              <div className="mb-4">
                <label htmlFor="issueDate" className="block font-semibold">
                  Issue Date
                </label>
                <input
                  type="date"
                  id="issueDate"
                  name="issueDate"
                  value={formData.issueDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>

              {/* Acknowledgement Date */}
              <div className="mb-4">
                <label
                  htmlFor="acknowledgementDate"
                  className="block font-semibold"
                >
                  Acknowledgement Date
                </label>
                <input
                  type="date"
                  id="acknowledgementDate"
                  name="acknowledgementDate"
                  value={formData.acknowledgementDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              >
                Update Purchase Order
              </button>
            </div>
          </form>
        )}
      </div>
      <BottomNavBar />
    </div>
  );
};

export default Update;
