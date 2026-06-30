import React from 'react';
import Link from 'next/link';
import { Order, OrderStatus } from '../types';
import StatusBadge from './StatusBadge';
import { PhoneIcon, ClockIcon, MapPinIcon, CarIcon, UserIcon, InfoIcon } from './Icons';

interface OrderDetailsPanelProps {
  order: Order;
  isAdmin?: boolean;
  onUpdateStatus?: (id: string, status: OrderStatus) => void;
  onCancelOrder?: (id: string) => void;
}

export default function OrderDetailsPanel({
  order,
  isAdmin = false,
  onUpdateStatus,
  onCancelOrder,
}: OrderDetailsPanelProps) {
  
  const statusOptions: { value: OrderStatus; label: string }[] = [
    { value: 'new', label: 'طلب جديد' },
    { value: 'accepted', label: 'تم قبول الطلب' },
    { value: 'driver_on_the_way', label: 'المندوب في الطريق' },
    { value: 'car_received', label: 'تم استلام السيارة' },
    { value: 'cleaning_in_progress', label: 'جاري التنظيف' },
    { value: 'ready_for_delivery', label: 'جاهزة للتسليم' },
    { value: 'delivered', label: 'تم التسليم' },
  ];

  return (
    <div className="bg-zinc-950/80 border border-zinc-900 rounded-3xl p-6 lg:p-8 space-y-8 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
      
      {/* Panel Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900 pb-6">
        <div>
          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block mb-1">تفاصيل طلب الخدمة</span>
          <h2 className="text-2xl font-black text-white italic tracking-wider">
            رقم الطلب: <span className="text-racing-red">{order.orderNumber}</span>
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={order.status} />
          {isAdmin && (
            <a
              href={`tel:${order.phone}`}
              className="bg-racing-red hover:bg-deep-red text-white p-2.5 rounded-xl transition-all shadow-red-glow"
              title="اتصال بالعميل"
            >
              <PhoneIcon size={18} />
            </a>
          )}
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Customer & Location */}
        <div className="space-y-6">
          
          {/* Customer Card */}
          <div className="space-y-4">
            <h4 className="text-sm font-black text-white border-r-4 border-racing-red pr-2.5 flex items-center gap-2">
              <UserIcon size={16} className="text-racing-red" />
              <span>بيانات العميل</span>
            </h4>
            <div className="bg-zinc-900/40 border border-zinc-900 rounded-2xl p-5 space-y-3.5">
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-500 font-bold">الاسم الكامل:</span>
                <span className="text-white font-bold">{order.customerName}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-500 font-bold">رقم الجوال:</span>
                <a href={`tel:${order.phone}`} className="text-white hover:text-racing-red font-black dir-ltr transition-colors">
                  {order.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Location details */}
          <div className="space-y-4">
            <h4 className="text-sm font-black text-white border-r-4 border-racing-red pr-2.5 flex items-center gap-2">
              <MapPinIcon size={16} className="text-racing-red" />
              <span>عنوان الاستلام والتسليم</span>
            </h4>
            <div className="bg-zinc-900/40 border border-zinc-900 rounded-2xl p-5 text-sm leading-relaxed text-silver">
              {order.address}
            </div>
          </div>

        </div>

        {/* Vehicle & Services details */}
        <div className="space-y-6">
          
          {/* Vehicle Card */}
          <div className="space-y-4">
            <h4 className="text-sm font-black text-white border-r-4 border-racing-red pr-2.5 flex items-center gap-2">
              <CarIcon size={16} className="text-racing-red" />
              <span>بيانات السيارة</span>
            </h4>
            <div className="bg-zinc-900/40 border border-zinc-900 rounded-2xl p-5 space-y-3.5">
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-500 font-bold">نوع السيارة:</span>
                <span className="text-white font-black">{order.carType}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-500 font-bold">الموديل:</span>
                <span className="text-white font-semibold">{order.carModel}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-500 font-bold">اللون:</span>
                <span className="text-white font-bold">{order.carColor}</span>
              </div>
            </div>
          </div>

          {/* Service details */}
          <div className="space-y-4">
            <h4 className="text-sm font-black text-white border-r-4 border-racing-red pr-2.5 flex items-center gap-2">
              <InfoIcon size={16} className="text-racing-red" />
              <span>تفاصيل الخدمة والفاتورة</span>
            </h4>
            <div className="bg-zinc-900/40 border border-zinc-900 rounded-2xl p-5 space-y-3.5">
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-500 font-bold">الخدمة المطلوبة:</span>
                <span className="text-racing-red font-black">{order.serviceType}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-500 font-bold">موعد الحجز:</span>
                <span className="text-white font-bold flex items-center gap-1.5">
                  <ClockIcon size={14} className="text-racing-red" />
                  {order.preferredDate} | {order.preferredTime}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm pt-2.5 border-t border-zinc-900">
                <span className="text-zinc-500 font-bold">إجمالي المبلغ (شامل الضريبة):</span>
                <span className="text-xl font-black text-white italic">
                  {order.price} <span className="text-xs font-bold text-silver not-italic">ر.س</span>
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Notes block if any */}
      {order.notes && (
        <div className="space-y-3">
          <h4 className="text-sm font-black text-white border-r-4 border-racing-red pr-2.5">ملاحظات إضافية</h4>
          <div className="bg-zinc-900/20 border border-zinc-900 rounded-2xl p-5 text-sm text-silver leading-relaxed">
            {order.notes}
          </div>
        </div>
      )}

      {/* Admin Panel actions wrapper */}
      {isAdmin && (
        <div className="border-t border-zinc-900 pt-6 space-y-4">
          <h4 className="text-sm font-black text-white border-r-4 border-racing-red pr-2.5">لوحة إجراءات المدير</h4>
          
          <div className="flex flex-wrap gap-4 items-center justify-between">
            
            {/* Quick Status selectors dropdown */}
            {order.status !== 'delivered' && order.status !== 'cancelled' ? (
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-silver">تحديث الحالة إلى:</span>
                <select
                  onChange={(e) => onUpdateStatus && onUpdateStatus(order.id, e.target.value as OrderStatus)}
                  value={order.status}
                  className="bg-zinc-900 border border-zinc-800 text-sm text-white rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-racing-red/40"
                >
                  {statusOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-black">
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="text-sm text-zinc-500 font-bold">
                {order.status === 'delivered' ? 'هذا الطلب مكتمل ومغلق.' : 'هذا الطلب ملغي.'}
              </div>
            )}

            {/* Complete / Cancel quick buttons */}
            <div className="flex gap-3">
              {order.status !== 'delivered' && order.status !== 'cancelled' && (
                <>
                  <button
                    onClick={() => onUpdateStatus && onUpdateStatus(order.id, 'delivered')}
                    className="bg-white hover:bg-zinc-150 text-black px-6 py-3 rounded-xl text-xs font-black transition-colors"
                  >
                    تم التسليم بنجاح
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('هل أنت متأكد من إلغاء هذا الطلب؟')) {
                        onCancelOrder && onCancelOrder(order.id);
                      }
                    }}
                    className="bg-red-950/20 hover:bg-red-500 text-red-500 hover:text-white border border-red-950/30 px-6 py-3 rounded-xl text-xs font-black transition-colors"
                  >
                    إلغاء الطلب
                  </button>
                </>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
