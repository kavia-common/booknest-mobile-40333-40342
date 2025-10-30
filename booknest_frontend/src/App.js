import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './routes/Home';
import BookDetails from './routes/BookDetails';
import Cart from './routes/Cart';
import Profile from './routes/Profile';
import OrderHistory from './routes/OrderHistory';
import BottomNav from './components/BottomNav';
import { StoreProvider } from './context/StoreContext';

// PUBLIC_INTERFACE
function App() {
  /** Main app shell with routing and global providers. */
  useEffect(() => {
    // Apply theme colors to body from Ocean Professional theme
    document.body.style.background = '';
  }, []);

  return (
    <StoreProvider>
      <BrowserRouter>
        <div className="app-shell page">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books/:id" element={<BookDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<OrderHistory />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <BottomNav />
        </div>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
