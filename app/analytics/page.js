'use client'
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Analytics() {
  const barsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(barsRef.current, 
      { scaleY: 0 }, 
      { scaleY: 1, duration: 1.5, ease: 'elastic.out(1, 0.5)', stagger: 0.1 }
    );
  }, []);

  const data = [65, 40, 80, 55, 90, 70, 30, 60, 75, 50, 85, 95];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <h1 className="text-4xl font-display font-bold text-white mb-8">System Analytics</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Main Chart */}
        <div className="glass-panel p-8 rounded-xl">
          <h2 className="text-xl font-bold text-gray-200 mb-6">Traffic Overview</h2>
          <div className="h-64 flex items-end justify-between gap-2">
            {data.map((h, i) => (
              <div key={i} className="w-full h-full bg-white/5 rounded-t-sm relative group">
                 <div 
                   ref={el => barsRef.current[i] = el}
                   className="absolute bottom-0 w-full bg-gradient-to-t from-neon-purple to-neon-cyan opacity-80 group-hover:opacity-100 transition-opacity rounded-t-sm origin-bottom"
                   style={{ height: `${h}%` }}
                 ></div>
                 <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-xs text-white px-2 py-1 rounded border border-white/20">
                    {h}%
                 </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-gray-500 font-mono">
            <span>JAN</span><span>DEC</span>
          </div>
        </div>

        {/* Circular Stats */}
        <div className="grid grid-cols-2 gap-4">
           {['CPU Usage', 'Memory', 'Network', 'Storage'].map((label, i) => (
             <div key={i} className="glass-panel p-6 rounded-xl flex flex-col items-center justify-center">
                <div className="relative w-24 h-24 mb-4">
                   <svg className="w-full h-full transform -rotate-90">
                     <circle cx="48" cy="48" r="40" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
                     <circle 
                       cx="48" cy="48" r="40" 
                       stroke={i % 2 === 0 ? '#d946ef' : '#06b6d4'} 
                       strokeWidth="8" 
                       fill="none" 
                       strokeDasharray="251.2" 
                       strokeDashoffset={251.2 - (251.2 * (data[i] / 100))}
                       className="transition-all duration-1000 ease-out"
                     />
                   </svg>
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-bold text-white">
                     {data[i]}%
                   </div>
                </div>
                <h3 className="text-gray-400 text-sm">{label}</h3>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
