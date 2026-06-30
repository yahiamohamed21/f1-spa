import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ServiceCard from '@/components/booking/ServiceCard';
import { SERVICES } from '@/services/orderService';
import {
  SparklesIcon,
  DropletIcon,
  ShieldIcon,
  ClockIcon,
  MapPinIcon,
  HelmetIcon
} from '@/components/ui/Icons';

export default function Home() {
  // Show only top 3 services on the landing page preview
  const featuredServices = SERVICES.slice(0, 3);

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-black">
        {/* 1. Hero Section */}
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-20 px-4">
          {/* Background image & gradient overlay */}
          <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 speed-stripes-light"></div>
          
          {/* Neon Red/Silver decorative glow circles */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-racing-red/10 blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-zinc-800/20 blur-[120px] pointer-events-none"></div>

          <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
            {/* Custom text-based logo badge */}
            <div className="inline-flex items-center gap-2 bg-racing-red/10 border border-racing-red/30 px-4 py-2 rounded-full text-racing-red text-xs font-black uppercase tracking-widest mx-auto animate-pulse">
              <HelmetIcon size={14} className="transform -scale-x-100" />
              <span>نظافة رياضية فائقة السرعة</span>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-7xl font-black text-white italic tracking-tight leading-tight">
                F1 <span className="text-racing-red">لغسيل السيارات</span>
              </h1>
              <p className="text-lg sm:text-2xl text-silver font-bold max-w-2xl mx-auto leading-relaxed">
                اطلب خدمة تنظيف سيارتك من مكانك بسهولة وسرعة. نوفر لك خدمة الاستلام والتسليم الفاخرة للسيارات الفارهة .
              </p>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/booking"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 font-black text-lg text-white bg-racing-red hover:bg-deep-red rounded-xl group shadow-red-glow hover:shadow-red-glow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>اطلب الخدمة الآن</span>
                <span className="mr-2 group-hover:translate-x-[-4px] transition-transform font-bold">←</span>
              </Link>
              <Link
                href="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 font-black text-lg text-white bg-zinc-900 hover:bg-zinc-800 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all duration-300"
              >
                استعرض الخدمات
              </Link>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 max-w-4xl mx-auto text-right">
              <div className="bg-zinc-950/40 border border-zinc-900 p-4 rounded-xl flex items-center gap-3">
                <ClockIcon size={24} className="text-racing-red flex-shrink-0" />
                <div>
                  <span className="text-xs text-zinc-500 font-bold block">الوقت</span>
                  <span className="text-xs font-black text-white">غسيل خلال 30 دقيقة</span>
                </div>
              </div>
              <div className="bg-zinc-950/40 border border-zinc-900 p-4 rounded-xl flex items-center gap-3">
                <MapPinIcon size={24} className="text-racing-red flex-shrink-0" />
                <div>
                  <span className="text-xs text-zinc-500 font-bold block">الموقع</span>
                  <span className="text-xs font-black text-white">نصل إلى باب بيتك</span>
                </div>
              </div>
              <div className="bg-zinc-950/40 border border-zinc-900 p-4 rounded-xl flex items-center gap-3">
                <DropletIcon size={24} className="text-racing-red flex-shrink-0" />
                <div>
                  <span className="text-xs text-zinc-500 font-bold block">الجودة</span>
                  <span className="text-xs font-black text-white">رغوة نفاثة ومواد نانو</span>
                </div>
              </div>
              <div className="bg-zinc-950/40 border border-zinc-900 p-4 rounded-xl flex items-center gap-3">
                <ShieldIcon size={24} className="text-racing-red flex-shrink-0" />
                <div>
                  <span className="text-xs text-zinc-500 font-bold block">الأمان</span>
                  <span className="text-xs font-black text-white">مؤمن بالكامل بالاستلام</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 2. Services Preview Section */}
        <section className="py-24 border-t border-zinc-950 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 text-right">
            <div>
              <span className="text-xs font-black text-racing-red uppercase tracking-wider block mb-2">مستوى جديد من النظافة</span>
              <h2 className="text-3xl sm:text-4xl font-black text-white italic">خدماتنا المتميزة</h2>
            </div>
            <Link
              href="/services"
              className="text-sm font-black text-racing-red hover:text-white transition-colors mt-4 md:mt-0 flex items-center gap-1"
            >
              <span>مشاهدة جميع الخدمات الـ 6</span>
              <span>←</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>

        {/* 3. Why Choose Us Section */}
        <section className="py-24 bg-zinc-950/40 border-t border-b border-zinc-900 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-right">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="text-xs font-black text-racing-red uppercase tracking-wider block">لماذا تختار F1 SPA؟</span>
              <h2 className="text-3xl sm:text-4xl font-black text-white italic">معايير حلبات السباق في العناية بسيارتك</h2>
              <p className="text-sm sm:text-base text-silver max-w-xl mx-auto leading-relaxed">
                نحن لا نقوم بمجرد تنظيف عادٍ، بل نمنح سيارتك معاملة تليق بسيارات السباقات الفاخرة باستخدام أفضل المواد وأسرع الأوقات.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="bg-black border border-zinc-900 rounded-2xl p-8 hover:border-racing-red/30 transition-all flex flex-col justify-between">
                <div className="bg-zinc-900 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                  <SparklesIcon size={28} className="text-racing-red" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white mb-3">سرعة ودقة متناهية</h3>
                  <p className="text-sm text-silver leading-relaxed">
                    فريقنا مدرب على سرعة استجابة مذهلة. تماماً مثل توقف صيانة السباقات (Pit Stop)، ننتهي من غسيل سيارتك بجودة مبهرة وفي زمن قياسي.
                  </p>
                </div>
              </div>

              <div className="bg-black border border-zinc-900 rounded-2xl p-8 hover:border-racing-red/30 transition-all flex flex-col justify-between">
                <div className="bg-zinc-900 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                  <ShieldIcon size={28} className="text-racing-red" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white mb-3">مواد غسيل نانو متطورة</h3>
                  <p className="text-sm text-silver leading-relaxed">
                    نستخدم شامبو رغوي متعادل الحموضة ومواد نانو لحماية الطلاء وتلميع التابلوه بمواد تعزل الغبار والأشعة فوق البنفسجية لفترة أطول.
                  </p>
                </div>
              </div>

              <div className="bg-black border border-zinc-900 rounded-2xl p-8 hover:border-racing-red/30 transition-all flex flex-col justify-between">
                <div className="bg-zinc-900 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                  <MapPinIcon size={28} className="text-racing-red" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white mb-3">استلام وتوصيل مجاني ومؤمن</h3>
                  <p className="text-sm text-silver leading-relaxed">
                    لا تضيع وقتك بالانتظار في المغسلة. مندوبنا يستلم سيارتك من منزلك أو عملك وينظفها، ثم يعيدها لك نظيفة ومعقمة بشكل كامل.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 4. How It Works Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-right">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black text-racing-red uppercase tracking-wider block">آلية العمل</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white italic">خطوات الحجز والاستلام</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            
            {/* Step 1 */}
            <div className="text-center relative">
              <div className="w-16 h-16 bg-racing-red text-white font-black text-2xl rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-red-glow">
                ١
              </div>
              <h3 className="text-lg font-black text-white mb-2">حجز الخدمة إلكترونياً</h3>
              <p className="text-xs text-silver max-w-xs mx-auto leading-relaxed">
                اختر نوع التنظيف المناسب لك من قائمة الخدمات، وعيّن موعدك واليوم وعنوانك المفضل في أقل من دقيقة.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center relative">
              <div className="w-16 h-16 bg-zinc-900 text-white border border-zinc-800 font-black text-2xl rounded-2xl flex items-center justify-center mx-auto mb-6">
                ٢
              </div>
              <h3 className="text-lg font-black text-white mb-2">الاستلام والغسيل الفائق</h3>
              <p className="text-xs text-silver max-w-xs mx-auto leading-relaxed">
                يصل مندوبنا للموقع في الموعد المحدد لاستلام سيارتك أو غسيلها في مكانك بجودة تعيد لمعان الوكالة.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center relative">
              <div className="w-16 h-16 bg-zinc-900 text-white border border-zinc-800 font-black text-2xl rounded-2xl flex items-center justify-center mx-auto mb-6">
                ٣
              </div>
              <h3 className="text-lg font-black text-white mb-2">التسليم والتتبع الفوري</h3>
              <p className="text-xs text-silver max-w-xs mx-auto leading-relaxed">
                تابع حالة طلبك لحظة بلحظة عبر موقعنا حتى عودة سيارتك إليك ببريق رياضي مميز.
              </p>
            </div>

          </div>
        </section>

        {/* 5. Customer Trust Section (Metrics & Numbers) */}
        <section className="py-20 bg-gradient-to-t from-zinc-950 to-black border-t border-zinc-900 text-center px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <h2 className="text-2xl sm:text-3xl font-black text-white italic">
              ثقة مطلقة من ملاك السيارات الفاخرة بالمملكة
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="space-y-1">
                <span className="text-4xl sm:text-5xl font-black text-racing-red italic block">+١٢,٠٠٠</span>
                <span className="text-xs text-zinc-500 font-bold">سيارة تم تنظيفها</span>
              </div>
              <div className="space-y-1">
                <span className="text-4xl sm:text-5xl font-black text-white italic block">%٩٩.٤</span>
                <span className="text-xs text-zinc-500 font-bold">نسبة رضا العملاء</span>
              </div>
              <div className="space-y-1">
                <span className="text-4xl sm:text-5xl font-black text-white italic block">+٤٥</span>
                <span className="text-xs text-zinc-500 font-bold">فني غسيل محترف</span>
              </div>
              <div className="space-y-1">
                <span className="text-4xl sm:text-5xl font-black text-racing-red italic block">٢٤/٧</span>
                <span className="text-xs text-zinc-500 font-bold">جاهزية خدمة الدعم</span>
              </div>
            </div>

            {/* Quick CTA to book */}
            <div className="pt-6">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center px-10 py-4 font-black text-lg text-white bg-racing-red hover:bg-deep-red rounded-xl shadow-red-glow hover:shadow-red-glow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                اطلب الخدمة لسيارتك الآن
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
