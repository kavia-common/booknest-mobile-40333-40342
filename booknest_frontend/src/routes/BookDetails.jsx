import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { useToast } from '../components/Toast';

// PUBLIC_INTERFACE
export default function BookDetails() {
  /** Book Details page: cover, title, author, price, rating, description, Add to Cart, Wishlist. */
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useStore();
  const { showToast } = useToast();

  const book = useMemo(
    () => state.books.find(b => String(b.id) === String(id)),
    [state.books, id]
  );

  if (!book) {
    return (
      <div className="container">
        <p>Book not found.</p>
      </div>
    );
  }

  const inWishlist = !!state.wishlist[String(book.id)];

  return (
    <main id="main-content" role="main" aria-labelledby="book-details-heading">
      <div style={{
        position: 'relative',
        height: 260,
        background: 'linear-gradient(180deg, rgba(37,99,235,.14), rgba(249,250,251,1))'
      }}>
        <button
          onClick={() => navigate(-1)}
          aria-label="Back"
          className="btn"
          style={{ position: 'absolute', top: 16, left: 16, background: '#fff' }}
        >
          ← Back
        </button>
        <div style={{
          position: 'absolute',
          left: '50%',
          bottom: -60,
          transform: 'translateX(-50%)',
          width: 180,
          height: 240,
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 22px 40px rgba(17,24,39,.22)',
          background: '#eef2ff'
        }}>
          <img src={book.cover} alt={`${book.title} book cover by ${book.author}`} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>

      <div className="container" style={{ marginTop: 70 }}>
        <div className="badge" style={{ marginBottom: 8 }}>{book.category}</div>
        <h1 id="book-details-heading" style={{ margin: '4px 0 6px', fontSize: 22 }}>{book.title}</h1>
        <p style={{ margin: 0, color: 'var(--muted)' }}>by {book.author}</p>
        <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>⭐ {book.rating.toFixed(1)}</span>
          <span style={{ color: 'var(--muted)' }}>·</span>
          <span style={{ color: 'var(--muted)' }}>{book.genre}</span>
        </div>

        <div className="hr" />

        <p style={{ lineHeight: 1.6 }}>{book.description}</p>

        <div className="hr" />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="price" style={{ fontSize: 22 }}>${book.price.toFixed(2)}</div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              className="btn"
              onClick={() => {
                dispatch({ type: 'TOGGLE_WISHLIST', payload: book.id });
                showToast(inWishlist ? 'Removed from Wishlist' : 'Added to Wishlist');
              }}
              aria-label={inWishlist ? `Remove ${book.title} from wishlist` : `Add ${book.title} to wishlist`}
              aria-pressed={inWishlist}
              style={{ background: '#fff', border: '1px solid rgba(17,24,39,.08)' }}
            >
              <span aria-hidden="true">{inWishlist ? '💙' : '🤍'}</span> Wishlist
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                dispatch({ type: 'ADD_TO_CART', payload: book.id });
                showToast('Added to Cart');
              }}
              aria-label="Add to cart"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>

      <div className="bottom-safe" />
    </main>
  );
}
