"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '../../../components/AdminSidebar';
import AdminHeader from '../../../components/AdminHeader';
import DashboardStatsCard from '../../../components/DashboardStatsCard';
import SearchAndFilters from '../../../components/SearchAndFilters';
import OrdersTable from '../../../components/OrdersTable';
import OrderCard from '../../../components/OrderCard';
import EmptyState from '../../../components/EmptyState';
import LoadingState from '../../../components/LoadingState';
import {
  getOrders,
  getDashboardStats,
  updateOrderStatus,
  cancelOrder
} from '../../../services/orderService';
import { Order, OrderStatus, DashboardStats } from '../../../types';
import {
  CarIcon,
  DropletIcon,
  CheckCircleIcon,
  XCircleIcon,
  DollarSignIcon
} from '../../../components/Icons';

export default function AdminDashboardPage() {
  const router = useRouter();
  
  const [authorized, setAuthorized] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

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

  // Main order loading & filtering logic
  const loadDashboardData = () => {
    if (typeof window === 'undefined') return;
    
    // Fetch directly from service
    let filteredOrders = getOrders();

    // 1. Search Query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredOrders = filteredOrders.filter(
        order =>
          order.customerName.toLowerCase().includes(query) ||
          order.phone.includes(query) ||
          order.orderNumber.toLowerCase().includes(query)
      );
    }

    // 2. Status Filter
    if (statusFilter !== 'all') {
      filteredOrders = filteredOrders.filter(order => order.status === statusFilter);
    }

    // 3. Service Filter
    if (serviceFilter !== 'all') {
      filteredOrders = filteredOrders.filter(order => order.serviceType === serviceFilter);
    }

    // 4. Sort Filter
    if (sortBy === 'oldest') {
      filteredOrders.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else {
      // default newest first
      filteredOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    setOrders(filteredOrders);
    setStats(getDashboardStats());
    setLoading(false);
  };

  useEffect(() => {
    if (authorized) {
      loadDashboardData();
    }
  }, [authorized, searchQuery, statusFilter, serviceFilter, sortBy]);

  // Actions
  const handleUpdateStatus = (id: string, newStatus: OrderStatus) => {
    updateOrderStatus(id, newStatus);
    loadDashboardData(); // Reload statistics and list
  };

  const handleCancelOrder = (id: string) => {
    cancelOrder(id);
    loadDashboardData(); // Reload statistics and list
  };

  if (!authorized) {
    return <LoadingState message="جاري التحقق من صلاحيات المدير..." />;
  }

  return (
    <div className="min-h-screen bg-black flex text-white">
      
      {/* Sidebar (Right-side in RTL layout) */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        <AdminHeader title="لوحة التحكم بالطلبات" />

        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <LoadingState />
          </div>
        ) : (
          <main className="flex-grow p-6 lg:p-8 space-y-8">
            
            {/* Stats Metric Cards Grid */}
            {stats && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                
                <DashboardStatsCard
                  title="إجمالي الطلبات"
                  value={stats.totalOrders}
                  icon={<CarIcon size={22} />}
                  colorType="silver"
                />

                <DashboardStatsCard
                  title="طلبات جديدة"
                  value={stats.newOrders}
                  icon={<DropletIcon size={22} className="animate-bounce" />}
                  colorType="blue"
                />

                <DashboardStatsCard
                  title="قيد التنفيذ"
                  value={stats.inProgressOrders}
                  icon={<DropletIcon size={22} />}
                  colorType="yellow"
                />

                <DashboardStatsCard
                  title="طلبات مكتملة"
                  value={stats.completedOrders}
                  icon={<CheckCircleIcon size={22} />}
                  colorType="green"
                />

                <DashboardStatsCard
                  title="طلبات ملغاة"
                  value={stats.cancelledOrders}
                  icon={<XCircleIcon size={22} />}
                  colorType="red"
                />

                <DashboardStatsCard
                  title="الإيرادات المحققة"
                  value={`${stats.totalRevenue} ر.س`}
                  icon={<DollarSignIcon size={22} />}
                  colorType="purple"
                />

              </div>
            )}

            {/* Filter Panel */}
            <SearchAndFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedStatus={statusFilter}
              onStatusChange={setStatusFilter}
              selectedService={serviceFilter}
              onServiceChange={setServiceFilter}
              selectedSort={sortBy}
              onSortChange={setSortBy}
            />

            {/* Orders List Container */}
            <div className="bg-zinc-950/60 border border-zinc-900 rounded-3xl overflow-hidden shadow-md">
              <div className="p-6 border-b border-zinc-900 flex justify-between items-center bg-zinc-950/20">
                <h3 className="text-lg font-black text-white italic">
                  طلبات الغسيل والجدولة (
                  <span className="text-racing-red font-black">{orders.length}</span>
                  )
                </h3>
              </div>

              {orders.length === 0 ? (
                <div className="p-8">
                  <EmptyState
                    title="لا توجد نتائج مطابقة"
                    message="لم نجد أي طلبات تتوفر فيها معايير البحث والتصفية المحددة. جرب تغيير خيارات الفرز."
                  />
                </div>
              ) : (
                <>
                  {/* Desktop View Table */}
                  <div className="hidden lg:block">
                    <OrdersTable
                      orders={orders}
                      onUpdateStatus={handleUpdateStatus}
                      onCancelOrder={handleCancelOrder}
                    />
                  </div>

                  {/* Mobile View Cards Grid */}
                  <div className="lg:hidden p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {orders.map(order => (
                      <OrderCard
                        key={order.id}
                        order={order}
                        onUpdateStatus={handleUpdateStatus}
                        onCancelOrder={handleCancelOrder}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

          </main>
        )}
      </div>

    </div>
  );
}
