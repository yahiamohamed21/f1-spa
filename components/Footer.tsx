"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HelmetIcon, PhoneIcon, MapPinIcon, ClockIcon } from './Icons';

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4 text-right">
            <Link href="/" className="flex items-center gap-3">
              <div className="bg-racing-red p-0.5 rounded-lg shadow-red-glow w-10 h-10 flex items-center justify-center overflow-hidden">
                <img 
                  src="/logo.jpeg" 
                  alt="F1 SPA Logo" 
                  className="w-full h-full object-cover rounded-lg" 
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-wider text-white italic">
                  F1 <span className="text-racing-red">SPA</span>
                </span>
                <span className="text-[9px] text-silver tracking-widest -mt-1 font-semibold uppercase">
                  CAR WASH
                </span>
              </div>
            </Link>
            <p className="text-sm text-silver leading-relaxed">
              اف وان سبا لغسيل السيارات الفاخرة. نقدم تجربة تنظيف رياضية فريدة لسيارتك من موقعك مباشرة مع خدمة الاستلام والتوصيل المجاني.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-right">
            <h3 className="text-white font-black text-lg mb-4 border-r-4 border-racing-red pr-3">
              روابط سريعة
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="text-sm text-silver hover:text-white transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-silver hover:text-white transition-colors">
                  خدماتنا
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-sm text-silver hover:text-white transition-colors">
                  احجز موعداً
                </Link>
              </li>
              <li>
                <Link href="/track" className="text-sm text-silver hover:text-white transition-colors">
                  تتبع طلبك
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="text-xs text-zinc-600 hover:text-racing-red transition-colors">
                  بوابة المدير
                </Link>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div className="text-right">
            <h3 className="text-white font-black text-lg mb-4 border-r-4 border-racing-red pr-3">
              أوقات العمل
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center justify-start gap-2 text-sm text-silver">
                <ClockIcon size={16} className="text-racing-red" />
                <span>السبت - الخميس: 9:00 ص - 10:00 م</span>
              </li>
              <li className="flex items-center justify-start gap-2 text-sm text-silver">
                <ClockIcon size={16} className="text-racing-red" />
                <span>الجمعة: 2:00 م - 10:00 م</span>
              </li>
              <li className="text-xs text-zinc-500 mt-2 leading-relaxed">
                * نقدم خدماتنا المتنقلة وخدمة التوصيل على مدار الساعة لعملاء الفئة الذهبية.
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="text-right">
            <h3 className="text-white font-black text-lg mb-4 border-r-4 border-racing-red pr-3">
              اتصل بنا
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center justify-start gap-2 text-sm text-silver">
                <PhoneIcon size={16} className="text-racing-red" />
                <a href="tel:920000000" className="hover:text-white transition-colors dir-ltr">
                  9200 12345
                </a>
              </li>
              <li className="flex items-center justify-start gap-2 text-sm text-silver">
                <MapPinIcon size={16} className="text-racing-red" />
                <span>الرياض، المملكة العربية السعودية</span>
              </li>
              <li className="text-xs text-zinc-500 mt-2">
                البريد الإلكتروني: support@f1spa.com
              </li>
            </ul>
          </div>

        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-zinc-500">
            &copy; {new Date().getFullYear()} إف وان سبا (F1 SPA). جميع الحقوق محفوظة.
          </div>
          <div className="flex items-center gap-4 text-xs text-zinc-600">
            <span>تم التطوير بكل فخر للمحركات الفاخرة</span>
            <span className="w-1.5 h-1.5 rounded-full bg-racing-red"></span>
            <span>سرعة ونظافة فائقة</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
