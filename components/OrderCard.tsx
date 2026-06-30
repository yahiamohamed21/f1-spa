import React from 'react';
import Link from 'next/link';
import { Order, OrderStatus } from '../types';
import StatusBadge from './StatusBadge';
import { PhoneIcon, ClockIcon, MapPinIcon, CarIcon } from './Icons';

interface OrderCardProps {
  order: Order;
  onUpdateStatus: (id: string, status: OrderStatus) => void;
  onCancelOrder: (id: string) => void;
}

export default function OrderCard({ order, onUpdateStatus, onCancelOrder }: OrderCardProps) {
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('ar-EG', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

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
    <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-5 hover:border-racing-red/30 transition-all space-y-4">
      {/* Header: Number & Created Date */}
      <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
        <span className="text-base font-black text-white italic tracking-wider">
          {order.orderNumber}
        </span>
        <span className="text-[10px] text-zinc-500 font-bold">
          {formatDate(order.createdAt)}
        </span>
      </div>

      {/* Customer Info */}
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-black text-white text-base">{order.customerName}</h4>
          <a
            href={`tel:${order.phone}`}
            className="inline-flex items-center gap-1 text-xs text-silver mt-1 hover:text-white dir-ltr"
          >
            <PhoneIcon size={12} className="text-racing-red animate-pulse" />
            <span>{order.phone}</span>
          </a>
        </div>
        <StatusBadge status={order.status} />
      </div>

      {/* Vehicle & Service */}
      <div className="grid grid-cols-2 gap-3 bg-zinc-900/40 p-3 rounded-xl border border-zinc-900 text-xs">
        <div className="space-y-1">
          <span className="text-zinc-500 font-bold block">السيارة</span>
          <div className="flex items-center gap-1 text-white font-bold">
            <CarIcon size={12} className="text-racing-red" />
            <span className="truncate">{order.carType} {order.carModel}</span>
          </div>
        </div>
        <div className="space-y-1">
          <span className="text-zinc-500 font-bold block">الخدمة</span>
          <span className="text-white font-bold block">{order.serviceType}</span>
        </div>
      </div>

      {/* Address & Appointment Info */}
      <div className="space-y-2 text-xs">
        <div className="flex items-center gap-2 text-silver">
          <MapPinIcon size={14} className="text-zinc-500 flex-shrink-0" />
          <span className="truncate" title={order.address}>{order.address}</span>
        </div>
        <div className="flex items-center gap-2 text-silver">
          <ClockIcon size={14} className="text-racing-red flex-shrink-0" />
          <span>الموعد: {order.preferredDate} | {order.preferredTime}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="border-t border-zinc-900 pt-4 flex flex-wrap gap-2 justify-between items-center">
        
        {/* Status Dropdown */}
        {order.status !== 'delivered' && order.status !== 'cancelled' ? (
          <select
            onChange={(e) => onUpdateStatus(order.id, e.target.value as OrderStatus)}
            value={order.status}
            className="bg-zinc-900 border border-zinc-800 text-xs text-white rounded-lg px-2 py-1.5 focus:outline-none flex-grow"
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-black">
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          <div className="text-[10px] text-zinc-500 font-bold">الطلب مغلق</div>
        )}

        <div className="flex gap-2">
          {/* Details Link */}
          <Link
            href={`/admin/orders/${order.id}`}
            className="bg-zinc-900 hover:bg-white text-silver hover:text-black border border-zinc-800 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all"
          >
            التفاصيل
          </Link>

          {/* Cancel trigger */}
          {order.status !== 'delivered' && order.status !== 'cancelled' && (
            <button
              onClick={() => {
                if (confirm('هل أنت متأكد من إلغاء هذا الطلب؟')) {
                  onCancelOrder(order.id);
                }
              }}
              className="bg-red-950/20 hover:bg-red-500 text-red-500 hover:text-white border border-red-950/30 px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
            >
              إلغاء
            </button>
          )}
        </div>

      </div>

    </div>
  );
}
