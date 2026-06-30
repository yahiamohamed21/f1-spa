"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import OrderDetailsPanel from '@/components/admin/OrderDetailsPanel';
import OrderTimeline from '@/components/admin/OrderTimeline';
import EmptyState from '@/components/ui/EmptyState';
import { getOrderById } from '@/services/orderService';
import { Order } from '@/types';
import { SearchIcon, LoaderIcon } from '@/components/ui/Icons';

function TrackPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [searchCode, setSearchCode] = useState('');
  const [searched, setSearched] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Read URL search param 'code' on load
  useEffect(() => {
    if (searchParams) {
      const code = searchParams.get('code') || searchParams.get('id');
      if (code) {
        setSearchCode(code);
        handleSearch(code);
      }
    }
  }, [searchParams]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCode.trim()) return;
    
    // Update URL query parameter without full reload
    router.push(`/track?code=${searchCode.trim().toUpperCase()}`);
    handleSearch(searchCode.trim());
  };

  const handleSearch = (code: string) => {
    setLoading(true);
    setErrorMsg('');
    setOrder(null);
    setSearched(true);

    // Simulate small latency for better UI feel
    setTimeout(() => {
      const foundOrder = getOrderById(code.toUpperCase());
      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        setErrorMsg('عذراً، لم نتمكن من العثور على أي طلب مسجل برقم التتبع المدخل. يرجى التحقق من الرقم والمحاولة مرة أخرى.');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="space-y-12">
      {/* Search Block Box */}
      <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-6 lg:p-8 max-w-2xl mx-auto shadow-md">
        <form onSubmit={handleSearchSubmit} className="space-y-4">
          <label htmlFor="trackCode" className="block text-sm font-black text-white text-right mb-1">
            أدخل رقم التتبع (مثال: F1-2491) *
          </label>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-zinc-500">
                <SearchIcon size={18} />
              </span>
              <input
                type="text"
                id="trackCode"
                placeholder="F1-XXXX"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                className="block w-full pr-10 pl-4 py-3.5 bg-zinc-900 border border-zinc-800 focus:border-racing-red focus:ring-4 focus:ring-racing-red/20 rounded-xl text-lg font-black tracking-widest text-white italic uppercase placeholder-zinc-600 focus:outline-none transition-all text-right"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="bg-racing-red hover:bg-deep-red text-white font-black text-sm px-8 py-3.5 rounded-xl transition-all shadow-red-glow hover:shadow-red-glow-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <LoaderIcon size={18} className="text-white" />
              ) : (
                <span>بحث وتتبع</span>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Results Display */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <LoaderIcon size={40} className="text-racing-red mb-3" />
          <p className="text-sm font-bold text-silver animate-pulse">جاري الاستعلام عن بيانات طلبك...</p>
        </div>
      ) : order ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Order Info (Left Column taking 2/3 space) */}
          <div className="lg:col-span-2">
            <OrderDetailsPanel order={order} />
          </div>

          {/* Timeline Process (Right Column taking 1/3 space) */}
          <div>
            <OrderTimeline currentStatus={order.status} updatedAt={order.updatedAt} />
          </div>
        </div>
      ) : searched ? (
        <div className="max-w-xl mx-auto">
          <EmptyState
            title="الطلب غير موجود"
            message={errorMsg || 'يرجى التأكد من كتابة رقم التتبع بشكل صحيح، على سبيل المثال: F1-1234'}
          />
        </div>
      ) : (
        <div className="max-w-xl mx-auto">
          <EmptyState
            title="ابدأ التتبع الآن"
            message="أدخل رقم الطلب المرفق في رسالة التأكيد أو الذي تم إنشاؤه بعد إتمام عملية الحجز مباشرة لمتابعة حالة الغسيل والتسليم."
          />
        </div>
      )}
    </div>
  );
}

export default function TrackPage() {
  return (
    <>
      <Navbar />

      <main className="flex-grow bg-black py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <span className="text-xs font-black text-racing-red uppercase tracking-wider block">تحديثات فورية لسيارتك</span>
            <h1 className="text-3xl sm:text-5xl font-black text-white italic">نظام تتبع حالة الغسيل</h1>
            <p className="text-sm sm:text-base text-silver leading-relaxed max-w-lg mx-auto">
              أدخل كود تتبع الحجز الخاص بك لمتابعة فريق المغسلة والمندوب خطوة بخطوة من الاستلام إلى التلميع والتسليم.
            </p>
          </div>

          {/* Search and Results */}
          <Suspense fallback={
            <div className="flex flex-col items-center justify-center py-20">
              <LoaderIcon size={40} className="text-racing-red mb-3" />
              <p className="text-sm font-bold text-silver">جاري تهيئة لوحة التتبع...</p>
            </div>
          }>
            <TrackPageInner />
          </Suspense>

        </div>
      </main>

      <Footer />
    </>
  );
}
