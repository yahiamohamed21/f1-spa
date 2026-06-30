import React from 'react';
import { SearchIcon, FilterIcon } from '@/components/ui/Icons';
import { SERVICES } from '@/services/orderService';
import { STATUS_LABELS } from '@/types';

interface SearchAndFiltersProps {
  onSearchChange: (query: string) => void;
  onStatusChange: (status: string) => void;
  onServiceChange: (service: string) => void;
  onSortChange: (sortBy: 'newest' | 'oldest') => void;
  selectedStatus: string;
  selectedService: string;
  selectedSort: 'newest' | 'oldest';
  searchQuery: string;
}

export default function SearchAndFilters({
  onSearchChange,
  onStatusChange,
  onServiceChange,
  onSortChange,
  selectedStatus,
  selectedService,
  selectedSort,
  searchQuery,
}: SearchAndFiltersProps) {
  return (
    <div className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-5 space-y-4 shadow-[0_4px_15px_rgba(0,0,0,0.2)]">
      
      <div className="flex flex-col lg:flex-row gap-4 justify-between">
        
        {/* Search Bar input */}
        <div className="relative flex-grow max-w-lg">
          <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-zinc-500">
            <SearchIcon size={18} />
          </span>
          <input
            type="text"
            placeholder="البحث بالاسم، رقم الهاتف، أو رقم الطلب (مثال: F1-1234)..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="block w-full pr-10 pl-4 py-3 bg-zinc-900 border border-zinc-850 hover:border-zinc-800 focus:border-racing-red focus:ring-4 focus:ring-racing-red/10 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none transition-all"
          />
        </div>

        {/* Filter Indicators Section Icon */}
        <div className="flex items-center gap-2 text-silver text-sm lg:self-center">
          <FilterIcon size={16} className="text-racing-red" />
          <span className="font-bold">تصفية وفرز النتائج:</span>
        </div>

      </div>

      {/* Grid of selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1 border-t border-zinc-900/60">
        
        {/* Status Filter */}
        <div>
          <label htmlFor="status-filter" className="block text-xs font-bold text-zinc-500 mb-1.5 px-1">
            حالة الطلب
          </label>
          <select
            id="status-filter"
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="block w-full px-3 py-2.5 bg-zinc-900 border border-zinc-850 rounded-xl text-xs text-white focus:outline-none focus:border-racing-red transition-all"
          >
            <option value="all">الكل (جميع الحالات)</option>
            {Object.entries(STATUS_LABELS).map(([key, label]) => (
              <option key={key} value={key} className="bg-black">
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Service Type Filter */}
        <div>
          <label htmlFor="service-filter" className="block text-xs font-bold text-zinc-500 mb-1.5 px-1">
            نوع الخدمة المطلوبة
          </label>
          <select
            id="service-filter"
            value={selectedService}
            onChange={(e) => onServiceChange(e.target.value)}
            className="block w-full px-3 py-2.5 bg-zinc-900 border border-zinc-850 rounded-xl text-xs text-white focus:outline-none focus:border-racing-red transition-all"
          >
            <option value="all">الكل (جميع الخدمات)</option>
            {SERVICES.map((service) => (
              <option key={service.id} value={service.name} className="bg-black">
                {service.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sorting selection */}
        <div>
          <label htmlFor="sort-filter" className="block text-xs font-bold text-zinc-500 mb-1.5 px-1">
            ترتيب حسب
          </label>
          <select
            id="sort-filter"
            value={selectedSort}
            onChange={(e) => onSortChange(e.target.value as 'newest' | 'oldest')}
            className="block w-full px-3 py-2.5 bg-zinc-900 border border-zinc-850 rounded-xl text-xs text-white focus:outline-none focus:border-racing-red transition-all"
          >
            <option value="newest" className="bg-black">الطلب الأحدث أولاً</option>
            <option value="oldest" className="bg-black">الطلب الأقدم أولاً</option>
          </select>
        </div>

      </div>

    </div>
  );
}
