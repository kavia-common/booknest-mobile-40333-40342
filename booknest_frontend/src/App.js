import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import BookDetails from './routes/BookDetails';
import Cart from './routes/Cart';
import Profile from './routes/Profile';
import OrderHistory from './routes/OrderHistory';
import CheckoutSuccess from './routes/CheckoutSuccess';
import NotFound from './routes/NotFound';
import BottomNav from './components/BottomNav';
import { StoreProvider } from './context/StoreContext';
import { ToastProvider } from './components/Toast';

// PUBLIC_INTERFACE
function App() {
  /** Main app shell with routing, global providers, and accessibility features. */
  useEffect(() => {
    // Apply theme colors to body from Ocean Professional theme
    document.body.style.background = '';
  }, []);

  const skipStyles = {
    position: 'absolute',
    top: 8,
    left: 8,
    padding: '10px 14px',
    background: '#fff',
    border: '2px solid rgba(37,99,235,.45)',
    color: 'var(--text)',
    borderRadius: 12,
    boxShadow: '0 8px 24px rgba(17,24,39,.12)',
    zIndex: 1000,
    transform: 'translateY(-140%)',
    transition: 'transform .2s ease, box-shadow .2s ease',
  };

  const skipStylesFocus = {
    ...skipStyles,
    transform: 'translateY(0)',
    boxShadow: '0 14px 40px rgba(37,99,235,.22)',
  };

  return (
    <StoreProvider>
      <ToastProvider>
        <BrowserRouter>
          <a
            href="#main-content"
            className="skip-link"
            style={skipStyles}
            onFocus={(e) => {
              Object.assign(e.currentTarget.style, skipStylesFocus);
            }}
            onBlur={(e) => {
              Object.assign(e.currentTarget.style, skipStyles);
            }}
          >
            Skip to content
          </a>
          <div className="app-shell page">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/books/:id" element={<BookDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/orders" element={<OrderHistory />} />
              <Route path="/checkout/success" element={<CheckoutSuccess />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <BottomNav />
          </div>
        </BrowserRouter>
      </ToastProvider>
    </StoreProvider>
  );
}

export default App;
