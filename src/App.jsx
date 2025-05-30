import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignInPage } from "./pages/SignIn.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import { SignUpPage } from "./pages/SignUp.jsx";
import { AdminDashboard } from "./pages/Dashboard/AdminDashboard.jsx";
import { UserDashboard } from "./pages/Dashboard/UserDashboard.jsx";
import Dashboard from "../NewDashboard.jsx";
import { CasherDashboard } from "./pages/Dashboard/CasherDashboard.jsx";
import RequestedMaterial from "./pages/purchaseOrder/RequestedMaterial.jsx";
import UserMaterialRequestList from "./pages/purchaseOrder/UserMaterialRequestList.jsx";
import UserSpecificMaterial from "./pages/purchaseOrder/SpecificMaterialRequest.jsx";
import UpdateMaterial from "./pages/purchaseOrder/update/UserUpdateMaterial.jsx";
import CreateProject from "./pages/projectSchedule/CreateNewProject.jsx";
import CreateTask from "./pages/TaskSchedule/CreateTask.jsx";
import PaymentPage from "./pages/Payment/PaymentPage.jsx";
import UserPayment from "./pages/Payment/UserPayment.jsx";
import EmployeePage from "./pages/Employee/EmployeePage.jsx";
import ViewEmployee from "./pages/Employee/ViewEmployee.jsx";
import { CasherCreateNewMaterialOrder } from "./pages/purchaseOrder/Create/CasherCreateNewMaterialOrder.jsx";
import CasherReport from "./pages/Report/CasherReport.jsx";
import UserReport from "./pages/Report/UserReport.jsx";
import Update from "./pages/purchaseOrder/update/Update.jsx";
import { UserCreateNewMaterialRequest } from "./pages/purchaseOrder/Create/UserCreateNewMaterialRequest.jsx";
import UpdateEmployee from "./pages/Employee/UpdateEmployee.jsx";
import SpecificEmployeeView from "./pages/Employee/SpecificEmployeeView.jsx";
import CasherSpecificMateialView from "./pages/purchaseOrder/CasherSpecificMateialView.jsx";
import CasherMaterialList from "./pages/purchaseOrder/CasherMaterialList.jsx";
import EmployeePerformance from "./pages/Employee/EmployeePerformance.jsx";
import OurService from "./pages/FirstPage/OurService/OurService.jsx";
import AboutUs from "./pages/FirstPage/AboutUs/AboutUs.jsx";
import ContactUs from "./pages/FirstPage/ContactUs/ContactUs.jsx";
import CasherViewUserPayment from "./pages/Payment/CasherViewUserPayment.jsx";
import AdminViewPaymentRequest from "./pages/Payment/AdminViewPaymentRequest.jsx";
import MessagesList from "./pages/FirstPage/ContactUs/MessagesList.jsx";
import PerformancePage from "./pages/PerformancePage.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/ourservices" element={<OurService />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/user_dashboard" element={<UserDashboard />} />
          <Route path="/user_dashboardd" element={<Dashboard />} />
          <Route path="/admin_dashboard" element={<AdminDashboard />} />
          <Route path="/casher_dashboard" element={<CasherDashboard />} />
          <Route
            path="/admin_view_payment_request"
            element={<AdminViewPaymentRequest />}
          />

          <Route
            path="/user_create_material_order"
            element={<UserCreateNewMaterialRequest />}
          />
          <Route path="/casher_report" element={<CasherReport />} />
          <Route path="/user_report" element={<UserReport />} />
          <Route
            path="/casher_create_material_order"
            element={<CasherCreateNewMaterialOrder />}
          />
          <Route path="/material_requested" element={<RequestedMaterial />} />
          <Route
            path="/view_all_material_order"
            element={<UserMaterialRequestList />}
          />
          <Route
            path="/casher_view_all_material_order"
            element={<CasherMaterialList />}
          />
          <Route
            path="/user_view_specific_material"
            element={<UserSpecificMaterial />}
          />
          <Route
            path="/casher_view_specific_material"
            element={<CasherSpecificMateialView />}
          />
          <Route
            path="/update_material/:orderId"
            element={<UpdateMaterial />}
          />
          <Route path="/update_purchase/:poNumber" element={<Update />} />
          <Route path="/employee" element={<EmployeePage />} />
          <Route path="/employee_list" element={<ViewEmployee />} />
          <Route path="/employee_update/:id" element={<UpdateEmployee />} />
          <Route path="/specific_employee" element={<SpecificEmployeeView />} />
          <Route path="/project_schedule" element={<CreateProject />} />
          <Route path="/task_schedule" element={<CreateTask />} />
          <Route path="/payments" element={<PaymentPage />} />
          <Route path="/payments/:orderId" element={<PaymentPage />} />
          <Route path="/user_payment" element={<UserPayment />} />
          <Route
            path="/employee_performance"
            element={<EmployeePerformance />}
          />
          <Route path="/userpaid" element={<CasherViewUserPayment />} />
          <Route path="/messagelist" element={<MessagesList />} />
          <Route path="/performance" element={<PerformancePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
