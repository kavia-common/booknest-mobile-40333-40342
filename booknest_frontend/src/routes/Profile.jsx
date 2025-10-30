import React from 'react';
import { useStore } from '../context/StoreContext';
import BookCard from '../components/BookCard';

// PUBLIC_INTERFACE
export default function Profile() {
  /** Profile with sample user info and wishlist. */
  const { wishlistItems } = useStore();

  return (
    <div className="container">
      <div className="card" style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 56, height: 56, borderRadius: 14, background: 'linear-gradient(135deg, #2563EB, #60a5fa)',
          color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800
        }}>
          BN
        </div>
        <div>
          <div style={{ fontWeight: 800 }}>BookNest Reader</div>
          <div style={{ color: 'var(--muted)', fontSize: 13 }}>reader@booknest.demo</div>
        </div>
      </div>

      <h2 style={{ margin: '16px 4px 10px', fontSize: 18 }}>Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <div className="card" style={{ padding: 16, color: 'var(--muted)' }}>
          No items in wishlist. Tap the heart on a book to add it.
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 12 }}>
          {wishlistItems.map((b) => (
            <BookCard key={b.id} book={b} />
          ))}
        </div>
      )}

      <div className="bottom-safe" />
    </div>
  );
}
