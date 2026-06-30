"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HelmetIcon } from './Icons';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Do not render Navbar on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const navLinks = [
    { name: 'الرئيسية', href: '/' },
    { name: 'خدماتنا', href: '/services' },
    { name: 'تتبع الطلب', href: '/track' },
    { name: 'لوحة التحكم', href: '/admin/dashboard' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-racing-red/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="bg-racing-red p-0.5 rounded-lg shadow-red-glow transition-transform group-hover:scale-110 duration-300 w-12 h-12 flex items-center justify-center overflow-hidden">
                <img 
                  src="/logo.jpeg" 
                  alt="F1 SPA Logo" 
                  className="w-full h-full object-cover rounded-lg" 
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-wider text-white italic">
                  F1 <span className="text-racing-red">SPA</span>
                </span>
                <span className="text-[10px] text-silver tracking-widest -mt-1 font-semibold uppercase">
                  CAR WASH
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-base font-bold transition-colors duration-200 py-2 ${
                    isActive ? 'text-white' : 'text-silver hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 right-0 left-0 h-[3px] bg-gradient-to-l from-racing-red to-deep-red rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Action CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/booking"
              className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-black text-white bg-racing-red rounded-lg group shadow-red-glow hover:shadow-red-glow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
              <span className="relative">اطلب الخدمة الآن</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-silver hover:text-white hover:bg-zinc-900 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">فتح القائمة</span>
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden bg-zinc-950/95 border-b border-racing-red/20 transition-all duration-300 ease-in-out" id="mobile-menu">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 text-right">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-3 rounded-md text-base font-black transition-colors ${
                    isActive
                      ? 'bg-racing-red/10 text-white border-r-4 border-racing-red'
                      : 'text-silver hover:bg-zinc-900 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-4 px-3">
              <Link
                href="/booking"
                onClick={() => setIsOpen(false)}
                className="w-full inline-flex items-center justify-center px-4 py-3 font-black text-white bg-racing-red rounded-lg shadow-red-glow"
              >
                اطلب الخدمة الآن
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
