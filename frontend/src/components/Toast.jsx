import React from 'react';
import { Sparkles, Info } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Toast() {
  const { toast } = useCart();

  if (!toast) return null;

  return (
    <div className="toast-container" id="toast-notification-banner">
      <div className="toast-pill">
        {toast.type === 'info' ? <Info size={16} /> : <Sparkles size={16} />}
        <span>{toast.message}</span>
      </div>
    </div>
  );
}
