import { Order, OrderStatus, Service, DashboardStats } from '@/types';

export const SERVICES: Service[] = [
  {
    id: 'exterior',
    name: 'غسيل خارجي',
    description: 'غسيل خارجي بالرغوة النفاثة وتجفيف بالمايكروفايبر وتلميع الإطارات.',
    price: 50,
    duration: '30 دقيقة',
    icon: 'Sparkles',
  },
  {
    id: 'interior',
    name: 'غسيل داخلي',
    description: 'كنس شامل للمقاعد والأرضيات، تنظيف التابلوه والأبواب، وتعطير السيارة.',
    price: 60,
    duration: '45 دقيقة',
    icon: 'Wind',
  },
  {
    id: 'full_wash',
    name: 'غسيل كامل',
    description: 'غسيل خارجي متكامل مع تنظيف داخلي عميق وتلميع التابلوه وتطهير فتحات التكييف.',
    price: 100,
    duration: '60 دقيقة',
    icon: 'Droplet',
  },
  {
    id: 'polishing',
    name: 'تلميع السيارة',
    description: 'إزالة الخدوش السطحية وتلميع الهيكل الخارجي بطبقة شمع واقية لاستعادة لمعان الوكالة.',
    price: 250,
    duration: '3 ساعات',
    icon: 'Shield',
  },
  {
    id: 'upholstery',
    name: 'تنظيف الفرش',
    description: 'غسيل وتطهير مقاعد السيارة المخملية أو الجلدية بأجهزة البخار والمواد الخاصة لإزالة البقع الصعبة.',
    price: 180,
    duration: '2 ساعة',
    icon: 'Activity',
  },
  {
    id: 'sterilization',
    name: 'تعقيم داخلي',
    description: 'تعقيم شامل للسيارة من الداخل بجهاز الأوزون والبخار للقضاء على 99% من البكتيريا والروائح الكريهة.',
    price: 80,
    duration: '30 دقيقة',
    icon: 'CheckCircle',
  },
];

const DEFAULT_ORDERS: Order[] = [
  {
    id: 'order-1',
    orderNumber: 'F1-2491',
    customerName: 'أحمد محمود',
    phone: '0501234567',
    carType: 'تويوتا',
    carModel: 'كامري 2023',
    carColor: 'أبيض لؤلؤي',
    serviceType: 'غسيل كامل',
    address: 'شارع الملك فهد، حي الياسمين، الرياض',
    preferredDate: '2026-07-01',
    preferredTime: '10:00 ص',
    notes: 'يرجى التركيز على تنظيف صندوق السيارة الخلفي.',
    status: 'delivered',
    price: 100,
    createdAt: '2026-06-29T14:30:00.000Z',
    updatedAt: '2026-06-29T16:00:00.000Z',
  },
  {
    id: 'order-2',
    orderNumber: 'F1-9823',
    customerName: 'سارة العتيبي',
    phone: '0559876543',
    carType: 'هيونداي',
    carModel: 'توسان 2022',
    carColor: 'رمادي معدني',
    serviceType: 'تلميع السيارة',
    address: 'حي الروضة، جدة',
    preferredDate: '2026-06-30',
    preferredTime: '04:00 م',
    notes: 'هل يمكن حجز موعد مبكر؟',
    status: 'cleaning_in_progress',
    price: 250,
    createdAt: '2026-06-30T01:15:00.000Z',
    updatedAt: '2026-06-30T03:00:00.000Z',
  },
  {
    id: 'order-3',
    orderNumber: 'F1-5541',
    customerName: 'خالد الدوسري',
    phone: '0534455667',
    carType: 'مرسيدس',
    carModel: 'C200 2024',
    carColor: 'أسود ميتاليك',
    serviceType: 'تعقيم داخلي',
    address: 'شارع التخصصي، حي المعذر، الرياض',
    preferredDate: '2026-06-30',
    preferredTime: '06:30 م',
    notes: '',
    status: 'new',
    price: 80,
    createdAt: '2026-06-30T02:45:00.000Z',
    updatedAt: '2026-06-30T02:45:00.000Z',
  },
  {
    id: 'order-4',
    orderNumber: 'F1-1120',
    customerName: 'محمد القحطاني',
    phone: '0567788990',
    carType: 'لكزس',
    carModel: 'RX 2023',
    carColor: 'فضي',
    serviceType: 'تنظيف الفرش',
    address: 'طريق الملك عبدالله، حي القدس، الرياض',
    preferredDate: '2026-07-02',
    preferredTime: '11:00 ص',
    notes: 'يوجد بقع قهوة على المقاعد الأمامية.',
    status: 'accepted',
    price: 180,
    createdAt: '2026-06-29T18:20:00.000Z',
    updatedAt: '2026-06-29T19:00:00.000Z',
  },
  {
    id: 'order-5',
    orderNumber: 'F1-8845',
    customerName: 'عبدالرحمن الشهري',
    phone: '0543322110',
    carType: 'فورد',
    carModel: 'تورس 2021',
    carColor: 'أزرق كحلي',
    serviceType: 'غسيل خارجي',
    address: 'حي الشاطئ، الدمام',
    preferredDate: '2026-06-30',
    preferredTime: '08:00 م',
    notes: 'الرجاء الاتصال قبل الوصول بـ ١٥ دقيقة.',
    status: 'driver_on_the_way',
    price: 50,
    createdAt: '2026-06-30T03:00:00.000Z',
    updatedAt: '2026-06-30T03:15:00.000Z',
  }
];

