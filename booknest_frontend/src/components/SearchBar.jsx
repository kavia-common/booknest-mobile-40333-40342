import React from 'react';

// PUBLIC_INTERFACE
export default function SearchBar({ value, onChange, placeholder = 'Search books, authors, genres...' }) {
  /** Search input with subtle shadow and large touch target. */
  return (
    <div className="card" style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
      <span role="img" aria-label="search" style={{ fontSize: 18, color: 'var(--muted)' }}>🔎</span>
      <input
        className="input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search"
        style={{ border: 'none', boxShadow: 'none', padding: 0 }}
      />
    </div>
  );
}
