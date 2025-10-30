import React from 'react';
import { NavLink } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const navStyle = {
  position: 'fixed',
  bottom: 12,
  left: 12,
  right: 12,
  background: 'var(--surface)',
  borderRadius: 18,
  boxShadow: '0 14px 40px rgba(17,24,39,.16)',
  padding: '10px 12px',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  border: '1px solid rgba(17,24,39,.06)',
  zIndex: 50
};

const linkStyle = (isActive) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 4,
  padding: '8px 6px',
  color: isActive ? 'var(--primary)' : 'var(--muted)',
  fontWeight: 700,
  borderRadius: 12,
  transition: 'all .2s ease',
});

function Icon({ name, active }) {
  const color = active ? 'var(--primary)' : 'var(--muted)';
  const size = 22;
  // Simple inline icons (emoji-like for simplicity)
  const map = {
    home: '🏠',
    cart: '🛒',
    profile: '👤',
    orders: '📦'
  };
  return (
    <span style={{ fontSize: size, lineHeight: 1, color }}>{map[name]}</span>
  );
}

// PUBLIC_INTERFACE
export default function BottomNav() {
  /** Mobile bottom navigation bar with 4 tabs. */
  const { cartItems } = useStore();

  const badge =
    cartItems.length > 0 ? (
      <span className="badge" style={{ position: 'absolute', top: 4, right: 16 }}>
        {cartItems.length}
      </span>
    ) : null;

  return (
    <nav style={navStyle} aria-label="Bottom navigation">
      <NavLink to="/" end style={({ isActive }) => linkStyle(isActive)} aria-label="Home">
        {({ isActive }) => (
          <>
            <Icon name="home" active={isActive} />
            <span style={{ fontSize: 12 }}>Home</span>
          </>
        )}
      </NavLink>
      <NavLink to="/cart" style={({ isActive }) => ({ ...linkStyle(isActive), position: 'relative' })} aria-label="Cart">
        {({ isActive }) => (
          <>
            <Icon name="cart" active={isActive} />
            <span style={{ fontSize: 12 }}>Cart</span>
            {badge}
          </>
        )}
      </NavLink>
      <NavLink to="/orders" style={({ isActive }) => linkStyle(isActive)} aria-label="Orders">
        {({ isActive }) => (
          <>
            <Icon name="orders" active={isActive} />
            <span style={{ fontSize: 12 }}>Orders</span>
          </>
        )}
      </NavLink>
      <NavLink to="/profile" style={({ isActive }) => linkStyle(isActive)} aria-label="Profile">
        {({ isActive }) => (
          <>
            <Icon name="profile" active={isActive} />
            <span style={{ fontSize: 12 }}>Profile</span>
          </>
        )}
      </NavLink>
    </nav>
  );
}