const LOCAL_STORAGE_KEY = 'f1spa_orders';

// Helper to check if window is defined (for Next.js SSR safety)
const isBrowser = typeof window !== 'undefined';

const initializeStorage = () => {
  if (!isBrowser) return;
  if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_ORDERS));
  }
};

initializeStorage();

export const getOrders = (): Order[] => {
  // TODO: Replace this mock function with GET /api/orders
  if (!isBrowser) return [];
  const ordersJson = localStorage.getItem(LOCAL_STORAGE_KEY);
  return ordersJson ? JSON.parse(ordersJson) : [];
};

export const getOrderById = (id: string): Order | undefined => {
  // TODO: Replace this mock function with GET /api/orders/:id
  const orders = getOrders();
  return orders.find(order => order.id === id || order.orderNumber === id);
};

export const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'price' | 'status' | 'createdAt' | 'updatedAt'>): Order => {
  // TODO: Replace this mock function with POST /api/orders
  const orders = getOrders();
  
  // Find matching service price
  const matchedService = SERVICES.find(s => s.name === orderData.serviceType || s.id === orderData.serviceType);
  const price = matchedService ? matchedService.price : 100;
  
  // Generate random order number in format F1-XXXX
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const orderNumber = `F1-${randomNum}`;
  const id = `order-${Date.now()}`;
  
  const now = new Date().toISOString();
  const newOrder: Order = {
    ...orderData,
    id,
    orderNumber,
    price,
    status: 'new',
    createdAt: now,
    updatedAt: now,
  };
  
  const updatedOrders = [newOrder, ...orders];
  if (isBrowser) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedOrders));
  }
  return newOrder;
};

export const updateOrderStatus = (id: string, status: OrderStatus): Order | undefined => {
  // TODO: Replace this mock function with PATCH /api/orders/:id/status
  if (!isBrowser) return undefined;
  const orders = getOrders();
  let updatedOrder: Order | undefined;
  
  const updatedOrders = orders.map(order => {
    if (order.id === id) {
      updatedOrder = {
        ...order,
        status,
        updatedAt: new Date().toISOString()
      };
      return updatedOrder;
    }
    return order;
  });
  
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedOrders));
  return updatedOrder;
};

export const cancelOrder = (id: string): Order | undefined => {
  // TODO: Replace this mock function with POST /api/orders/:id/cancel
  return updateOrderStatus(id, 'cancelled');
};

export const searchOrders = (query: string): Order[] => {
  // TODO: Replace this mock function with GET /api/orders?search=:query
  const orders = getOrders();
  if (!query.trim()) return orders;
  
  const cleanQuery = query.toLowerCase();
  return orders.filter(
    order =>
      order.customerName.toLowerCase().includes(cleanQuery) ||
      order.phone.includes(cleanQuery) ||
      order.orderNumber.toLowerCase().includes(cleanQuery)
  );
};

export interface FilterOptions {
  status?: OrderStatus | 'all';
  serviceType?: string | 'all';
  sortBy?: 'newest' | 'oldest';
}

export const filterOrders = (filters: FilterOptions): Order[] => {
  // TODO: Replace this mock function with GET /api/orders with query parameters
  let orders = getOrders();
  
  if (filters.status && filters.status !== 'all') {
    orders = orders.filter(order => order.status === filters.status);
  }
  
  if (filters.serviceType && filters.serviceType !== 'all') {
    orders = orders.filter(order => order.serviceType === filters.serviceType);
  }
  
  if (filters.sortBy === 'oldest') {
    orders.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  } else {
    // Default newest first
    orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  
  return orders;
};

export const getDashboardStats = (): DashboardStats => {
  // TODO: Replace this mock function with GET /api/dashboard/stats
  const orders = getOrders();
  
  const stats: DashboardStats = {
    totalOrders: orders.length,
    newOrders: 0,
    inProgressOrders: 0,
    completedOrders: 0,
    cancelledOrders: 0,
    totalRevenue: 0,
  };
  
  orders.forEach(order => {
    switch (order.status) {
      case 'new':
        stats.newOrders++;
        break;
      case 'accepted':
      case 'driver_on_the_way':
      case 'car_received':
      case 'cleaning_in_progress':
      case 'ready_for_delivery':
        stats.inProgressOrders++;
        break;
      case 'delivered':
        stats.completedOrders++;
        stats.totalRevenue += order.price;
        break;
      case 'cancelled':
        stats.cancelledOrders++;
        break;
    }
  });
  
  return stats;
};
