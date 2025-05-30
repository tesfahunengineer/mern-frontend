import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TopNavBarWithLogout } from "../../../components/TopNavBarWithLogout.jsx";
import { CasherSidebar } from "../../../components/Sidebar/CasherSidebar.jsx";
import { BottomNavBar } from "../../../components/BottomNavBar.jsx";
import { InputBox } from "../../../components/InputBox.jsx";
import { Button } from "../../../components/Button.jsx";
import { Heading } from "../../../components/Heading.jsx";

export const CasherCreateNewMaterialOrder = () => {
  const [itemDescription, setItemDescription] = useState("");
  const [supplier, setSupplier] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unitOfMeasurement, setUnitOfMeasurement] = useState("");
  const [unitPrice, setUnitPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderDate, setOrderDate] = useState("");
  const [status, setStatus] = useState("pending");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const calculateTotalPrice = () => {
    setTotalPrice(quantity * unitPrice);
  };

  const handleCreatePurchaseOrder = async () => {
    const purchaseOrderData = {
      itemDescription,
      supplier,
      quantity: parseInt(quantity, 10),
      unitOfMeasurement,
      unitPrice: parseFloat(unitPrice),
      totalPrice: parseFloat(totalPrice),
      orderDate,
      status,
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
      setMessage(response.data.message);
      if (response.data.message === "Material order created successfully") {
        setItemDescription("");
        setSupplier("");
        setQuantity(0);
        setUnitOfMeasurement("");
        setUnitPrice(0);
        setTotalPrice(0);
        setOrderDate("");
        setStatus("pending");
      }
      setTimeout(() => {
        setMessage("");
        navigate("/user_dashboard");
      }, 5000);
    } catch (e) {
      setMessage(e.message);
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopNavBarWithLogout />
      <div className="flex-1 flex flex-col lg:flex-row">
        <CasherSidebar />

        <div className="flex-1 px-4 sm:px-6 md:px-8 py-6">
          <div className="w-full max-w-[400px] mx-auto bg-slate-300 rounded-lg p-6">
            <Heading
              label="Create a New Material Order"
              color="text-blue-500"
            />

            {/* Form Fields */}
            <InputBox
              label="Item Description"
              type="text"
              onChange={(e) => setItemDescription(e.target.value)}
            />
            <InputBox
              label="Supplier"
              type="text"
              onChange={(e) => setSupplier(e.target.value)}
            />
            <InputBox
              label="Quantity"
              type="number"
              onChange={(e) => setQuantity(e.target.value)}
            />
            <InputBox
              label="Unit of Measurement"
              type="text"
              onChange={(e) => setUnitOfMeasurement(e.target.value)}
            />
            <InputBox
              label="Unit Price"
              type="number"
              onChange={(e) => {
                setUnitPrice(e.target.value);
                calculateTotalPrice();
              }}
            />
            <InputBox
              label="Total Price"
              type="number"
              value={totalPrice}
              readOnly
            />
            <InputBox
              label="Order Date"
              type="date"
              onChange={(e) => setOrderDate(e.target.value)}
            />

            <div className="mt-6">
              <Button
                label="Submit"
                type="submit"
                onClick={handleCreatePurchaseOrder}
              />
            </div>

            {/* Message */}
            {message && (
              <div
                className={`${
                  message === "Material order created successfully"
                    ? "bg-green-200 text-green-500"
                    : "bg-red-200 text-red-500"
                } p-2 rounded mt-4`}
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
