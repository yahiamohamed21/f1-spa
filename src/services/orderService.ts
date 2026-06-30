import { Order, OrderStatus, Service, DashboardStats } from '@/types';

export const SERVICES: Service[] = [
  {
    id: 'exterior',
    name: 'غسيل خارجي',
    description: 'غسيل خارجي بالرغوة النفاثة وتجفيف بالمايكروفايبر وتلميع الإطارات.',
    price: 150,
    duration: '30 دقيقة',
    icon: 'Sparkles',
  },
  {
    id: 'interior',
    name: 'غسيل داخلي',
    description: 'كنس شامل للمقاعد والأرضيات، تنظيف التابلوه والأبواب، وتعطير السيارة.',
    price: 200,
    duration: '45 دقيقة',
    icon: 'Wind',
  },
  {
    id: 'full_wash',
    name: 'غسيل كامل',
    description: 'غسيل خارجي متكامل مع تنظيف داخلي عميق وتلميع التابلوه وتطهير فتحات التكييف.',
    price: 350,
    duration: '60 دقيقة',
    icon: 'Droplet',
  },
  {
    id: 'polishing',
    name: 'تلميع السيارة',
    description: 'إزالة الخدوش السطحية وتلميع الهيكل الخارجي بطبقة شمع واقية لاستعادة لمعان الوكالة.',
    price: 800,
    duration: '3 ساعات',
    icon: 'Shield',
  },
  {
    id: 'upholstery',
    name: 'تنظيف الفرش',
    description: 'غسيل وتطهير مقاعد السيارة المخملية أو الجلدية بأجهزة البخار والمواد الخاصة لإزالة البقع الصعبة.',
    price: 600,
    duration: '2 ساعة',
    icon: 'Activity',
  },
  {
    id: 'sterilization',
    name: 'تعقيم داخلي',
    description: 'تعقيم شامل للسيارة من الداخل بجهاز الأوزون والبخار للقضاء على 99% من البكتيريا والروائح الكريهة.',
    price: 250,
    duration: '30 دقيقة',
    icon: 'CheckCircle',
  },
];

const DEFAULT_ORDERS: Order[] = [
  {
    id: 'order-1',
    orderNumber: 'F1-2491',
    customerName: 'أحمد محمود',
    phone: '01012345678',
    carType: 'تويوتا',
    carModel: 'كامري 2023',
    carColor: 'أبيض لؤلؤي',
    serviceTypes: ['غسيل كامل'],
    address: 'شارع التسعين، التجمع الخامس، القاهرة',
    preferredDate: '2026-07-01',
    preferredTime: '10:00 ص',
    notes: 'يرجى التركيز على تنظيف صندوق السيارة الخلفي.',
    status: 'delivered',
    price: 350,
    createdAt: '2026-06-29T14:30:00.000Z',
    updatedAt: '2026-06-29T16:00:00.000Z',
  },
  {
    id: 'order-2',
    orderNumber: 'F1-9823',
    customerName: 'سارة أحمد',
    phone: '01298765432',
    carType: 'هيونداي',
    carModel: 'توسان 2022',
    carColor: 'رمادي معدني',
    serviceTypes: ['تلميع السيارة'],
    address: 'حي الدقي، الجيزة',
    preferredDate: '2026-06-30',
    preferredTime: '04:00 م',
    notes: 'هل يمكن حجز موعد مبكر؟',
    status: 'cleaning_in_progress',
    price: 800,
    createdAt: '2026-06-30T01:15:00.000Z',
    updatedAt: '2026-06-30T03:00:00.000Z',
  },
  {
    id: 'order-3',
    orderNumber: 'F1-5541',
    customerName: 'خالد الدوسري',
    phone: '01544556677',
    carType: 'مرسيدس',
    carModel: 'C200 2024',
    carColor: 'أسود ميتاليك',
    serviceTypes: ['تعقيم داخلي', 'غسيل داخلي'],
    address: 'المعادي، القاهرة',
    preferredDate: '2026-06-30',
    preferredTime: '06:30 م',
    notes: '',
    status: 'new',
    price: 450,
    createdAt: '2026-06-30T02:45:00.000Z',
    updatedAt: '2026-06-30T02:45:00.000Z',
  },
  {
    id: 'order-4',
    orderNumber: 'F1-1120',
    customerName: 'محمد القحطاني',
    phone: '01177889900',
    carType: 'لكزس',
    carModel: 'RX 2023',
    carColor: 'فضي',
    serviceTypes: ['تنظيف الفرش'],
    address: 'حي مصر الجديدة، القاهرة',
    preferredDate: '2026-07-02',
    preferredTime: '11:00 ص',
    notes: 'يوجد بقع قهوة على المقاعد الأمامية.',
    status: 'accepted',
    price: 600,
    createdAt: '2026-06-29T18:20:00.000Z',
    updatedAt: '2026-06-29T19:00:00.000Z',
  },
  {
    id: 'order-5',
    orderNumber: 'F1-8845',
    customerName: 'عبدالرحمن الشهري',
    phone: '01033221100',
    carType: 'فورد',
    carModel: 'تورس 2021',
    carColor: 'أزرق كحلي',
    serviceTypes: ['غسيل خارجي'],
    address: 'سموحة، الإسكندرية',
    preferredDate: '2026-06-30',
    preferredTime: '08:00 م',
    notes: 'الرجاء الاتصال قبل الوصول بـ ١٥ دقيقة.',
    status: 'driver_on_the_way',
    price: 150,
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
  if (!isBrowser) return [];
  const ordersJson = localStorage.getItem(LOCAL_STORAGE_KEY);
  return ordersJson ? JSON.parse(ordersJson) : [];
};

export const getOrderById = (id: string): Order | undefined => {
  const orders = getOrders();
  return orders.find(order => order.id === id || order.orderNumber === id);
};

export const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'price' | 'status' | 'createdAt' | 'updatedAt'>): Order => {
  const orders = getOrders();
  
  // Calculate price as sum of matched services
  let price = 0;
  if (Array.isArray(orderData.serviceTypes)) {
    orderData.serviceTypes.forEach(serviceName => {
      const matchedService = SERVICES.find(s => s.name === serviceName || s.id === serviceName);
      price += matchedService ? matchedService.price : 150;
    });
  } else {
    // Fallback if somehow not an array
    const matchedService = SERVICES.find(s => s.name === (orderData as any).serviceType || s.id === (orderData as any).serviceType);
    price = matchedService ? matchedService.price : 150;
  }
  
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
  return updateOrderStatus(id, 'cancelled');
};

export const searchOrders = (query: string): Order[] => {
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
  let orders = getOrders();
  
  if (filters.status && filters.status !== 'all') {
    orders = orders.filter(order => order.status === filters.status);
  }
  
  if (filters.serviceType && filters.serviceType !== 'all') {
    orders = orders.filter(order => order.serviceTypes && order.serviceTypes.includes(filters.serviceType!));
  }
  
  if (filters.sortBy === 'oldest') {
    orders.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  } else {
    orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  
  return orders;
};

export const getDashboardStats = (): DashboardStats => {
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
