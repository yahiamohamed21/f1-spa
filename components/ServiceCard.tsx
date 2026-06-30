import React from 'react';
import Link from 'next/link';
import { Service } from '../types';
import {
  SparklesIcon,
  WindIcon,
  DropletIcon,
  ShieldIcon,
  ActivityIcon,
  CheckCircleIcon,
  ClockIcon
} from './Icons';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <SparklesIcon className="text-racing-red transition-transform group-hover:scale-110 duration-300" size={32} />;
      case 'Wind': return <WindIcon className="text-racing-red transition-transform group-hover:scale-110 duration-300" size={32} />;
      case 'Droplet': return <DropletIcon className="text-racing-red transition-transform group-hover:scale-110 duration-300" size={32} />;
      case 'Shield': return <ShieldIcon className="text-racing-red transition-transform group-hover:scale-110 duration-300" size={32} />;
      case 'Activity': return <ActivityIcon className="text-racing-red transition-transform group-hover:scale-110 duration-300" size={32} />;
      case 'CheckCircle': return <CheckCircleIcon className="text-racing-red transition-transform group-hover:scale-110 duration-300" size={32} />;
      default: return <DropletIcon className="text-racing-red" size={32} />;
    }
  };

  return (
    <div className="group relative bg-zinc-950/80 border border-zinc-900 hover:border-racing-red/40 rounded-2xl p-6 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-red-glow/20 flex flex-col justify-between overflow-hidden">
      
      {/* Background visual strip effect */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-racing-red/5 to-transparent rounded-bl-full pointer-events-none"></div>

      <div>
        {/* Header: Icon & Duration */}
        <div className="flex items-center justify-between mb-5">
          <div className="bg-zinc-900/90 p-3 rounded-xl border border-zinc-800 group-hover:border-racing-red/30 transition-colors">
            {getIcon(service.icon)}
          </div>
          <div className="flex items-center gap-1.5 bg-zinc-900 px-3 py-1 rounded-full text-xs text-silver font-semibold">
            <ClockIcon size={12} className="text-racing-red" />
            <span>{service.duration}</span>
          </div>
        </div>

        {/* Name & Description */}
        <h3 className="text-xl font-black text-white mb-2 group-hover:text-racing-red transition-colors">
          {service.name}
        </h3>
        <p className="text-sm text-silver leading-relaxed mb-6 min-h-[50px]">
          {service.description}
        </p>
      </div>

      {/* Footer: Price & CTA */}
      <div className="border-t border-zinc-900 pt-5 flex items-center justify-between mt-auto">
        <div className="flex flex-col">
          <span className="text-[10px] text-zinc-500 font-bold uppercase">السعر</span>
          <span className="text-2xl font-black text-white italic">
            {service.price} <span className="text-xs font-bold text-silver not-italic">ر.س</span>
          </span>
        </div>
        
        <Link
          href={`/booking?serviceId=${service.id}`}
          className="inline-flex items-center justify-center bg-zinc-900 group-hover:bg-racing-red px-5 py-2.5 rounded-lg text-sm font-black text-white transition-all duration-300 border border-zinc-800 group-hover:border-racing-red group-hover:shadow-red-glow/30"
        >
          اطلب الخدمة
        </Link>
      </div>

    </div>
  );
}
