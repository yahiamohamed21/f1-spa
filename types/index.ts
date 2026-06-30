export type OrderStatus =
  | 'new'
  | 'accepted'
  | 'driver_on_the_way'
  | 'car_received'
  | 'cleaning_in_progress'
  | 'ready_for_delivery'
  | 'delivered'
  | 'cancelled';

export const STATUS_LABELS: Record<OrderStatus, string> = {
  new: 'طلب جديد',
  accepted: 'تم قبول الطلب',
  driver_on_the_way: 'المندوب في الطريق',
  car_received: 'تم استلام السيارة',
  cleaning_in_progress: 'جاري التنظيف',
  ready_for_delivery: 'جاهزة للتسليم',
  delivered: 'تم التسليم',
  cancelled: 'ملغي',
};

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  carType: string;
  carModel: string;
  carColor: string;
  serviceType: string; // The service name/id
  address: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  status: OrderStatus;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  icon: string; // Icon identifier (e.g. 'wash', 'vacuum', etc.)
}

export interface DashboardStats {
  totalOrders: number;
  newOrders: number;
  inProgressOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
}
