import React from 'react';
import { OrderStatus, STATUS_LABELS } from '@/types';
import { CheckIcon, XCircleIcon } from '@/components/ui/Icons';

interface OrderTimelineProps {
  currentStatus: OrderStatus;
  updatedAt: string;
}

const TIMELINE_STEPS: OrderStatus[] = [
  'new',
  'accepted',
  'driver_on_the_way',
  'car_received',
  'cleaning_in_progress',
  'ready_for_delivery',
  'delivered',
];

export default function OrderTimeline({ currentStatus, updatedAt }: OrderTimelineProps) {
  const isCancelled = currentStatus === 'cancelled';
  const currentIndex = TIMELINE_STEPS.indexOf(currentStatus);

  // Format date helper
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }) + ' - ' + date.toLocaleDateString('ar-EG', { month: 'short', day: 'numeric' });
    } catch {
      return '';
    }
  };

  return (
    <div className="bg-zinc-950/50 border border-zinc-900 rounded-2xl p-6 lg:p-8">
      <h3 className="text-lg font-black text-white mb-6 border-r-4 border-racing-red pr-3">
        حالة وتفاصيل الطلب
      </h3>

      {isCancelled ? (
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <div className="bg-red-950/30 p-4 rounded-full border border-red-500/20 mb-3 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            <XCircleIcon size={48} className="text-red-500" />
          </div>
          <h4 className="text-lg font-black text-red-500">تم إلغاء هذا الطلب</h4>
          <p className="text-sm text-silver mt-1 max-w-xs">
            تم إلغاء طلب الغسيل الخاص بك. يمكنك التواصل مع الدعم الفني للاستفسار.
          </p>
          <span className="text-xs text-zinc-500 mt-4">آخر تحديث: {formatDate(updatedAt)}</span>
        </div>
      ) : (
        <div className="relative">
          {/* Timeline continuous line */}
          <div className="absolute right-6 top-2 bottom-2 w-0.5 bg-zinc-800" />

          <div className="space-y-8 relative">
            {TIMELINE_STEPS.map((step, index) => {
              const isCompleted = index < currentIndex;
              const isActive = index === currentIndex;
              const isPending = index > currentIndex;

              let iconBg = 'bg-zinc-900 border-zinc-800';
              let iconColor = 'text-zinc-600';
              let textClass = 'text-zinc-500';

              if (isCompleted) {
                iconBg = 'bg-racing-red border-racing-red shadow-red-glow/20';
                iconColor = 'text-white';
                textClass = 'text-silver font-bold';
              } else if (isActive) {
                iconBg = 'bg-black border-racing-red shadow-red-glow scale-110';
                iconColor = 'text-racing-red';
                textClass = 'text-white font-black';
              }

              return (
                <div key={step} className="flex items-start gap-4">
                  {/* Step Bullet Icon */}
                  <div
                    className={`z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${iconBg}`}
                  >
                    {isCompleted ? (
                      <CheckIcon size={18} className={iconColor} />
                    ) : isActive ? (
                      <div className="w-3 h-3 rounded-full bg-racing-red animate-ping" />
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                    )}
                  </div>

                  {/* Step details */}
                  <div className="pt-2">
                    <p className={`text-base transition-colors ${textClass}`}>
                      {STATUS_LABELS[step]}
                    </p>
                    {isActive && (
                      <div className="mt-1 flex flex-col gap-0.5">
                        <span className="inline-block bg-racing-red/10 border border-racing-red/20 text-racing-red text-[10px] font-bold px-2 py-0.5 rounded-md w-max">
                          الحالة الحالية
                        </span>
                        <span className="text-[10px] text-zinc-500 mt-1 font-semibold">
                          تحديث: {formatDate(updatedAt)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
