import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import PropTypes from "prop-types"; // Import PropTypes for validation
import { TopNavBarWithLogout } from "../../components/TopNavBarWithLogout.jsx";
import { BottomNavBar } from "../../components/BottomNavBar.jsx";
import { CasherSidebar } from "../../components/Sidebar/CasherSidebar.jsx";
import { useParams } from "react-router-dom";

const PaymentPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    materialName: "",
    quantity: "",
    measurement: "",
    paymentType: "Cash",
    paidAmount: "",
    paymentDate: "",
    paymentReason: "",
  });

  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });
  const [isFormCompleted, setIsFormCompleted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const {
      materialName,
      quantity,
      measurement,
      paidAmount,
      paymentDate,
      paymentReason,
    } = formData;
    if (
      materialName &&
      quantity &&
      measurement &&
      paidAmount &&
      paymentDate &&
      paymentReason
    ) {
      setIsFormCompleted(true);
    } else {
      setIsFormCompleted(false);
    }
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send the payment data to the backend (Submit Payment)
      const paymentResponse = await axios.post(
        "https://mern-backend-qsew.onrender.com/api/payment/",
        formData
      );
      console.log("Payment response:", paymentResponse.data);

      // After successful payment submission, mark the order as paid
      const markAsPaidResponse = await axios.put(
        `https://mern-backend-qsew.onrender.com/api/userpayment/${orderId}/markAsPaid`,
        formData
      );
      console.log("Mark as paid response:", markAsPaidResponse.data);

      setPopup({
        show: true,
        message: "✅ Payment submitted and order marked as paid successfully!",
        type: "success",
      });

      setTimeout(() => {
        setPopup({ show: false, message: "", type: "" });
        navigate("/casher_dashboard"); // Redirect after success
      }, 2000);
    } catch (error) {
      console.error(
        "Error submitting payment or marking order as paid:",
        error
      );

      setPopup({
        show: true,
        message: "❌ Failed to submit payment or mark order as paid",
        type: "error",
      });

      setTimeout(() => {
        setPopup({ show: false, message: "", type: "" });
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopNavBarWithLogout />
      <CasherSidebar />
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
        <h2 className="text-2xl font-bold text-center mb-6">Payment Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Material Name */}
          <div>
            <label className="block font-medium mb-1">Material Name:</label>
            <input
              type="text"
              name="materialName"
              value={formData.materialName}
              onChange={handleChange}
              placeholder="Enter material name"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block font-medium mb-1">Quantity:</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Enter quantity"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          {/* Measurement */}
          <div>
            <label className="block font-medium mb-1">Measurement:</label>
            <input
              type="text"
              name="measurement"
              value={formData.measurement}
              onChange={handleChange}
              placeholder="e.g. kg, liters"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          {/* Paid Amount */}
          <div>
            <label className="block font-medium mb-1">Paid Amount:</label>
            <input
              type="number"
              name="paidAmount"
              value={formData.paidAmount}
              onChange={handleChange}
              placeholder="Enter paid amount"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          {/* Payment Type */}
          <div>
            <label className="block font-medium mb-1">Payment Type:</label>
            <select
              name="paymentType"
              value={formData.paymentType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="Cash">Cash</option>
              <option value="Transfer">Transfer</option>
              <option value="Check">Check</option>
            </select>
          </div>

          {/* Payment Date */}
          <div>
            <label className="block font-medium mb-1">Payment Date:</label>
            <input
              type="date"
              name="paymentDate"
              value={formData.paymentDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          {/* Payment Reason */}
          <div>
            <label className="block font-medium mb-1">Payment Reason:</label>
            <textarea
              name="paymentReason"
              value={formData.paymentReason}
              onChange={handleChange}
              rows="3"
              placeholder="Enter reason"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition flex justify-center"
            disabled={loading || !isFormCompleted} // Disable if form is not complete
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8h4l-3 3-3-3h4z"
                ></path>
              </svg>
            ) : (
              "Submit Payment"
            )}
          </button>
        </form>
      </div>
      <BottomNavBar />

      {/* Popup Modal */}
      {popup.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className={`p-4 rounded-lg shadow-lg text-white ${
              popup.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {popup.message}
          </div>
        </div>
      )}
    </div>
  );
};

// // Prop validation
// PaymentPage.propTypes = {
//   orderId: PropTypes.string.isRequired, // Ensure orderId is passed as a string
// };

export default PaymentPage;
