import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage/homepage";
import Customizetour from "./pages/homepage/customizetour";
import SavedTour from "./pages/homepage/savedtour";
import BlogDetail from "./pages/homepage/blogdetail";
import BlogList from "./pages/homepage/bloglist";
import TourList from "./pages/homepage/tourlist";
import TourDetail from "./pages/homepage/tourdetail";
import Booking from "./pages/homepage/booking";
import LocationList from "./pages/homepage/locationlist";
import LocationDetail from "./pages/homepage/locationdetail";
import History from "./pages/homepage/history";
import Profile from "./pages/homepage/profile";
import ForgotPassword from "./pages/homepage/ForgotPassword";

import MTourList from "./pages/managepage/mtourlist";
import ManagePage from "./pages/managepage/managepage";
import MPromotionList from "./pages/managepage/mpromotionlist";
import Statistic from "./pages/managepage/statistic";
import AddTour from "./pages/managepage/addtour";
import UpdateTour from "./pages/managepage/updatetour";
import AddPromotion from "./pages/managepage/addpromotion";
import UpdatePromotion from "./pages/managepage/updatepromotion";

import DashboardAdmin from "./pages/dashboard_admin/dashboard_admin";
import ModernDashboard from "./pages/dashboard_admin/ModernDashboard";

import DashboardManager from "./pages/dashboard_manager/dashboard_manager";
import Login from "./pages/homepage/Login";
import Register from "./pages/homepage/register";
import BookingStatus from "./pages/homepage/BookingStatus";
import BookingManagement from "./pages/managepage/bookingmanagement";
import CompanyPaymentStatus from "./pages/homepage/CompanyPaymentStatus";

function App() {
  return (
    <Routes>
      <Route path="/managepage" element={<ManagePage />} />
      <Route path="/mtourlist" element={<MTourList />} />
      <Route path="/add-tour" element={<AddTour />} />
      <Route path="/update-tour/:id" element={<UpdateTour />} />
      <Route path="/mpromotionlist" element={<MPromotionList />} />
      <Route path="/add-promotion" element={<AddPromotion />} />
      <Route path="/update-promotion/:id" element={<UpdatePromotion />} />
      <Route path="/mstatistic" element={<Statistic />} />

      <Route path="/" element={<HomePage />} />
      <Route path="/customize-tour" element={<Customizetour />} />
      <Route path="/saved-tour" element={<SavedTour />} />
      <Route path="/blog/:blogId" element={<BlogDetail />} />
      <Route path="/bloglist" element={<BlogList />} />
      <Route path="/tourlist" element={<TourList />} />
      <Route path="/tour/:id" element={<TourDetail />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/locationlist" element={<LocationList />} />
      <Route path="/location/:locId" element={<LocationDetail />} />
      <Route path="/history" element={<History />} />
      <Route path="/tourdetail/:id" element={<TourDetail />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/dashboard-admin" element={<ModernDashboard />} />
      <Route path="/dashboard-admin-old" element={<DashboardAdmin />} />

      <Route path="/dashboard-manager" element={<DashboardManager />} />
      <Route path="/booking-status" element={<BookingStatus />} />
        <Route path="/company-payment-status" element={<CompanyPaymentStatus />} />
    </Routes>
  );
}

export default App;