"use client";

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import OrderDetailsPanel from '@/components/admin/OrderDetailsPanel';
import OrderTimeline from '@/components/admin/OrderTimeline';
import LoadingState from '@/components/ui/LoadingState';
import EmptyState from '@/components/ui/EmptyState';
import { getOrderById, updateOrderStatus, cancelOrder } from '@/services/orderService';
import { Order, OrderStatus } from '@/types';
import { ArrowRightIcon } from '@/components/ui/Icons';

export default function AdminOrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  
  const [authorized, setAuthorized] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  // Authentication check
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isLogged = localStorage.getItem('f1spa_admin_logged');
      if (isLogged !== 'true') {
        router.push('/admin/login');
      } else {
        setAuthorized(true);
      }
    }
  }, [router]);

  const loadOrder = () => {
    if (!id) return;
    const foundOrder = getOrderById(id);
    if (foundOrder) {
      setOrder(foundOrder);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (authorized && id) {
      loadOrder();
    }
  }, [authorized, id]);

  const handleUpdateStatus = (orderId: string, status: OrderStatus) => {
    updateOrderStatus(orderId, status);
    loadOrder(); // Refresh the order state
  };

  const handleCancelOrder = (orderId: string) => {
    cancelOrder(orderId);
    loadOrder(); // Refresh the order state
  };

  if (!authorized) {
    return <LoadingState message="جاري التحقق من صلاحيات المدير..." />;
  }

  return (
    <div className="min-h-screen bg-black flex text-white">
      
      {/* Sidebar Navigation */}
      <AdminSidebar />

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        <AdminHeader title={`تفاصيل الطلب: ${order ? order.orderNumber : ''}`} />

        <main className="flex-grow p-6 lg:p-8 space-y-6">
          
          {/* Action Header Nav */}
          <div className="flex justify-start">
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center gap-2 text-xs font-bold text-silver hover:text-white bg-zinc-900 border border-zinc-800 px-4 py-2.5 rounded-xl transition-all"
            >
              <ArrowRightIcon size={14} className="text-racing-red" />
              <span>العودة للوحة التحكم</span>
            </Link>
          </div>

          {loading ? (
            <LoadingState />
          ) : order ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              
              {/* Order Info & Admin Panel Actions */}
              <div className="lg:col-span-2">
                <OrderDetailsPanel
                  order={order}
                  isAdmin={true}
                  onUpdateStatus={handleUpdateStatus}
                  onCancelOrder={handleCancelOrder}
                />
              </div>

              {/* Status Timeline */}
              <div>
                <OrderTimeline currentStatus={order.status} updatedAt={order.updatedAt} />
              </div>

            </div>
          ) : (
            <EmptyState
              title="الطلب غير موجود"
              message="عذراً، لم نتمكن من العثور على الطلب المطلوب في السجلات الإدارية."
            />
          )}

        </main>
      </div>

    </div>
  );
}
