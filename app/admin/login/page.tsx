"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { HelmetIcon, LockIcon, UserIcon, LoaderIcon } from '../../../components/Icons';

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Auto redirect if already logged in
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isLogged = localStorage.getItem('f1spa_admin_logged');
      if (isLogged === 'true') {
        router.push('/admin/dashboard');
      }
    }
  }, [router]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !password.trim()) {
      setErrorMsg('يرجى ملء جميع الحقول المطلوبة.');
      return;
    }

    setLoading(true);

    // Simulate login server delay for premium feel
    setTimeout(() => {
      if (email.trim() === 'admin@f1.com' && password.trim() === 'admin123') {
        if (typeof window !== 'undefined') {
          localStorage.setItem('f1spa_admin_logged', 'true');
        }
        router.push('/admin/dashboard');
      } else {
        setErrorMsg('البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى المحاولة مجدداً.');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative speed-stripes-light">

      {/* Glow elements */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full bg-racing-red/10 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-zinc-800/10 blur-[100px] pointer-events-none"></div>

      <div className="max-w-md w-full space-y-8 relative z-10">

        {/* Logo and Greeting */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center gap-3 justify-center group">
            <div className="bg-racing-red p-0.5 rounded-lg shadow-red-glow transition-transform group-hover:scale-110 duration-300 w-12 h-12 flex items-center justify-center overflow-hidden">
              <img 
                src="/logo.jpeg" 
                alt="F1 SPA Logo" 
                className="w-full h-full object-cover rounded-lg" 
              />
            </div>
            <div className="flex flex-col text-right">
              <span className="text-2xl font-black tracking-wider text-white italic">
                F1 <span className="text-racing-red font-black">SPA</span>
              </span>
              <span className="text-[10px] text-zinc-500 font-bold uppercase -mt-0.5">
                CAR WASH
              </span>
            </div>
          </Link>
          <h2 className="text-xl font-black text-white">تسجيل الدخول لبوابة الإدارة</h2>
          <p className="text-xs text-silver font-bold">
            قم بالولوج للوحة التحكم لمتابعة وتحديث طلبات الغسيل.
          </p>
        </div>

        {/* Login Form Card */}
        <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-8 shadow-red-glow/10">

          <form className="space-y-6" onSubmit={handleLoginSubmit}>

            {/* Error Message */}
            {errorMsg && (
              <div className="bg-red-950/30 border border-red-500/20 text-red-400 text-xs font-bold p-3.5 rounded-xl text-right">
                {errorMsg}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="admin-email" className="block text-xs font-bold text-silver mb-2 text-right">
                البريد الإلكتروني للقرصنة / الإدارة *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-zinc-500">
                  <UserIcon size={16} />
                </span>
                <input
                  id="admin-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@f1.com"
                  className="block w-full pr-10 pl-4 py-3 bg-zinc-900 border border-zinc-800 focus:border-racing-red focus:ring-4 focus:ring-racing-red/10 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none transition-all text-right"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="admin-password" className="block text-xs font-bold text-silver mb-2 text-right">
                كلمة المرور السرية *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-zinc-500">
                  <LockIcon size={16} />
                </span>
                <input
                  id="admin-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pr-10 pl-4 py-3 bg-zinc-900 border border-zinc-800 focus:border-racing-red focus:ring-4 focus:ring-racing-red/10 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none transition-all text-right"
                />
              </div>
            </div>

            {/* Login button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-racing-red hover:bg-deep-red text-white py-3.5 rounded-xl font-black text-sm shadow-red-glow hover:shadow-red-glow-lg transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <LoaderIcon size={18} className="text-white" />
                    <span>جاري التحقق الفائق...</span>
                  </>
                ) : (
                  <span>تسجيل الدخول</span>
                )}
              </button>
            </div>

          </form>

        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link
            href="/"
            className="text-xs text-zinc-500 hover:text-white transition-colors"
          >
            ← العودة للموقع الرئيسي للعملاء
          </Link>
        </div>

      </div>
    </main>
  );
}
