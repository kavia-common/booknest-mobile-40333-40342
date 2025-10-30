import React from 'react';
import { useStore } from '../context/StoreContext';

// PUBLIC_INTERFACE
export default function OrderHistory() {
  /** Order History page: lists past orders created via demo checkout. */
  const { state } = useStore();
  const orders = state.orders;

  return (
    <main id="main-content" className="container" role="main" aria-labelledby="orders-heading">
      <h1 id="orders-heading" style={{ margin: '8px 0 12px', fontSize: 22 }}>Orders</h1>
      {orders.length === 0 && (
        <div className="card" style={{ padding: 16, color: 'var(--muted)' }}>
          No orders yet. Add items to cart and Checkout to create an order.
        </div>
      )}
      <div style={{ display: 'grid', gap: 12 }} role="list" aria-label="Order list">
        {orders.map((o) => (
          <div key={o.id} className="card" style={{ padding: 14 }} role="listitem" aria-label={`Order ${o.id}, total ${o.total.toFixed(2)} dollars`}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: 800 }}>{o.id}</div>
              <div className="badge">Total ${o.total.toFixed(2)}</div>
            </div>
            <div style={{ color: 'var(--muted)', fontSize: 12, marginTop: 6 }}>
              {new Date(o.date).toLocaleString()}
            </div>
            <div className="hr" />
            <div style={{ display: 'grid', gap: 8 }} role="list" aria-label={`Items in order ${o.id}`}>
              {o.items.map((it, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10 }} role="listitem" aria-label={`${it.title}, quantity ${it.qty}`}>
                  <div style={{ width: 44, height: 60, borderRadius: 8, overflow: 'hidden', background: '#eef2ff' }}>
                    <img src={it.cover} alt={`${it.title} book cover`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{it.title}</div>
                    <div style={{ color: 'var(--muted)', fontSize: 12 }}>Qty: {it.qty}</div>
                  </div>
                  <div className="price" aria-label={`Item total ${(it.price * it.qty).toFixed(2)} dollars`}>${(it.price * it.qty).toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bottom-safe" />
    </main>
  );
}
