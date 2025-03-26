import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage/homepage";
import Customizetour from "./pages/homepage/customizetour";
import BlogDetail from "./pages/homepage/blogdetail";
import TourList from "./pages/homepage/tourlist";
import TourDetail from "./pages/homepage/tourdetail";
import Booking from "./pages/homepage/booking";
import MTourList from "./pages/managepage/mtourlist";
import ManagePage from "./pages/managepage/managepage";
import MPromotionList from "./pages/managepage/mpromotionlist";
import Statistic from "./pages/managepage/statistic";
import AddTour from "./pages/managepage/addtour";
import UpdateTour from "./pages/managepage/updatetour";
import AddPromotion from "./pages/managepage/addpromotion";
import UpdatePromotion from "./pages/managepage/updatepromotion";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ManagePage />} />
      <Route path="/mtourlist" element={<MTourList />} />
      <Route path="/add-tour" element={<AddTour />} />
      <Route path="/update-tour/:id" element={<UpdateTour />} />
      <Route path="/mpromotionlist" element={<MPromotionList />} />
      <Route path="/add-promotion" element={<AddPromotion />} />
      <Route path="/update-promotion/:id" element={<UpdatePromotion />} />
      <Route path="/mstatistic" element={<Statistic />} />
      <Route path="/home-page" element={<HomePage />} />
      <Route path="/customize-tour" element={<Customizetour />} />
      <Route path="/blog/:blogId" element={<BlogDetail />} />
      <Route path="/tourlist" element={<TourList />} />
      <Route path="/tour/:id" element={<TourDetail />} />
      <Route path="/booking" element={<Booking />} />
    </Routes>
  );
}

export default App;
