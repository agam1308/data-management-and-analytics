'use client'
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { login } from '@/lib/features/auth/authSlice';
import { gsap } from 'gsap';

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [status, setStatus] = useState('');

  useEffect(() => {
    gsap.fromTo(formRef.current, 
      { opacity: 0, scale: 0.95 }, 
      { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        // Dispatch to Redux
        dispatch(login({
          ...data.user,
        }));
        setTimeout(() => router.push('/'), 1000);
      } else {
        setStatus(data.error || 'Login failed');
      }
    } catch (err) {
      setStatus('An error occurred');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-neon-purple/10 mix-blend-overlay"></div>
      
      <div ref={formRef} className="w-full max-w-md p-8 rounded-2xl glass-panel relative z-10 mx-4">
        <h2 className="text-3xl font-display font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan">
          Welcome Back
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:ring-2 focus:ring-neon-purple focus:border-transparent text-white transition-all outline-none"
              placeholder="admin@nexus.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:ring-2 focus:ring-neon-cyan focus:border-transparent text-white transition-all outline-none"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-4 bg-gradient-to-r from-neon-purple to-neon-cyan text-white font-bold rounded-lg hover:shadow-[0_0_20px_rgba(217,70,239,0.5)] transition-all transform hover:-translate-y-1 disabled:opacity-50"
          >
            {status === 'loading' ? 'Authenticating...' : 'Sign In'}
          </button>

          {status && status !== 'loading' && (
            <div className={`text-center text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
              {status === 'success' ? 'Access Granted. Redirecting...' : status}
            </div>
          )}

          <div className="text-center text-sm text-gray-500">
            Don't have an account? <Link href="/signup" className="text-neon-cyan hover:underline">Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
