import React from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function NotFound() {
  /** 404 Not Found screen with friendly message and CTA to go back Home. */
  return (
    <main
      id="main-content"
      className="container"
      role="main"
      aria-labelledby="not-found-heading"
      style={{ paddingTop: 24 }}
    >
      <section
        className="card"
        style={{
          padding: 20,
          textAlign: 'center',
          background: 'linear-gradient(180deg, rgba(37,99,235,.06) 0%, #fff 14%)',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            margin: '0 auto 12px',
            background: 'linear-gradient(135deg, #2563EB, #60a5fa)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 14px 40px rgba(37,99,235,.28)',
            fontSize: 34,
            fontWeight: 800,
          }}
        >
          404
        </div>
        <h1
          id="not-found-heading"
          style={{ margin: '6px 0 6px', fontSize: 22, lineHeight: 1.2 }}
        >
          Page not found
        </h1>
        <p style={{ margin: 0, color: 'var(--muted)' }}>
          The page you are looking for doesn’t exist or was moved.
        </p>

        <div className="hr" />

        <div style={{ display: 'grid', gap: 10 }}>
          <Link
            to="/"
            className="btn btn-primary"
            aria-label="Go back to Home"
            style={{ fontWeight: 800 }}
          >
            Go Home
          </Link>
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
        </div>
      </section>

      <div className="bottom-safe" />
    </main>
  );
}
