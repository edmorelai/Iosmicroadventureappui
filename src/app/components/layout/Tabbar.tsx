
import { NavLink } from 'react-router';
import { Home, Compass, Trophy, BarChart2, User, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export function Tabbar() {
  const tabs = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Explore', path: '/explore', icon: Compass },
    { name: 'Challenges', path: '/challenges', icon: Trophy },
    { name: 'Progress', path: '/progress', icon: BarChart2 },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <nav className="absolute bottom-4 left-4 right-4 h-16 bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl z-50 shadow-2xl shadow-purple-900/20">
      <div className="flex justify-around items-center h-full w-full relative px-2">
        {tabs.map((tab) => (
          <NavLink
            key={tab.name}
            to={tab.path}
            className={({ isActive }) => `
              relative flex flex-col items-center justify-center w-full h-full space-y-1 z-10
              transition-colors duration-200
              ${isActive ? 'text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]' : 'text-slate-500 hover:text-slate-300'}
            `}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute -top-3 w-8 h-1 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)]"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <tab.icon 
                  className={`w-6 h-6 transition-transform ${isActive ? 'scale-110 stroke-[2.5px]' : 'scale-100 stroke-2'}`} 
                />
                <span className="text-[10px] font-bold tracking-wider uppercase opacity-80">
                  {tab.name}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
