import React, { useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';

const categories = ['All', 'Fiction', 'Non-Fiction', 'Kids', 'Self-Help'];

// PUBLIC_INTERFACE
export default function Home() {
  /** Home screen: search, categories, recommended carousel, and filtered list. */
  const { state, dispatch, filtered, recommended } = useStore();

  const recRows = useMemo(() => recommended.slice(0, 12), [recommended]);

  return (
    <main id="main-content" className="container" role="main" aria-labelledby="home-heading">
      <div style={{ padding: '8px 2px 14px' }}>
        <h1 id="home-heading" style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>
          <span style={{ color: 'var(--primary)' }}>Book</span>Nest
        </h1>
        <p style={{ margin: '6px 0 0', color: 'var(--muted)' }}>Find your next great read</p>
      </div>

      <SearchBar
        value={state.search}
        onChange={(v) => dispatch({ type: 'SET_SEARCH', payload: v })}
      />

      <ul style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '12px 2px', listStyle: 'none', margin: 0 }} aria-label="Categories" role="list">
        {categories.map((c) => {
          const active = state.category === c;
          return (
            <li key={c} role="listitem">
              <button
                className="btn"
                aria-pressed={active}
                aria-label={active ? `${c} category selected` : `Select ${c} category`}
                onClick={() => dispatch({ type: 'SET_CATEGORY', payload: c })}
                style={{
                  padding: '8px 12px',
                  borderRadius: 999,
                  background: active ? 'var(--primary)' : 'rgba(37,99,235,.08)',
                  color: active ? '#fff' : '#1e40af',
                  boxShadow: active ? '0 8px 24px rgba(37,99,235,.18)' : 'none',
                  border: '1px solid rgba(37,99,235,.18)'
                }}
              >
                {c}
              </button>
            </li>
          );
        })}
      </ul>

      <section style={{ marginTop: 8 }} aria-labelledby="recommended-heading">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '6px 4px 10px' }}>
          <h2 id="recommended-heading" style={{ margin: 0, fontSize: 18 }}>Recommended for You</h2>
        </div>
        <ul
          style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8, listStyle: 'none', margin: 0, paddingLeft: 0 }}
          role="list"
          aria-label="Recommended books"
        >
          {recRows.map((b) => (
            <li key={b.id} className="card" style={{ minWidth: 160, padding: 10 }} role="listitem" aria-label={`${b.title} by ${b.author}`}>
              <div style={{ width: '100%', height: 160, borderRadius: 12, overflow: 'hidden', background: '#eef2ff' }}>
                <img src={b.cover} alt={`${b.title} book cover by ${b.author}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ marginTop: 8 }}>
                <div style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.1 }}>{b.title}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{b.author}</div>
                <div className="price" style={{ marginTop: 6 }}>${b.price.toFixed(2)}</div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: 14 }} aria-labelledby="browse-heading">
        <h2 id="browse-heading" style={{ margin: '0 4px 10px', fontSize: 18 }}>Browse</h2>
        <div style={{ display: 'grid', gap: 12 }} role="list" aria-label="Browse books">
          {filtered.map((b) => (
            <BookCard key={b.id} book={b} />
          ))}
        </div>
      </section>

      <div className="bottom-safe" />
    </main>
  );
}
