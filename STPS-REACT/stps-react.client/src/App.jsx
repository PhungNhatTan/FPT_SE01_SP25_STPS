import { useEffect, useState } from 'react';
import './App.css';
import Homepage from './pages/homepage/homepage';
import TourList from './pages/homepage/tourlist';
import TourDetail from './pages/homepage/tourdetail';
import BookingPopup from './pages/homepage/booking';
import BlogDetail from './pages/homepage/blogdetail';

function App() {
    <Router>
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
    </Router>
}

export default App;