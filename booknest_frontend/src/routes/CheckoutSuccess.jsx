import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

// PUBLIC_INTERFACE
export default function CheckoutSuccess() {
  /** Checkout success page: shows latest order summary with actions to view orders or continue shopping. */
  const { state } = useStore();
  const navigate = useNavigate();

  const latestOrder = state.orders[0];

  if (!latestOrder) {
    // If user landed here without an order, redirect to cart
    navigate('/cart', { replace: true });
    return null;
  }

  return (
    <main id="main-content" className="container" style={{ paddingTop: 16 }} role="main" aria-labelledby="checkout-success-heading">
      <section
        className="card"
        style={{
          padding: 18,
          textAlign: 'center',
          background:
            'linear-gradient(180deg, rgba(37,99,235,.06) 0%, #fff 14%)',
        }}
        aria-live="polite"
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 18,
            margin: '0 auto 10px',
            background: 'linear-gradient(135deg, #2563EB, #60a5fa)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 14px 40px rgba(37,99,235,.28)',
            fontSize: 34,
          }}
          aria-hidden="true"
        >
          ✓
        </div>
        <h1 id="checkout-success-heading" style={{ margin: '6px 0 4px', fontSize: 22, lineHeight: 1.2 }}>
          Order Confirmed
        </h1>
        <p style={{ margin: 0, color: 'var(--muted)' }}>
          Thank you for your purchase! Your books are on the way.
        </p>

        <div className="hr" />

        <article
          className="card"
          style={{ padding: 12, textAlign: 'left', background: '#fff' }}
          aria-label="Order summary"
        >
          <header
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}
          >
            <div style={{ fontWeight: 800 }} aria-label="Order ID">#{latestOrder.id}</div>
            <div className="badge" aria-label={`Total ${latestOrder.total.toFixed(2)} dollars`}>Total ${latestOrder.total.toFixed(2)}</div>
          </header>
          <div style={{ color: 'var(--muted)', fontSize: 12, marginTop: 4 }}>
            {new Date(latestOrder.date).toLocaleString()}
          </div>

          <div className="hr" />

          <ul style={{ display: 'grid', gap: 10, listStyle: 'none', padding: 0, margin: 0 }}>
            {latestOrder.items.map((it, idx) => (
              <li
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 60,
                    borderRadius: 8,
                    overflow: 'hidden',
                    background: '#eef2ff',
                    flex: '0 0 auto'
                  }}
                >
                  <img
                    src={it.cover}
                    alt={it.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {it.title}
                  </div>
                  <div style={{ color: 'var(--muted)', fontSize: 12 }}>
                    Qty: {it.qty}
                  </div>
                </div>
                <div className="price" aria-label={`Item total ${(it.price * it.qty).toFixed(2)} dollars`}>
                  ${(it.price * it.qty).toFixed(2)}
                </div>
              </li>
            ))}
          </ul>
        </article>

        <div style={{ display: 'grid', gap: 10, marginTop: 14 }}>
          <Link
            to="/orders"
            className="btn"
            aria-label="View your orders"
            style={{
              background: '#fff',
              border: '1px solid rgba(17,24,39,.08)',
              fontWeight: 700,
            }}
          >
            View Orders
          </Link>
          <Link
            to="/"
            className="btn btn-primary"
            aria-label="Continue shopping on Home"
            style={{ fontWeight: 800 }}
          >
            Continue Shopping
          </Link>
        </div>
      </section>

      <div className="bottom-safe" />
    </main>
  );
}
