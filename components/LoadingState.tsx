import React from 'react';
import { LoaderIcon } from './Icons';

interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({ message = 'جاري التحميل الفائق...' }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-12 min-h-[300px]">
      <div className="relative flex items-center justify-center mb-4">
        {/* Outer glowing track ring */}
        <div className="w-16 h-16 rounded-full border-4 border-zinc-900 border-t-racing-red animate-spin duration-1000" />
        
        {/* Inner speedometer needle indicator */}
        <div className="absolute w-10 h-10 rounded-full border-2 border-zinc-800 flex items-center justify-center bg-black">
          <div className="w-1.5 h-1.5 rounded-full bg-racing-red" />
        </div>
      </div>
      <p className="text-sm font-bold text-silver tracking-wide animate-pulse">
        {message}
      </p>
    </div>
  );
}
