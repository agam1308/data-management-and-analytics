'use client'
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import UserTable from '@/components/UserTable';
import Link from 'next/link';

export default function Home() {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const dashboardRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(textRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, ease: 'power4.out' }
    )
    .fromTo(heroRef.current,
      { opacity: 0, scale: 0.8, rotation: -5 },
      { opacity: 1, scale: 1, rotation: 0, duration: 1.2, ease: 'back.out(1.7)' },
      "-=0.5"
    )
    .fromTo(dashboardRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      "-=0.8"
    );

  }, []);

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-20">
        <div ref={textRef} className="lg:w-1/2 space-y-6">
          <div className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-neon-cyan uppercase bg-neon-cyan/10 rounded-full border border-neon-cyan/20 backdrop-blur-sm">
            System v2.0 Online
          </div>
          <h1 className="text-5xl lg:text-7xl font-display font-bold leading-tight">
            Manage <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan animate-gradient">
              The Future
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-lg">
            A next-generation dashboard interface powered by Redux, Next.js, and MySQL. Experience data management at light speed.
          </p>
          <div className="flex gap-4 pt-4">
            <Link href="/get-started" className="px-8 py-3 bg-white text-black font-bold rounded hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]">
              Get Started
            </Link>
            <Link href="/docs" className="px-8 py-3 bg-transparent border border-white/20 text-white rounded hover:bg-white/5 transition-all hover:border-neon-purple/50">
              Documentation
            </Link>
          </div>
        </div>
        
        <div ref={heroRef} className="lg:w-1/2 flex justify-center relative">
            <div className="absolute inset-0 bg-neon-purple/20 blur-[100px] rounded-full mix-blend-screen"></div>
            <Image 
              src="/hero-illustration.svg" 
              alt="Dashboard Visualization" 
              width={500} 
              height={400}
              className="relative z-10 drop-shadow-2xl"
              priority
            />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {['Total Users', 'Active Sessions', 'System Health'].map((item, i) => (
           <div key={i} className="glass-panel p-6 rounded-xl border-l-4 border-l-neon-cyan hover:translate-y-[-5px] transition-transform duration-300">
              <h3 className="text-gray-400 text-sm font-medium">{item}</h3>
              <p className="text-3xl font-display font-bold mt-2 text-white">
                {i === 0 ? '1,234' : i === 1 ? '856' : '99.9%'}
              </p>
           </div>
        ))}
      </div>

      {/* Main Dashboard Table */}
      <div ref={dashboardRef} className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-white mb-6 pl-2 border-l-2 border-neon-purple">User Directory</h2>
        <UserTable />
      </div>
    </div>
  );
}
