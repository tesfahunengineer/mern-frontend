import { InputBox } from "../../../components/InputBox.jsx";
import { useState } from "react";
import { TopNavBarWithLogout } from "../../../components/TopNavBarWithLogout.jsx";
import { BottomNavBar } from "../../../components/BottomNavBar.jsx";
import { Button } from "../../../components/Button.jsx";
import axios from "axios";
import { UserSidebar } from "../../../components/Sidebar/UserSidebar.jsx";
import { Heading } from "../../../components/Heading.jsx";
import { useNavigate } from "react-router-dom";

export const UserCreateNewMaterialRequest = () => {
  const [materialId, setMaterialId] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [supplier, setSupplier] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unitOfMeasurement, setUnitOfMeasurement] = useState("");
  const [unitPrice, setUnitPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderDate, setOrderDate] = useState("");
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleCreatePurchaseOrder = async () => {
    const purchaseOrderData = {
      materialId,
      itemDescription,
      supplier,
      quantity: parseInt(quantity, 10),
      unitOfMeasurement,
      unitPrice: parseFloat(unitPrice),
      totalPrice: parseFloat(totalPrice),
      orderDate,
      items,
    };

    try {
      const response = await axios.post(
        "https://mern-backend-qsew.onrender.com/api/material_order/",
        purchaseOrderData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const successMessage = response?.data?.message;
      setMessage(successMessage);

      if (successMessage === "Material Request created successfully") {
        // Reset form fields
        setMaterialId("");
        setItemDescription("");
        setSupplier("");
        setQuantity(0);
        setUnitOfMeasurement("");
        setUnitPrice(0);
        setTotalPrice(0);
        setOrderDate("");
        setItems([]);

        // Redirect after delay
        setTimeout(() => {
          setMessage("");
          navigate("/user_dashboard");
        }, 3000);
      } else {
        // Clear error after some time if it's not a success
        setTimeout(() => setMessage(""), 5000);
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";
      setMessage(errorMessage);

      // Auto-clear error
      setTimeout(() => setMessage(""), 10000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen ">
      <TopNavBarWithLogout />
      <UserSidebar />
      <div className="flex-1">
        <div className="flex justify-center">
          <Heading
            label="Create a New Material Request"
            color="text-blue-500"
          />
        </div>
        <div className="flex justify-center">
          <div className=" m-5 bg-slate-300 rounded-lg p-4 mt-10 mb-10 w-full max-w-md">
            {/* Material ID Input */}
            <InputBox
              label="Material ID"
              placeholder="Enter material ID"
              type="text"
              onChange={(e) => setMaterialId(e.target.value)}
            />
            {/* Item Description Input */}
            <InputBox
              label="Item Description"
              placeholder="Enter item description"
              type="text"
              onChange={(e) => setItemDescription(e.target.value)}
            />
            {/* Supplier Input */}
            <InputBox
              label="Supplier"
              placeholder="Enter supplier name"
              type="text"
              onChange={(e) => setSupplier(e.target.value)}
            />
            {/* Total Quantity Input */}
            <InputBox
              label="Total Quantity"
              placeholder="Enter total quantity"
              type="number"
              onChange={(e) => setQuantity(e.target.value)}
            />
            {/* Unit of Measurement Input */}
            <InputBox
              label="Unit of Measurement"
              placeholder="Enter unit of measurement"
              type="text"
              onChange={(e) => setUnitOfMeasurement(e.target.value)}
            />
            {/* Unit Price Input */}
            <InputBox
              label="Unit Price"
              placeholder="Enter unit price"
              type="number"
              onChange={(e) => setUnitPrice(e.target.value)}
            />
            {/* Total Price Input */}
            <InputBox
              label="Total Price"
              placeholder="Enter total price"
              type="number"
              onChange={(e) => setTotalPrice(e.target.value)}
            />
            {/* Order Date Input */}
            <InputBox
              label="Requested Date"
              type="date"
              onChange={(e) => setOrderDate(e.target.value)}
            />
            <div className="mt-4">
              <Button
                label="Submit"
                type="submit"
                onClick={handleCreatePurchaseOrder}
              />
            </div>
            {message && (
              <div
                className={`mt-4 p-2 rounded text-sm ${
                  message === "Material Request created successfully"
                    ? "bg-green-200 text-green-700"
                    : "bg-red-200 text-red-700"
                }`}
              >
                {message}
              </div>
            )}
          </div>
        </div>
      </div>

      <BottomNavBar />
    </div>
  );
};
