import React, { createContext, useContext, useMemo, useReducer } from 'react';
import booksData from '../data/books.json';

/**
 * Store context with reducers for cart, wishlist, search query, selected category, and orders.
 */

// State shape
const initialState = {
  books: booksData,
  cart: {}, // { [bookId]: quantity }
  wishlist: {}, // { [bookId]: true }
  search: '',
  category: 'All',
  orders: []
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_SEARCH':
      return { ...state, search: action.payload };
    case 'SET_CATEGORY':
      return { ...state, category: action.payload };
    case 'ADD_TO_CART': {
      const id = String(action.payload);
      const qty = state.cart[id] || 0;
      return { ...state, cart: { ...state.cart, [id]: qty + 1 } };
    }
    case 'REMOVE_FROM_CART': {
      const id = String(action.payload);
      const next = { ...state.cart };
      delete next[id];
      return { ...state, cart: next };
    }
    case 'SET_QTY': {
      const { id, qty } = action.payload;
      const next = { ...state.cart };
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return { ...state, cart: next };
    }
    case 'TOGGLE_WISHLIST': {
      const id = String(action.payload);
      const inList = !!state.wishlist[id];
      const next = { ...state.wishlist };
      if (inList) delete next[id];
      else next[id] = true;
      return { ...state, wishlist: next };
    }
    case 'CHECKOUT': {
      const items = Object.entries(state.cart).map(([id, qty]) => {
        const book = state.books.find(b => String(b.id) === String(id));
        return {
          id,
          qty,
          title: book?.title || '',
          price: book?.price || 0,
          cover: book?.cover || ''
        };
      });
      const total = items.reduce((sum, it) => sum + it.price * it.qty, 0);
      const order = {
        id: 'ORD-' + Math.random().toString(36).slice(2, 8).toUpperCase(),
        date: new Date().toISOString(),
        items,
        total
      };
      return { ...state, cart: {}, orders: [order, ...state.orders] };
    }
    default:
      return state;
  }
}

const StoreContext = createContext(null);

// PUBLIC_INTERFACE
export function StoreProvider({ children }) {
  /** Provides global store to the app using React Context. */
  const [state, dispatch] = useReducer(reducer, initialState);

  const selectors = useMemo(() => {
    const filtered = state.books.filter(b => {
      const matchesSearch =
        !state.search ||
        [b.title, b.author, b.genre].some((t) =>
          (t || '').toLowerCase().includes(state.search.toLowerCase())
        );
      const matchesCategory =
        state.category === 'All' || b.category === state.category;
      return matchesSearch && matchesCategory;
    });

    const cartItems = Object.entries(state.cart).map(([id, qty]) => {
      const book = state.books.find(b => String(b.id) === String(id));
      if (!book) return null;
      return { ...book, qty };
    }).filter(Boolean);

    const cartTotal = cartItems.reduce((sum, b) => sum + b.price * b.qty, 0);

    const recommended = state.books.slice(0, 10); // simple sample

    const wishlistItems = state.books.filter(b => state.wishlist[String(b.id)]);

    return { filtered, cartItems, cartTotal, recommended, wishlistItems };
  }, [state]);

  const value = useMemo(() => ({ state, dispatch, ...selectors }), [state, selectors]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

// PUBLIC_INTERFACE
export function useStore() {
  /** Hook to access store values and dispatch. */
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
