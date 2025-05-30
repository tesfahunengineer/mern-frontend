import { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import axios from "axios"; // Import axios to send requests
import { TopNavBarWithLogout } from "../../components/TopNavBarWithLogout.jsx";
import { BottomNavBar } from "../../components/BottomNavBar.jsx";
import { UserSidebar } from "../../components/Sidebar/UserSidebar.jsx";

const UserPayment = () => {
  // State variables for form input values
  const [requestedBy, setRequestedBy] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [materialId, setMaterialId] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [supplier, setSupplier] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitOfMeasure, setUnitOfMeasure] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [chequeNumber, setChequeNumber] = useState("");
  const [remainingBalance, setRemainingBalance] = useState("");
  const [site, setSite] = useState("");
  const [project, setProject] = useState("");
  const [orders, setOrders] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch orders from the backend when component mounts

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "https://mern-backend-qsew.onrender.com/api/userpayment/paid?limit=10"
        );
        console.log("Response from backend:", response);
        setOrders(response.data); // Store response directly (since it's an array)
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleAddOrder = async () => {
    setLoading(true); // Set loading to true before the request starts

    const totalPrice = Number(quantity) * Number(unitPrice);
    const remaining = totalPrice - Number(paidAmount);
    console.log("Total Price:", totalPrice); // Add this line for debugging
    console.log("Remaining Balance:", remaining); // Add this line for debugging
    console.log("Paid Amount:", paidAmount); // Add this line for debugging

    // Frontend validation to check consistency
    if (Number(paidAmount) + remaining !== totalPrice) {
      console.log(
        "Validation failed: Sum of paid amount and remaining balance is incorrect"
      );
      setErrorMessage(
        "The sum of paid amount and remaining balance must equal the total price."
      );
      setLoading(false);
      return; // Stop execution if validation fails
    }

    if (Number(paidAmount) === totalPrice && Number(remaining) !== 0) {
      console.log(
        "Validation failed: Remaining balance must be 0 if paid amount equals total price"
      );

      setErrorMessage(
        "If the paid amount equals the total price, the remaining balance must be 0."
      );
      setLoading(false);
      return; // Stop execution if validation fails
    }
    // Parse the remainingBalance as a number
    const parsedRemainingBalance = Number(remainingBalance); // Convert to number
    const orderData = {
      requestedBy,
      phoneNumber,
      materialId,
      itemDescription,
      supplier,
      quantity: Number(quantity),
      unitOfMeasure,
      unitPrice: Number(unitPrice),
      paidAmount: Number(paidAmount),
      paymentType,
      chequeNumber,
      remainingBalance: parsedRemainingBalance,
      site,
      project,
    };
    console.log("Sending Order Data:", orderData); // Log the data being sent

    try {
      setErrorMessage("");
      const response = await axios.post(
        "https://mern-backend-qsew.onrender.com/api/userpayment/",
        orderData
      );
      setSuccessMessage(response.data.message); // Show the success message below the button

      // Set timeout to clear success message after 5 seconds
      setTimeout(() => {
        setSuccessMessage(""); // Clear the success message after 5 seconds
      }, 5000);

      // Update the orders state by adding the new order to the list
      setOrders((prevOrders) => [
        ...prevOrders,
        { ...orderData, totalPrice, id: response.data.orderId }, // Assuming response contains orderId or similar identifier
      ]);

      // Reset form fields after success
      setRequestedBy("");
      setPhoneNumber("");
      setMaterialId("");
      setItemDescription("");
      setSupplier("");
      setQuantity(0);
      setUnitOfMeasure("");
      setUnitPrice(0);
      setPaidAmount(0);
      setPaymentType("");
      setChequeNumber("");
      setRemainingBalance(0);
      setSite("");
      setProject("");
    } catch (error) {
      console.error("Error adding order:", error);
      const message =
        error.response?.data?.error ||
        "Failed to add the order. Please try again.";
      setErrorMessage(message);

      // Clear after 5 seconds
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    } finally {
      setLoading(false); // Set loading to false after request completes
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopNavBarWithLogout />
      <UserSidebar />
      <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50 min-h-screen p-6">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Payment Request
        </h2>

        {/* Form Section */}
        <div className="bg-white shadow-2xl rounded-xl p-8 max-w-4xl mx-auto mb-10 border border-blue-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Requested By"
              value={requestedBy}
              onChange={setRequestedBy}
            />
            <InputField
              label="Phone Number"
              value={phoneNumber}
              onChange={setPhoneNumber}
            />
            <InputField
              label="Material ID"
              value={materialId}
              onChange={setMaterialId}
            />
            <InputField
              label="Item Description"
              value={itemDescription}
              onChange={setItemDescription}
            />
            <InputField
              label="Supplier"
              value={supplier}
              onChange={setSupplier}
            />
            <InputField
              label="Quantity"
              value={quantity}
              onChange={setQuantity}
              type="number"
            />
            <InputField
              label="Unit of Measure"
              value={unitOfMeasure}
              onChange={setUnitOfMeasure}
            />
            <InputField
              label="Unit Price"
              value={unitPrice}
              onChange={setUnitPrice}
              type="number"
            />
            <InputField
              label="Paid Amount"
              value={paidAmount}
              onChange={setPaidAmount}
              type="number"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Type
              </label>
              <select
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
                className="border border-gray-300 rounded-lg w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200"
              >
                <option value="">Select Payment Type</option>
                <option value="Cash">Cash</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Cheque">Cheque</option>
              </select>
            </div>
            {paymentType === "Cheque" && (
              <InputField
                label="Cheque Number"
                value={chequeNumber}
                onChange={setChequeNumber}
              />
            )}
            <InputField
              label="Remaining Balance"
              value={remainingBalance}
              onChange={setRemainingBalance}
              type="number"
            />
            <InputField label="Site" value={site} onChange={setSite} />
            <InputField label="Project" value={project} onChange={setProject} />
          </div>

          <button
            onClick={handleAddOrder}
            className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white py-2 px-8 rounded-lg shadow-md transition duration-200 mt-6 mx-auto block"
            disabled={loading} // Disable the button when loading
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin w-5 h-5 border-4 border-t-4 border-blue-500 rounded-full"></div>
                <span>Loading...</span>
              </div>
            ) : (
              "Request Payment"
            )}
          </button>

          {/* Display success message if it exists */}
          {successMessage && (
            <div className="mt-4 text-green-500 font-semibold text-center">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="mt-4 text-red-500 font-semibold text-center">
              {errorMessage}
            </div>
          )}
        </div>

        {/* Orders Table */}
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Added Payment Request
        </h2>
        <div className="overflow-x-auto bg-white shadow-xl rounded-xl p-6 max-w-7xl mx-auto border border-blue-100">
          <table className="min-w-full table-auto text-sm text-gray-700">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-2 py-3">Material ID</th>
                <th className="px-4 py-3">Item Description</th>
                <th className="px-4 py-3">Supplier</th>
                <th className="px-4 py-3">Quantity</th>
                <th className="px-4 py-3">Unit of Measure</th>
                <th className="px-4 py-3">Unit Price</th>
                <th className="px-4 py-3">Total Price</th>
                <th className="px-4 py-3">Paid Amount</th>
                <th className="px-4 py-3">Payment Type</th>
                <th className="px-4 py-3">Cheque Number</th>
                <th className="px-4 py-3">Remaining Balance</th>
                <th className="px-4 py-3">Site</th>
                <th className="px-4 py-3">Project</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-blue-50" : "bg-white"
                  } hover:bg-blue-100 transition duration-200`}
                >
                  <td className="px-4 py-3">{order.materialId}</td>
                  <td className="px-4 py-3">{order.itemDescription}</td>
                  <td className="px-4 py-3">{order.supplier}</td>
                  <td className="px-4 py-3">{order.quantity}</td>
                  <td className="px-4 py-3">{order.unitOfMeasure}</td>
                  <td className="px-4 py-3">{order.unitPrice}</td>
                  <td className="px-4 py-3">{order.totalPrice}</td>
                  <td className="px-4 py-3">{order.paidAmount}</td>
                  <td className="px-4 py-3">{order.paymentType}</td>
                  <td className="px-4 py-3">
                    {order.paymentType === "Cheque" ? order.chequeNumber : "-"}
                  </td>
                  <td className="px-4 py-3">{order.remainingBalance}</td>
                  <td className="px-4 py-3">{order.site}</td>
                  <td className="px-4 py-3">{order.project}</td>
                  <td className="px-4 py-3">{order.status || "Pending"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <BottomNavBar />
    </div>
  );
};

const InputField = ({ label, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => {
        const newValue = e.target.value;
        // Allow numbers as input if type is "number", but treat them as string
        if (type === "number") {
          // Allow empty input or numeric values
          if (newValue === "" || !isNaN(newValue)) {
            onChange(newValue); // Keep value as string
          }
        } else {
          onChange(newValue); // For non-numeric input fields, handle normally
        }
      }}
      className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200"
    />
  </div>
);

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
};

export default UserPayment;
