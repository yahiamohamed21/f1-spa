import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BookingForm from '@/components/booking/BookingForm';

export default function BookingPage() {
  return (
    <>
      <Navbar />

      <main className="flex-grow bg-black py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <span className="text-xs font-black text-racing-red uppercase tracking-wider block">احجز موعدك الآن</span>
            <h1 className="text-3xl sm:text-5xl font-black text-white italic">حجز موعد غسيل سيارة سريع</h1>
            <p className="text-sm sm:text-base text-silver leading-relaxed max-w-lg mx-auto">
              املأ استمارة الحجز أدناه بالبيانات المطلوبة، وسيقوم فنيونا واستشاريو الحركة بجدولة موعدك فوراً.
            </p>
          </div>

          {/* Form Wrapper */}
          <div className="relative">
            {/* Sporty glowing accent borders behind form */}
            <div className="absolute -inset-1 bg-gradient-to-r from-racing-red/10 to-transparent rounded-3xl blur opacity-30 pointer-events-none" />
            <div className="relative">
              <BookingForm />
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
