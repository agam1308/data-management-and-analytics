export default function Documentation() {
  return (
    <div className="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 gap-8">
       {/* Sidebar */}
       <aside className="w-64 hidden lg:block sticky top-24 h-fit">
          <div className="glass-panel p-6 rounded-xl space-y-6">
             <div>
                <h3 className="text-neon-purple font-bold mb-4 uppercase text-sm tracking-wider">Core Concepts</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                   <li className="hover:text-white cursor-pointer transition-colors">Architecture</li>
                   <li className="hover:text-white cursor-pointer transition-colors">Data Flow</li>
                   <li className="hover:text-white cursor-pointer transition-colors">Security</li>
                </ul>
             </div>
             <div>
                <h3 className="text-neon-cyan font-bold mb-4 uppercase text-sm tracking-wider">API Reference</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                   <li className="hover:text-white cursor-pointer transition-colors">Authentication</li>
                   <li className="hover:text-white cursor-pointer transition-colors">User Management</li>
                   <li className="hover:text-white cursor-pointer transition-colors">Analytics</li>
                </ul>
             </div>
          </div>
       </aside>

       {/* Main Content */}
       <div className="flex-1 space-y-8">
          <div className="glass-panel p-10 rounded-xl">
             <h1 className="text-4xl font-display font-bold text-white mb-6">Documentation</h1>
             <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Welcome to the Nexus documentation. This comprehensive guide covers everything you need to know about building, deploying, and scaling your applications with the Nexus framework.
             </p>

             <div className="space-y-8">
                <section>
                   <h2 className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-2">Installation</h2>
                   <div className="bg-black/50 p-4 rounded-lg font-mono text-sm text-green-400">
                      npm install nexus-cli
                   </div>
                </section>

                <section>
                   <h2 className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-2">Configuration</h2>
                   <p className="text-gray-400 mb-4">
                      Nexus requires a minimal configuration setup. Create a <code className="text-neon-purple">nexus.config.js</code> file in your root directory.
                   </p>
                   <div className="bg-black/50 p-4 rounded-lg font-mono text-sm text-gray-300">
                      module.exports = {'{'}<br/>
                      &nbsp;&nbsp;theme: 'neon-dark',<br/>
                      &nbsp;&nbsp;api: {'{'}<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;baseUrl: 'https://api.nexus.com'<br/>
                      &nbsp;&nbsp;{'}'}<br/>
                      {'}'}
                   </div>
                </section>
                
                <section>
                   <h2 className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-2">Modules</h2>
                   <p className="text-gray-400">
                      Our modular architecture allows you to include only what you need. From high-performance data grids to complex 3D visualizations.
                   </p>
                </section>
             </div>
          </div>
       </div>
    </div>
  );
}
