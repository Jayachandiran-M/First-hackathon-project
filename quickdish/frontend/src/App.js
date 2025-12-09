import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot'; // Add this import
import Home from './pages/Home';
import Restaurants from './pages/Restaurants';
import RestaurantMenu from './pages/RestaurantMenu';
import CartPage from './pages/CartPage';
import TrackOrder from './pages/TrackOrder';
import Profile from './pages/Profile';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Toaster position="top-right" />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/restaurant/:id" element={<RestaurantMenu />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/track" element={<TrackOrder />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        
        {/* Add Chatbot Component Here */}
        <Chatbot />
        
        <footer className="footer">
          <p>© 2024 QuickDish. All rights reserved.</p>
          <p>Delivering happiness to your doorstep!</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;