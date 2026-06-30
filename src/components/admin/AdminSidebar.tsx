"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { HelmetIcon, BarChartIcon, LogOutIcon, ArrowLeftIcon } from '@/components/ui/Icons';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('f1spa_admin_logged');
      router.push('/admin/login');
    }
  };

  const navLinks = [
    {
      name: 'لوحة التحكم',
      href: '/admin/dashboard',
      icon: <BarChartIcon size={20} />,
    },
  ];

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-6 left-6 z-50 bg-racing-red text-white p-4 rounded-full shadow-red-glow hover:shadow-red-glow-lg hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center border border-racing-red/30"
        aria-label="القائمة"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Backdrop overlay for mobile drawer */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/75 backdrop-blur-sm z-40 transition-opacity duration-300"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed lg:sticky top-0 right-0 h-screen w-64 bg-zinc-950 border-l border-zinc-900 flex flex-col justify-between z-40
        transition-transform duration-300 ease-in-out lg:translate-x-0 lg:flex-shrink-0
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-zinc-900">
            <Link href="/admin/dashboard" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
              <div className="bg-racing-red p-0.5 rounded-lg shadow-red-glow w-10 h-10 flex items-center justify-center overflow-hidden">
                <img 
                  src="/logo.jpeg" 
                  alt="F1 SPA Logo" 
                  className="w-full h-full object-cover rounded-lg" 
                />
              </div>
              <div className="flex flex-col text-right">
                <span className="text-lg font-black tracking-wider text-white italic">
                  F1 <span className="text-racing-red font-black">SPA</span>
                </span>
                <span className="text-[9px] text-zinc-500 font-bold uppercase -mt-0.5">
                  لوحة المدير
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Section */}
          <div className="px-4 py-6">
            <p className="text-[10px] text-zinc-600 font-black uppercase tracking-wider mb-4 text-right px-2">
              الرئيسية
            </p>
            <nav className="space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || pathname?.startsWith(link.href + '/');
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-black transition-colors ${
                      isActive
                        ? 'bg-racing-red text-white shadow-red-glow/20'
                        : 'text-silver hover:bg-zinc-900 hover:text-white'
                    }`}
                  >
                    <span className={isActive ? 'text-white' : 'text-racing-red'}>
                      {link.icon}
                    </span>
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Footer Controls */}
        <div className="p-4 border-t border-zinc-900 space-y-2">
          {/* Exit back to store */}
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold text-zinc-500 hover:text-white hover:bg-zinc-900 transition-colors"
          >
            <ArrowLeftIcon size={16} />
            <span>زيارة موقع العملاء</span>
          </Link>
          
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold text-red-500 hover:bg-red-950/20 hover:text-red-400 transition-colors border border-transparent hover:border-red-950/30 text-right"
          >
            <LogOutIcon size={16} />
            <span>تسجيل الخروج</span>
          </button>
        </div>

      </aside>
    </>
  );
}
