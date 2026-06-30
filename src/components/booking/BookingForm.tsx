"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SERVICES, createOrder } from '@/services/orderService';
import { CalendarIcon, ClockIcon, UserIcon, PhoneIcon, CarIcon, MapPinIcon, LoaderIcon } from '@/components/ui/Icons';

function BookingFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Form values state
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    carType: '',
    carModel: '',
    carColor: '',
    serviceType: '',
    address: '',
    preferredDate: '',
    preferredTime: '',
    notes: '',
  });

  // Validation errors state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdOrderNumber, setCreatedOrderNumber] = useState('');

  // Handle service pre-selection from URL
  useEffect(() => {
    if (searchParams) {
      const serviceId = searchParams.get('serviceId');
      if (serviceId) {
        const matchedService = SERVICES.find(s => s.id === serviceId);
        if (matchedService) {
          setFormData(prev => ({ ...prev, serviceType: matchedService.name }));
        }
      }
    }
  }, [searchParams]);

  // Validation logic
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'الاسم الكامل مطلوب';
    } else if (formData.customerName.trim().length < 3) {
      newErrors.customerName = 'الاسم يجب أن لا يقل عن 3 أحرف';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'رقم الهاتف مطلوب';
    } else if (!/^(05|5)\d{8}$/.test(formData.phone.trim())) {
      newErrors.phone = 'يرجى إدخال رقم جوال سعودي صحيح (مثال: 0501234567)';
    }

    if (!formData.carType.trim()) {
      newErrors.carType = 'نوع الشركة المصنعة مطلوب (مثل: تويوتا)';
    }

    if (!formData.carModel.trim()) {
      newErrors.carModel = 'موديل وسنة صنع السيارة مطلوب';
    }

    if (!formData.carColor.trim()) {
      newErrors.carColor = 'لون السيارة مطلوب';
    }

    if (!formData.serviceType) {
      newErrors.serviceType = 'يرجى اختيار الخدمة المطلوبة';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'العنوان بالتفصيل مطلوب للتوصيل والاستلام';
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = 'يرجى تحديد التاريخ المناسب';
    }

    if (!formData.preferredTime) {
      newErrors.preferredTime = 'يرجى اختيار الوقت المناسب';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear validation error when typing
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorKey = Object.keys(errors)[0];
      const errorElement = document.getElementsByName(firstErrorKey)[0];
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    // Simulate short network delay for realism
    setTimeout(() => {
      try {
        const order = createOrder(formData);
        setCreatedOrderNumber(order.orderNumber);
        setShowSuccessModal(true);
        setIsSubmitting(false);
      } catch (err) {
        console.error(err);
        setIsSubmitting(false);
        alert('حدث خطأ أثناء حفظ الطلب. يرجى المحاولة مرة أخرى.');
      }
    }, 1200);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Section 1: Customer Details */}
        <div className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-6 space-y-5">
          <h3 className="text-lg font-black text-white border-r-4 border-racing-red pr-3 mb-2">
            بيانات العميل الشخصية
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Customer Name */}
            <div>
              <label htmlFor="customerName" className="block text-sm font-bold text-silver mb-2">
                الاسم الكامل *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-zinc-500">
                  <UserIcon size={18} />
                </span>
                <input
                  type="text"
                  name="customerName"
                  id="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  placeholder="أدخل اسمك الثلاثي"
                  className={`block w-full pr-10 pl-4 py-3 bg-zinc-900 border ${
                    errors.customerName ? 'border-red-500 focus:ring-red-500/20' : 'border-zinc-800 focus:ring-racing-red/20'
                  } rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-4 transition-all`}
                />
              </div>
              {errors.customerName && (
                <p className="mt-1.5 text-xs font-bold text-red-500">{errors.customerName}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-sm font-bold text-silver mb-2">
                رقم الهاتف (المناديب سيتواصلون معك) *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-zinc-500">
                  <PhoneIcon size={18} />
                </span>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="05XXXXXXXX"
                  className={`block w-full pr-10 pl-4 py-3 bg-zinc-900 border text-right dir-ltr ${
                    errors.phone ? 'border-red-500 focus:ring-red-500/20' : 'border-zinc-800 focus:ring-racing-red/20'
                  } rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-4 transition-all`}
                />
              </div>
              {errors.phone && (
                <p className="mt-1.5 text-xs font-bold text-red-500">{errors.phone}</p>
              )}
            </div>
          </div>
        </div>

        {/* Section 2: Vehicle Details */}
        <div className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-6 space-y-5">
          <h3 className="text-lg font-black text-white border-r-4 border-racing-red pr-3 mb-2">
            تفاصيل السيارة
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Car Type / Brand */}
            <div>
              <label htmlFor="carType" className="block text-sm font-bold text-silver mb-2">
                نوع السيارة (الماركة) *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-zinc-500">
                  <CarIcon size={18} />
                </span>
                <input
                  type="text"
                  name="carType"
                  id="carType"
                  value={formData.carType}
                  onChange={handleChange}
                  placeholder="مثال: لكزس، تويوتا، مرسيدس"
                  className={`block w-full pr-10 pl-4 py-3 bg-zinc-900 border ${
                    errors.carType ? 'border-red-500 focus:ring-red-500/20' : 'border-zinc-800 focus:ring-racing-red/20'
                  } rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-4 transition-all`}
                />
              </div>
              {errors.carType && (
                <p className="mt-1.5 text-xs font-bold text-red-500">{errors.carType}</p>
              )}
            </div>

            {/* Car Model / Year */}
            <div>
              <label htmlFor="carModel" className="block text-sm font-bold text-silver mb-2">
                الموديل وسنة الصنع *
              </label>
              <input
                type="text"
                name="carModel"
                id="carModel"
                value={formData.carModel}
                onChange={handleChange}
                placeholder="مثال: RX 350 - 2023"
                className={`block w-full px-4 py-3 bg-zinc-900 border ${
                  errors.carModel ? 'border-red-500 focus:ring-red-500/20' : 'border-zinc-800 focus:ring-racing-red/20'
                } rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-4 transition-all`}
              />
              {errors.carModel && (
                <p className="mt-1.5 text-xs font-bold text-red-500">{errors.carModel}</p>
              )}
            </div>

            {/* Car Color */}
            <div>
              <label htmlFor="carColor" className="block text-sm font-bold text-silver mb-2">
                اللون *
              </label>
              <input
                type="text"
                name="carColor"
                id="carColor"
                value={formData.carColor}
                onChange={handleChange}
                placeholder="مثال: أسود ميتاليك"
                className={`block w-full px-4 py-3 bg-zinc-900 border ${
                  errors.carColor ? 'border-red-500 focus:ring-red-500/20' : 'border-zinc-800 focus:ring-racing-red/20'
                } rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-4 transition-all`}
              />
              {errors.carColor && (
                <p className="mt-1.5 text-xs font-bold text-red-500">{errors.carColor}</p>
              )}
            </div>
          </div>
        </div>

        {/* Section 3: Service Selection & Logistics */}
        <div className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-6 space-y-5">
          <h3 className="text-lg font-black text-white border-r-4 border-racing-red pr-3 mb-2">
            الخدمة والتفاصيل اللوجستية
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Service Type */}
            <div className="md:col-span-3">
              <label htmlFor="serviceType" className="block text-sm font-bold text-silver mb-2">
                الخدمة المطلوبة *
              </label>
              <select
                name="serviceType"
                id="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className={`block w-full px-4 py-3 bg-zinc-900 border ${
                  errors.serviceType ? 'border-red-500 focus:ring-red-500/20' : 'border-zinc-800 focus:ring-racing-red/20'
                } rounded-xl text-white focus:outline-none focus:ring-4 transition-all`}
              >
                <option value="" className="text-zinc-500">اختر نوع الغسيل / التنظيف...</option>
                {SERVICES.map((service) => (
                  <option key={service.id} value={service.name} className="bg-black text-white">
                    {service.name} ({service.price} ر.س - {service.duration})
                  </option>
                ))}
              </select>
              {errors.serviceType && (
                <p className="mt-1.5 text-xs font-bold text-red-500">{errors.serviceType}</p>
              )}
            </div>

            {/* Detailed Address */}
            <div className="md:col-span-3">
              <label htmlFor="address" className="block text-sm font-bold text-silver mb-2">
                عنوان وموقع استلام السيارة بالتفصيل *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-zinc-500">
                  <MapPinIcon size={18} />
                </span>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="الحي، الشارع، رقم المبنى أو تفاصيل المعالم القريبة"
                  className={`block w-full pr-10 pl-4 py-3 bg-zinc-900 border ${
                    errors.address ? 'border-red-500 focus:ring-red-500/20' : 'border-zinc-800 focus:ring-racing-red/20'
                  } rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-4 transition-all`}
                />
              </div>
              {errors.address && (
                <p className="mt-1.5 text-xs font-bold text-red-500">{errors.address}</p>
              )}
            </div>

            {/* Date */}
            <div>
              <label htmlFor="preferredDate" className="block text-sm font-bold text-silver mb-2">
                التاريخ المفضل *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-zinc-500">
                  <CalendarIcon size={18} />
                </span>
                <input
                  type="date"
                  name="preferredDate"
                  id="preferredDate"
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.preferredDate}
                  onChange={handleChange}
                  className={`block w-full pr-10 pl-4 py-3 bg-zinc-900 border ${
                    errors.preferredDate ? 'border-red-500 focus:ring-red-500/20' : 'border-zinc-800 focus:ring-racing-red/20'
                  } rounded-xl text-white focus:outline-none focus:ring-4 transition-all`}
                />
              </div>
              {errors.preferredDate && (
                <p className="mt-1.5 text-xs font-bold text-red-500">{errors.preferredDate}</p>
              )}
            </div>

            {/* Time Slot */}
            <div>
              <label htmlFor="preferredTime" className="block text-sm font-bold text-silver mb-2">
                الوقت المفضل *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-zinc-500">
                  <ClockIcon size={18} />
                </span>
                <select
                  name="preferredTime"
                  id="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className={`block w-full pr-10 pl-4 py-3 bg-zinc-900 border ${
                    errors.preferredTime ? 'border-red-500 focus:ring-red-500/20' : 'border-zinc-800 focus:ring-racing-red/20'
                  } rounded-xl text-white focus:outline-none focus:ring-4 transition-all`}
                >
                  <option value="">اختر موعداً...</option>
                  <option value="09:00 ص" className="bg-black">9:00 ص - 11:00 ص</option>
                  <option value="11:00 ص" className="bg-black">11:00 ص - 01:00 م</option>
                  <option value="02:00 م" className="bg-black">2:00 م - 04:00 م</option>
                  <option value="04:00 م" className="bg-black">4:00 م - 06:00 م</option>
                  <option value="06:30 م" className="bg-black">6:30 م - 08:30 م</option>
                  <option value="08:30 م" className="bg-black">8:30 م - 10:30 م</option>
                </select>
              </div>
              {errors.preferredTime && (
                <p className="mt-1.5 text-xs font-bold text-red-500">{errors.preferredTime}</p>
              )}
            </div>

            {/* Additional Notes */}
            <div className="md:col-span-3">
              <label htmlFor="notes" className="block text-sm font-bold text-silver mb-2">
                ملاحظات إضافية للمندوب أو المغسلة
              </label>
              <textarea
                name="notes"
                id="notes"
                rows={3}
                value={formData.notes}
                onChange={handleChange}
                placeholder="مثال: انتبه للخدش على الباب الأيسر، أو الرجاء استخدام مواد معقمة زائدة"
                className="block w-full px-4 py-3 bg-zinc-900 border border-zinc-800 focus:border-racing-red focus:ring-4 focus:ring-racing-red/20 rounded-xl text-white placeholder-zinc-500 focus:outline-none transition-all resize-none"
              />
            </div>
          </div>
        </div>

        {/* Submit button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto min-w-[200px] flex items-center justify-center gap-2.5 bg-racing-red hover:bg-deep-red text-white py-4 px-8 rounded-xl font-black text-lg shadow-red-glow hover:shadow-red-glow-lg transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <LoaderIcon size={20} className="text-white" />
                <span>جاري إرسال طلبك...</span>
              </>
            ) : (
              <span>تأكيد الحجز الفوري</span>
            )}
          </button>
        </div>

      </form>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-8 max-w-md w-full text-center relative overflow-hidden shadow-red-glow-lg">
            
            {/* Speed stripes graphic */}
            <div className="absolute top-0 inset-x-0 h-2 speed-stripes bg-racing-red" />

            <div className="w-16 h-16 bg-racing-red/10 border border-racing-red/30 rounded-full flex items-center justify-center mx-auto mb-6 text-racing-red shadow-[0_0_15px_rgba(233,0,0,0.15)]">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h3 className="text-2xl font-black text-white mb-2">تم استلام طلبك بنجاح!</h3>
            <p className="text-sm text-silver mb-6">
              تهانينا، تم تسجيل حجزك في F1 Spa. سيقوم مندوبنا بالاتصال بك في الموعد المحدد لاستلام السيارة.
            </p>

            <div className="bg-zinc-900 border border-zinc-850 rounded-2xl p-4 mb-6">
              <span className="block text-[10px] text-zinc-500 font-bold uppercase mb-1">
                رقم التتبع الخاص بك
              </span>
              <span className="text-3xl font-black text-white tracking-widest italic">
                {createdOrderNumber}
              </span>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  router.push(`/track?code=${createdOrderNumber}`);
                }}
                className="w-full bg-white hover:bg-zinc-100 text-black py-3.5 rounded-xl font-black text-sm transition-colors shadow-sm"
              >
                تتبع حالة الطلب الآن
              </button>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  router.push('/');
                }}
                className="w-full bg-zinc-900 hover:bg-zinc-800 text-silver hover:text-white py-3 rounded-xl font-bold text-sm transition-colors"
              >
                العودة للرئيسية
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default function BookingForm() {
  return (
    <Suspense fallback={<LoaderIcon size={40} className="text-racing-red mx-auto" />}>
      <BookingFormInner />
    </Suspense>
  );
}
