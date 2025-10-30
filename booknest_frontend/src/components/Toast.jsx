import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

/**
 * Toast system with a minimal context and an aria-live="polite" region.
 * Ocean Professional styling and auto-dismiss behavior included.
 */

const ToastContext = createContext(null);

// PUBLIC_INTERFACE
export function ToastProvider({ children }) {
  /** Provides toast API (showToast) and renders ToastContainer with aria-live region. */
  const [toasts, setToasts] = useState([]); // { id, message }
  const idRef = useRef(0);
  const liveRef = useRef(null);

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message, opts = {}) => {
    // Ack opts reserved for future (type, duration)
    const id = ++idRef.current;
    setToasts((prev) => [...prev, { id, message }]);

    // Update aria-live region text so screen readers announce it
    if (liveRef.current) {
      liveRef.current.textContent = message;
    }

    // Auto-dismiss after 2500ms
    const duration = typeof opts.duration === 'number' ? opts.duration : 2500;
    const timer = setTimeout(() => remove(id), duration);
    return () => clearTimeout(timer);
  }, [remove]);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* Visually hidden live region for SR announcements (polite) */}
      <div
        ref={liveRef}
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          margin: -1,
          padding: 0,
          overflow: 'hidden',
          clip: 'rect(0 0 0 0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      />
      <ToastContainer toasts={toasts} onClose={remove} />
    </ToastContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useToast() {
  /** Hook to access toast API. */
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

function ToastContainer({ toasts, onClose }) {
  // Container at bottom center above BottomNav
  return (
    <div
      aria-live="off"
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 96, // slightly above bottom nav
        display: 'grid',
        gap: 8,
        placeItems: 'center',
        pointerEvents: 'none',
        zIndex: 60,
      }}
    >
      {toasts.map((t) => (
        <ToastItem key={t.id} id={t.id} message={t.message} onClose={onClose} />
      ))}
    </div>
  );
}

function ToastItem({ id, message, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // fade-out a bit before removal by container timeout; also supports manual close if needed
    const timer = setTimeout(() => setVisible(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      role="status"
      aria-live="off"
      className="card"
      style={{
        pointerEvents: 'auto',
        padding: '10px 14px',
        borderRadius: 12,
        background: 'linear-gradient(135deg, #2563EB, #3b82f6)',
        color: '#fff',
        boxShadow: '0 12px 28px rgba(37,99,235,.28)',
        border: '1px solid rgba(255,255,255,.12)',
        transform: `translateY(${visible ? 0 : 6}px)`,
        opacity: visible ? 1 : 0,
        transition: 'opacity .24s ease, transform .24s ease',
        maxWidth: '92%',
      }}
      onClick={() => {
        setVisible(false);
        setTimeout(() => onClose(id), 180);
      }}
    >
      <span style={{ fontWeight: 700, marginRight: 8 }}>✓</span>
      <span style={{ fontWeight: 600 }}>{message}</span>
    </div>
  );
}
