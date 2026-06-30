"use client";

import React, { useEffect, useState } from 'react';
import { UserIcon } from '@/components/ui/Icons';

interface AdminHeaderProps {
  title: string;
}

export default function AdminHeader({ title }: AdminHeaderProps) {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const formatted = new Date().toLocaleDateString('ar-EG', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setCurrentDate(formatted);
  }, []);

  return (
    <header className="bg-zinc-950 border-b border-zinc-900 py-5 px-8 flex items-center justify-between">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl font-black text-white italic">{title}</h1>
        {currentDate && (
          <p className="text-xs text-zinc-500 font-bold mt-1">{currentDate}</p>
        )}
      </div>

      {/* Admin Profile indicator */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col text-right">
          <span className="text-xs font-black text-white">المدير المسؤول</span>
          <span className="text-[10px] text-racing-red font-bold">نشط الآن</span>
        </div>
        <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center text-silver shadow-sm">
          <UserIcon size={18} className="text-racing-red" />
        </div>
      </div>

    </header>
  );
}
