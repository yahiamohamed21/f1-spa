import React from 'react';
import { OrderStatus, STATUS_LABELS } from '../types';

interface StatusBadgeProps {
  status: OrderStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusStyles = (status: OrderStatus) => {
    switch (status) {
      case 'new':
        return 'bg-blue-950/40 text-blue-400 border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.1)]';
      case 'accepted':
        return 'bg-cyan-950/40 text-cyan-400 border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.1)]';
      case 'driver_on_the_way':
        return 'bg-purple-950/40 text-purple-400 border-purple-500/30 shadow-[0_0_10px_rgba(168,85,247,0.1)]';
      case 'car_received':
        return 'bg-amber-950/40 text-amber-400 border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.1)]';
      case 'cleaning_in_progress':
        return 'bg-pink-950/40 text-pink-400 border-pink-500/30 shadow-[0_0_10px_rgba(236,72,153,0.1)]';
      case 'ready_for_delivery':
        return 'bg-emerald-950/40 text-emerald-400 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.1)]';
      case 'delivered':
        return 'bg-green-950/40 text-green-400 border-green-500/30 shadow-[0_0_10px_rgba(34,197,94,0.1)]';
      case 'cancelled':
        return 'bg-red-950/40 text-red-400 border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.1)]';
      default:
        return 'bg-zinc-900 text-zinc-400 border-zinc-800';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-black border tracking-wide select-none ${getStatusStyles(
        status
      )}`}
    >
      {STATUS_LABELS[status] || status}
    </span>
  );
}
