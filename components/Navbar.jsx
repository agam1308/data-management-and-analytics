'use client'
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/lib/features/auth/authSlice';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';

export default function Navbar() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
     dispatch(logout());
     setDropdownOpen(false);
     router.push('/login');
  };

  useEffect(() => {
    if (dropdownOpen && dropdownRef.current) {
      gsap.fromTo(dropdownRef.current, 
        { opacity: 0, y: -10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: 'power2.out' }
      );
    }
  }, [dropdownOpen]);

  return (
    <nav className="sticky top-0 w-full z-50 glass-panel border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-cyan neon-text">
              NEXUS
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 hover:neon-text">
                Dashboard
              </Link>
              <Link href="/analytics" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 hover:neon-text">
                Analytics
              </Link>
              <Link href="/settings" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 hover:neon-text">
                Settings
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4 relative">
            {!isAuthenticated ? (
               <>
                 <Link href="/login" className="text-sm text-gray-300 hover:text-white transition-colors">Log In</Link>
                 <Link href="/signup" className="px-4 py-2 text-sm font-bold text-black bg-white rounded hover:bg-gray-200 transition-colors shadow-[0_0_10px_rgba(255,255,255,0.2)]">Sign Up</Link>
               </>
            ) : (
               <div className="relative">
                 <button 
                   onClick={() => setDropdownOpen(!dropdownOpen)}
                   className="w-10 h-10 rounded-full bg-gradient-to-tr from-neon-purple to-neon-cyan p-[2px] transition-transform hover:scale-105 active:scale-95 focus:outline-none"
                 >
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-sm font-bold text-white">
                      {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) : 'US'}
                    </div>
                 </button>

                 {dropdownOpen && (
                   <div 
                     ref={dropdownRef}
                     className="absolute right-0 mt-2 w-48 rounded-xl glass-panel border border-white/10 shadow-2xl py-1 overflow-hidden"
                     onMouseLeave={() => setDropdownOpen(false)}
                   >
                      <div className="px-4 py-3 border-b border-white/10">
                        <p className="text-sm text-white font-bold">{user?.name}</p>
                        <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                      </div>
                      
                      <Link 
                        href="/settings" 
                        onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                      >
                        Edit Profile
                      </Link>
                      
                      <button 
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                      >
                        Log Out
                      </button>
                   </div>
                 )}
               </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
