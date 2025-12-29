'use client'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '@/lib/features/auth/authSlice';

export default function Settings() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  const [toggles, setToggles] = useState({
    notifications: true,
    autoSave: true,
    sound: false,
    publicProfile: true
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: user?.name, email: user?.email });

  const handleToggle = (key) => setToggles(p => ({ ...p, [key]: !p[key] }));

  const handleSaveProfile = () => {
     dispatch(updateProfile(editForm));
     setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <h1 className="text-4xl font-display font-bold text-white mb-8 border-b border-white/10 pb-4">Settings</h1>
      
      <div className="space-y-6">
        {/* Profile Stats */}
        <div className="glass-panel p-8 rounded-xl flex flex-col md:flex-row items-center gap-6">
           <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-neon-purple to-neon-cyan p-[2px]">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-3xl font-bold text-white">
                {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) : 'JS'}
              </div>
           </div>
           
           <div className="flex-1 text-center md:text-left space-y-2 w-full">
             {isEditing ? (
                <div className="space-y-3 max-w-sm">
                   <input 
                     type="text" 
                     value={editForm.name} 
                     onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                     className="w-full bg-black/50 border border-white/20 rounded px-3 py-2 text-white focus:border-neon-purple outline-none"
                   />
                   <input 
                     type="email" 
                     value={editForm.email} 
                     onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                     className="w-full bg-black/50 border border-white/20 rounded px-3 py-2 text-white focus:border-neon-purple outline-none"
                   />
                </div>
             ) : (
               <>
                 <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
                 <p className="text-gray-400">{user?.email}</p>
                 <span className="inline-block px-2 py-1 bg-neon-purple/10 text-neon-purple text-xs border border-neon-purple/20 rounded">Administrator</span>
               </>
             )}
           </div>

           <div className="flex gap-2">
             {isEditing ? (
               <>
                  <button 
                    onClick={handleSaveProfile}
                    className="px-4 py-2 bg-neon-purple hover:bg-neon-purple/80 text-white rounded transition-colors"
                  >
                    Save
                  </button>
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-white/20 text-gray-300 rounded hover:bg-white/10 transition-colors"
                  >
                    Cancel
                  </button>
               </>
             ) : (
                <button 
                  onClick={() => { setIsEditing(true); setEditForm({ name: user?.name, email: user?.email }); }}
                  className="px-4 py-2 border border-neon-cyan text-neon-cyan rounded hover:bg-neon-cyan/10 transition-colors"
                >
                  Edit Profile
                </button>
             )}
           </div>
        </div>

        {/* Toggles */}
        <div className="glass-panel p-8 rounded-xl space-y-8">
           <h3 className="text-xl font-bold text-gray-200">System Preferences</h3>
           
           {Object.entries(toggles).map(([key, value]) => (
             <div key={key} className="flex items-center justify-between group cursor-pointer" onClick={() => handleToggle(key)}>
                <div>
                  <h4 className="text-white capitalize font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}</h4>
                  <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">Enable or disable {key.toLowerCase()} features</p>
                </div>
                
                <div className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ${value ? 'bg-neon-purple' : 'bg-gray-700'}`}>
                   <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${value ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
