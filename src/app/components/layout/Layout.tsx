
import { Outlet } from 'react-router';
import { Tabbar } from './Tabbar';

export function Layout() {
  return (
    <div className="flex flex-col h-full bg-[#0a0a0c] font-sans text-slate-100 selection:bg-purple-500/30 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
        
        {/* Ambient background glow */}
        <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[60%] bg-purple-900/20 blur-[100px] pointer-events-none rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[100%] h-[50%] bg-blue-900/10 blur-[100px] pointer-events-none rounded-full mix-blend-screen" />

        <main className="flex-1 overflow-y-auto scrollbar-hide pb-24 relative z-10">
          <Outlet />
        </main>
        <Tabbar />
    </div>
  );
}
