import React from 'react';

interface DashboardStatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  colorType: 'red' | 'silver' | 'green' | 'blue' | 'yellow' | 'purple';
}

export default function DashboardStatsCard({ title, value, icon, colorType }: DashboardStatsCardProps) {
  const getColorStyles = (type: string) => {
    switch (type) {
      case 'red':
        return {
          border: 'border-racing-red/20 hover:border-racing-red/50',
          bgIcon: 'bg-racing-red/10 text-racing-red',
          glow: 'hover:shadow-[0_0_20px_rgba(233,0,0,0.15)]',
        };
      case 'green':
        return {
          border: 'border-green-500/20 hover:border-green-500/50',
          bgIcon: 'bg-green-500/10 text-green-400',
          glow: 'hover:shadow-[0_0_20px_rgba(34,197,94,0.15)]',
        };
      case 'blue':
        return {
          border: 'border-blue-500/20 hover:border-blue-500/50',
          bgIcon: 'bg-blue-500/10 text-blue-400',
          glow: 'hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]',
        };
      case 'yellow':
        return {
          border: 'border-amber-500/20 hover:border-amber-500/50',
          bgIcon: 'bg-amber-500/10 text-amber-400',
          glow: 'hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]',
        };
      case 'purple':
        return {
          border: 'border-purple-500/20 hover:border-purple-500/50',
          bgIcon: 'bg-purple-500/10 text-purple-400',
          glow: 'hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]',
        };
      case 'silver':
      default:
        return {
          border: 'border-zinc-800 hover:border-zinc-700',
          bgIcon: 'bg-zinc-900 text-zinc-400',
          glow: 'hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]',
        };
    }
  };

  const styles = getColorStyles(colorType);

  return (
    <div
      className={`bg-zinc-950/80 border ${styles.border} rounded-2xl p-5 flex items-center justify-between transition-all duration-350 shadow-[0_4px_15px_rgba(0,0,0,0.3)] ${styles.glow}`}
    >
      
      {/* Icon Area */}
      <div className={`p-3.5 rounded-xl ${styles.bgIcon} border border-white/5`}>
        {icon}
      </div>

      {/* Label and Value */}
      <div className="text-left">
        <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">
          {title}
        </p>
        <span className="text-2xl font-black text-white italic tracking-tight">
          {value}
        </span>
      </div>

    </div>
  );
}
