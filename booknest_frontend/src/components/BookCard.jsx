import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

// PUBLIC_INTERFACE
export default function BookCard({ book }) {
  /** Book card with cover, title, author, price and quick actions. */
  const { dispatch, state } = useStore();
  const inWishlist = !!state.wishlist[String(book.id)];

  return (
    <div className="card" style={{ overflow: 'hidden' }}>
      <Link to={`/books/${book.id}`} style={{ display: 'flex', gap: 12, padding: 12 }}>
        <div style={{ width: 84, height: 116, borderRadius: 10, overflow: 'hidden', background: '#eef2ff' }}>
          <img src={book.cover} alt={book.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="badge" style={{ marginBottom: 6 }}>{book.category}</div>
            <h3 style={{ margin: '2px 0 6px', fontSize: 16, lineHeight: 1.2 }}>{book.title}</h3>
            <p style={{ margin: 0, color: 'var(--muted)' }}>{book.author}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
            <span className="price">${book.price.toFixed(2)}</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                className="btn btn-ghost"
                aria-label="Wishlist"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch({ type: 'TOGGLE_WISHLIST', payload: book.id });
                }}
                title="Toggle Wishlist"
              >
                {inWishlist ? '💙' : '🤍'}
              </button>
              <button
                className="btn btn-primary"
                aria-label="Add to cart"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch({ type: 'ADD_TO_CART', payload: book.id });
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
