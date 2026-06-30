import React from 'react';
import { CarIcon } from '@/components/ui/Icons';

interface EmptyStateProps {
  title: string;
  message: string;
  actionButton?: React.ReactNode;
}

export default function EmptyState({ title, message, actionButton }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 md:p-16 bg-zinc-950/40 border border-zinc-900/80 rounded-2xl">
      <div className="bg-zinc-900/60 p-5 rounded-full border border-zinc-800/80 mb-4 shadow-[0_0_15px_rgba(255,255,255,0.02)] text-zinc-700">
        <CarIcon size={48} className="transform -scale-x-100 text-zinc-600" />
      </div>
      <h3 className="text-lg font-black text-white mb-2">{title}</h3>
      <p className="text-sm text-silver max-w-sm mb-6 leading-relaxed">{message}</p>
      {actionButton && <div className="mt-2">{actionButton}</div>}
    </div>
  );
}
