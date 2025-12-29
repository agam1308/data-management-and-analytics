'use client'
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { login } from '@/lib/features/auth/authSlice';
import { gsap } from 'gsap';

export default function Signup() {
  const router = useRouter();
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'User' });
  const [status, setStatus] = useState('');

  useEffect(() => {
    gsap.fromTo(formRef.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: 'back.out' }
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        // Auto-login after signup
        dispatch(login({
          id: data.userId,
          name: formData.name,
          email: formData.email,
          role: formData.role,
        }));
        setTimeout(() => router.push('/'), 1500);
      } else {
        setStatus(data.error || 'Signup failed');
      }
    } catch (err) {
      setStatus('An error occurred');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-12">
      <div className="absolute inset-0 bg-neon-cyan/5 mix-blend-overlay"></div>
      
      <div ref={formRef} className="w-full max-w-md p-8 rounded-2xl glass-panel relative z-10 mx-4 border-t border-neon-cyan/20">
        <h2 className="text-3xl font-display font-bold text-center mb-8 text-white">
          Create Account
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
            <input 
              type="text" 
              required
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:ring-2 focus:ring-neon-purple focus:border-transparent text-white transition-all outline-none"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:ring-2 focus:ring-neon-purple focus:border-transparent text-white transition-all outline-none"
              placeholder="john@nexus.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Role</label>
            <select 
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:ring-2 focus:ring-neon-purple focus:border-transparent text-white transition-all outline-none appearance-none"
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
            >
              <option value="User">User</option>
              <option value="Editor">Editor</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:ring-2 focus:ring-neon-purple focus:border-transparent text-white transition-all outline-none"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all transform hover:-translate-y-1 disabled:opacity-50"
          >
            {status === 'loading' ? 'Creating Account...' : 'Join Nexus'}
          </button>

          {status && status !== 'loading' && (
            <div className={`text-center text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
              {status === 'success' ? 'Account created! Redirecting to login...' : status}
            </div>
          )}

          <div className="text-center text-sm text-gray-500">
            Already a member? <Link href="/login" className="text-neon-purple hover:underline">Log in</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
