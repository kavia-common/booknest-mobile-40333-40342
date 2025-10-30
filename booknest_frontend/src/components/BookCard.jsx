import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { useToast } from './Toast';

// PUBLIC_INTERFACE
export default function BookCard({ book }) {
  /** Book card with cover, title, author, price and quick actions. */
  const { dispatch, state } = useStore();
  const { showToast } = useToast();
  const inWishlist = !!state.wishlist[String(book.id)];

  return (
    <article
      className="card"
      style={{ overflow: 'hidden' }}
      role="listitem"
      aria-label={`${book.title} by ${book.author} — ${book.category} — ${book.price.toFixed(2)} dollars`}
    >
      <Link
        to={`/books/${book.id}`}
        style={{ display: 'flex', gap: 12, padding: 12 }}
        aria-label={`View details for ${book.title} by ${book.author}`}
      >
        <div style={{ width: 84, height: 116, borderRadius: 10, overflow: 'hidden', background: '#eef2ff' }}>
          <img
            src={book.cover}
            alt={`${book.title} book cover by ${book.author}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="badge" style={{ marginBottom: 6 }} aria-label={`Category ${book.category}`}>{book.category}</div>
            <h3 style={{ margin: '2px 0 6px', fontSize: 16, lineHeight: 1.2 }}>{book.title}</h3>
            <p style={{ margin: 0, color: 'var(--muted)' }}>{book.author}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
            <span className="price" aria-label={`Price ${book.price.toFixed(2)} dollars`}>${book.price.toFixed(2)}</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                className="btn btn-ghost"
                aria-label={inWishlist ? `Remove ${book.title} from wishlist` : `Add ${book.title} to wishlist`}
                aria-pressed={inWishlist}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch({ type: 'TOGGLE_WISHLIST', payload: book.id });
                  showToast(inWishlist ? 'Removed from Wishlist' : 'Added to Wishlist');
                }}
                title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <span aria-hidden="true">{inWishlist ? '💙' : '🤍'}</span>
              </button>
              <button
                className="btn btn-primary"
                aria-label={`Add ${book.title} to cart`}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch({ type: 'ADD_TO_CART', payload: book.id });
                  showToast('Added to Cart');
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
