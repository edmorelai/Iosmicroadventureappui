
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
    <nav className="absolute bottom-0 w-full bg-white/90 backdrop-blur-xl border-t border-gray-200 pb-safe pt-2 px-2 z-40 shadow-lg shadow-gray-200/50">
      <div className="flex justify-around items-center h-16 w-full relative">
        {tabs.map((tab) => (
          <NavLink
            key={tab.name}
            to={tab.path}
            className={({ isActive }) => `
              relative flex flex-col items-center justify-center w-full h-full space-y-1
              transition-colors duration-200
              ${isActive ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}
            `}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute -top-2 w-8 h-1 bg-blue-600 rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <tab.icon 
                  className={`w-6 h-6 transition-transform ${isActive ? 'scale-110' : 'scale-100'}`} 
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span className="text-[10px] font-medium tracking-wide">
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
