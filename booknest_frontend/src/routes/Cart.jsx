import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { useToast } from '../components/Toast';

// PUBLIC_INTERFACE
export default function Cart() {
  /** Cart page: list items, quantity controls, totals, and checkout. */
  const { cartItems, cartTotal, dispatch } = useStore();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const hasItems = cartItems.length > 0;

  return (
    <main id="main-content" className="container" role="main" aria-labelledby="cart-heading">
      <h1 id="cart-heading" style={{ margin: '8px 0 12px', fontSize: 22 }}>Your Cart</h1>

      {!hasItems && (
        <div className="card" style={{ padding: 18 }}>
          <p style={{ margin: 0, color: 'var(--muted)' }}>Your cart is empty. Explore books on Home!</p>
        </div>
      )}

      <div style={{ display: 'grid', gap: 12 }} role="list" aria-label="Cart items">
        {cartItems.map((b) => (
          <div key={b.id} className="card" style={{ padding: 12, display: 'flex', gap: 12 }} role="listitem" aria-label={`${b.title} by ${b.author}, quantity ${b.qty}`}>
            <div style={{ width: 68, height: 92, borderRadius: 10, overflow: 'hidden', background: '#eef2ff' }}>
              <img src={b.cover} alt={`${b.title} book cover by ${b.author}`} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700 }}>{b.title}</div>
              <div style={{ color: 'var(--muted)', fontSize: 13 }}>{b.author}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                <span className="price">${b.price.toFixed(2)}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button className="btn" aria-label="Decrease" onClick={() => dispatch({ type: 'SET_QTY', payload: { id: String(b.id), qty: b.qty - 1 } })} style={{ background: '#fff', border: '1px solid rgba(17,24,39,.08)' }}>−</button>
                  <span style={{ minWidth: 24, textAlign: 'center' }}>{b.qty}</span>
                  <button className="btn" aria-label="Increase" onClick={() => dispatch({ type: 'SET_QTY', payload: { id: String(b.id), qty: b.qty + 1 } })} style={{ background: '#fff', border: '1px solid rgba(17,24,39,.08)' }}>+</button>
                  <button className="btn" aria-label="Remove" onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: b.id })} style={{ background: 'var(--error)', color: '#fff' }}>Remove</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {hasItems && (
        <div className="card" style={{ marginTop: 16, padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span>Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span>Shipping</span>
            <span>$0.00</span>
          </div>
          <div className="hr" />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: 18 }}>
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <button
            className="btn btn-primary"
            style={{ width: '100%', marginTop: 12 }}
            onClick={() => {
              // Dispatch checkout to create an order and clear cart, then navigate to success.
              // Using replace prevents the user from returning to a stale cart via back navigation.
              dispatch({ type: 'CHECKOUT' });
              showToast('Checkout complete');
              navigate('/checkout/success', { replace: true });
            }}
            aria-label="Checkout"
          >
            Checkout
          </button>
          <p style={{ margin: '10px 0 0', color: 'var(--muted)', fontSize: 12 }}>
            This is a demo checkout. No payment is processed.
          </p>
        </div>
      )}

      <div className="bottom-safe" />
    </main>
  );
}
