import React from 'react';
import Link from 'next/link';
import { Order, OrderStatus } from '@/types';
import StatusBadge from '@/components/ui/StatusBadge';
import { PhoneIcon, ClockIcon, MapPinIcon } from '@/components/ui/Icons';

interface OrdersTableProps {
  orders: Order[];
  onUpdateStatus: (id: string, status: OrderStatus) => void;
  onCancelOrder: (id: string) => void;
}

export default function OrdersTable({ orders, onUpdateStatus, onCancelOrder }: OrdersTableProps) {
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
    <div className="overflow-x-auto">
      <table className="w-full text-right border-collapse">
        <thead>
          <tr className="border-b border-zinc-900 text-xs font-black text-zinc-500 uppercase tracking-wider bg-zinc-950/40">
            <th className="py-4 px-6">رقم الطلب</th>
            <th className="py-4 px-6">العميل</th>
            <th className="py-4 px-6">السيارة</th>
            <th className="py-4 px-6">الخدمة</th>
            <th className="py-4 px-6">العنوان والمنطقة</th>
            <th className="py-4 px-6">الموعد المحدد</th>
            <th className="py-4 px-6">تاريخ الحجز</th>
            <th className="py-4 px-6">الحالة</th>
            <th className="py-4 px-6 text-left">العمليات</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-900">
          {orders.map((order) => (
            <tr
              key={order.id}
              className="hover:bg-zinc-950/40 transition-colors group text-sm"
            >
              {/* Order Number */}
              <td className="py-4 px-6 font-black text-white italic tracking-wider">
                {order.orderNumber}
              </td>

              {/* Customer */}
              <td className="py-4 px-6">
                <div className="flex flex-col">
                  <span className="font-bold text-white group-hover:text-racing-red transition-colors">
                    {order.customerName}
                  </span>
                  <a
                    href={`tel:${order.phone}`}
                    className="inline-flex items-center gap-1 text-xs text-silver hover:text-white mt-1 dir-ltr w-max"
                  >
                    <PhoneIcon size={12} className="text-racing-red" />
                    <span>{order.phone}</span>
                  </a>
                </div>
              </td>

              {/* Vehicle */}
              <td className="py-4 px-6">
                <div className="flex flex-col">
                  <span className="text-white font-bold">{order.carType}</span>
                  <span className="text-xs text-silver mt-0.5">
                    {order.carModel} - <span className="text-[10px] text-zinc-500">{order.carColor}</span>
                  </span>
                </div>
              </td>

              {/* Service */}
              <td className="py-4 px-6 font-bold text-white">
                {order.serviceType}
              </td>

              {/* Address */}
              <td className="py-4 px-6 max-w-xs truncate text-silver" title={order.address}>
                <div className="flex items-center gap-1.5">
                  <MapPinIcon size={14} className="text-zinc-600 flex-shrink-0" />
                  <span className="truncate">{order.address}</span>
                </div>
              </td>

              {/* Booking Time */}
              <td className="py-4 px-6 text-white font-semibold">
                <div className="flex flex-col">
                  <span>{order.preferredDate}</span>
                  <span className="text-xs text-silver mt-0.5 flex items-center gap-1">
                    <ClockIcon size={12} className="text-racing-red" />
                    {order.preferredTime}
                  </span>
                </div>
              </td>

              {/* Created At */}
              <td className="py-4 px-6 text-zinc-500 text-xs font-semibold">
                {formatDate(order.createdAt)}
              </td>

              {/* Status Badge */}
              <td className="py-4 px-6">
                <StatusBadge status={order.status} />
              </td>

              {/* Operations */}
              <td className="py-4 px-6 text-left">
                <div className="flex items-center justify-end gap-3">
                  
                  {/* Status update select selector */}
                  {order.status !== 'delivered' && order.status !== 'cancelled' && (
                    <select
                      onChange={(e) => onUpdateStatus(order.id, e.target.value as OrderStatus)}
                      value={order.status}
                      className="bg-zinc-900 border border-zinc-800 text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-racing-red/40"
                    >
                      {statusOptions.map((opt) => (
                        <option key={opt.value} value={opt.value} className="bg-black">
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  )}

                  {/* View Details Link Button */}
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="inline-flex items-center justify-center bg-zinc-900 hover:bg-white text-silver hover:text-black border border-zinc-800 hover:border-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                  >
                    التفاصيل
                  </Link>

                  {/* Cancel Button */}
                  {order.status !== 'delivered' && order.status !== 'cancelled' && (
                    <button
                      onClick={() => {
                        if (confirm('هل أنت متأكد من إلغاء هذا الطلب؟')) {
                          onCancelOrder(order.id);
                        }
                      }}
                      className="bg-red-950/20 hover:bg-red-500 text-red-500 hover:text-white border border-red-950/30 hover:border-red-500 px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                    >
                      إلغاء
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
