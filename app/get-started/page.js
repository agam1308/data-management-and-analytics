'use client'
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function GetStarted() {
  const stepsRef = useRef([]);

  useEffect(() => {
    stepsRef.current.forEach((el, index) => {
      gsap.fromTo(el, 
        { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 1,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, []);

  const steps = [
    {
      title: "1. Account Configuration",
      desc: "Begin by creating your administrative account. Access secure panels via our encrypted login portal.",
      icon: "🔐"
    },
    {
      title: "2. Data Integration",
      desc: "Connect your MySQL database using the provided connection string in your settings panel.",
      icon: "💾"
    },
    {
      title: "3. Dashboard Customization",
      desc: "Tailor your analytics view. Drag and drop widgets to monitor the metrics that matter most.",
      icon: "⚡"
    },
    {
      title: "4. Team Collaboration",
      desc: "Invite team members and assign roles. Nexus supports real-time collaboration out of the box.",
      icon: "👥"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
       <div className="text-center mb-16">
          <h1 className="text-5xl font-display font-bold text-white mb-6">Getting Started with Nexus</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Your journey to superior data management begins here. Follow these steps to activate your workspace.</p>
       </div>

       <div className="space-y-12 relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block"></div>
          
          {steps.map((step, i) => (
             <div 
               key={i} 
               ref={el => stepsRef.current[i] = el}
               className={`flex items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col`}
             >
                <div className="flex-1 text-center md:text-left">
                   <div className={`glass-panel p-8 rounded-xl border-t-2 ${i % 2 === 0 ? 'border-neon-purple' : 'border-neon-cyan'}`}>
                      <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-gray-400">{step.desc}</p>
                   </div>
                </div>
                
                <div className="w-16 h-16 rounded-full bg-black border-2 border-white/20 flex items-center justify-center text-3xl z-10 shrink-0">
                   {step.icon}
                </div>
                
                <div className="flex-1 hidden md:block"></div>
             </div>
          ))}
       </div>

       <div className="mt-20 text-center">
          <Link href="/signup" className="inline-block px-10 py-4 bg-white text-black font-bold rounded hover:bg-neon-cyan hover:text-white transition-all duration-300">
             Launch Workspace
          </Link>
       </div>
    </div>
  );
}
