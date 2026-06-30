import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ServiceCard from '@/components/booking/ServiceCard';
import { SERVICES } from '@/services/orderService';

export default function ServicesPage() {
  return (
    <>
      <Navbar />

      <main className="flex-grow bg-black py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-black text-racing-red uppercase tracking-wider block">قائمة الخدمات الاحترافية</span>
            <h1 className="text-3xl sm:text-5xl font-black text-white italic">اختر العناية المثالية لسيارتك</h1>
            <p className="text-sm sm:text-base text-silver leading-relaxed max-w-xl mx-auto">
              من الغسيل الخارجي السريع بالرغوة النفاثة وحتى التلميع الشمعي المتكامل وحماية الطلاء، نقدم باقات تنظيف مصممة بعناية فائقة.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          {/* Quick Note about customization */}
          <div className="bg-zinc-950/40 border border-zinc-900 rounded-2xl p-6 text-center max-w-2xl mx-auto">
            <h3 className="text-base font-black text-white mb-2">هل تبحث عن خدمة مخصصة بالكامل؟</h3>
            <p className="text-xs text-silver leading-relaxed">
              إذا كانت لديك متطلبات خاصة لتنظيف أسطول سيارات أو غسيل محركات رياضية نادرة، يرجى الاتصال بنا مباشرة على <a href="tel:920012345" className="text-racing-red font-black">9200 12345</a> لتنسيق باقة مخصصة مع الخبراء.
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
