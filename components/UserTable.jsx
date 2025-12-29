'use client'
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '@/lib/features/users/userSlice';
import { gsap } from 'gsap';

export default function UserTable() {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.users);
  const tableRef = useRef(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (status === 'succeeded' && tableRef.current) {
      gsap.fromTo(
        tableRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, [status, list]);

  if (status === 'loading') return <div className="p-8 text-center text-neon-cyan animate-pulse">Initializing Data Stream...</div>;
  if (status === 'failed') return <div className="p-8 text-center text-red-500">System Error: {error}</div>;

  return (
    <div className="w-full overflow-hidden rounded-xl glass-panel relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-purple to-neon-cyan"></div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="text-xs uppercase bg-white/5 text-gray-200">
            <tr>
              <th className="p-4 font-display tracking-wider">User</th>
              <th className="p-4 font-display tracking-wider">Role</th>
              <th className="p-4 font-display tracking-wider">Status</th>
              <th className="p-4 font-display tracking-wider">Joined</th>
            </tr>
          </thead>
          <tbody ref={tableRef} className="divide-y divide-white/10">
            {list.map((user) => (
              <tr key={user.id} className="hover:bg-white/5 transition-colors duration-200 group">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-800 to-black border border-white/20 flex items-center justify-center text-xs font-bold text-white group-hover:border-neon-purple transition-colors">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-white group-hover:text-neon-cyan transition-colors">{user.name}</div>
                      <div className="text-xs opacity-60">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs border ${
                    user.role === 'Admin' ? 'border-neon-purple/50 text-neon-purple bg-neon-purple/10' :
                    'border-gray-600/50 text-gray-300 bg-gray-800/30'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-4">
                  <span className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-gray-500'}`}></span>
                    {user.status}
                  </span>
                </td>
                <td className="p-4 font-mono text-xs">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
