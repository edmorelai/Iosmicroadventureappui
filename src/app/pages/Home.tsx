
import React, { useState } from 'react';
import { useGame } from '../store/gameStore';
import { SetMoodSheet } from '../components/sheets/SetMoodSheet';
import { FiltersSheet } from '../components/sheets/FiltersSheet';
import { 
  Flame, 
  Sparkles, 
  Clock, 
  MapPin, 
  Sliders, 
  Bot, 
  Trophy, 
  ChevronRight, 
  Zap, 
  Skull, 
  Swords, 
  Gem
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import { DAILY_BOSS } from '../data/adventures';

export function Home() {
  const { state } = useGame();
  const navigate = useNavigate();
  const [moodOpen, setMoodOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  // Calculate level progress (mock calculation based on 1000 XP per level)
  const levelProgress = (state.xp % 1000) / 1000 * 100;
  
  // Rank logic
  const getRank = (level: number) => {
    if (level < 5) return "Scout";
    if (level < 10) return "Pathfinder";
    if (level < 20) return "Vanguard";
    return "Legend";
  };

  return (
    <div className="flex flex-col min-h-screen pb-32 text-slate-100 relative overflow-x-hidden">
      
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-purple-900/20 to-transparent" />
        <div className="absolute top-20 right-[-100px] w-64 h-64 bg-blue-600/10 rounded-full blur-[80px]" />
        <div className="absolute top-40 left-[-50px] w-48 h-48 bg-purple-600/10 rounded-full blur-[60px]" />
      </div>

      {/* 1. Player HUD */}
      <header className="relative z-10 pt-20 px-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Avatar & Level Ring */}
            <div className="relative w-14 h-14">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="28"
                  cy="28"
                  r="26"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="3"
                />
                <circle
                  cx="28"
                  cy="28"
                  r="26"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="3"
                  strokeDasharray="163"
                  strokeDashoffset={163 - (163 * levelProgress) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-1 bg-slate-900 rounded-full border border-white/10 flex items-center justify-center overflow-hidden">
                <span className="text-xl font-bold bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent">
                  {state.level}
                </span>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-purple-600 text-[10px] font-bold px-1.5 py-0.5 rounded border border-slate-900">
                Lvl
              </div>
            </div>

            {/* Name & Rank */}
            <div>
              <h1 className="font-bold text-lg tracking-tight">Explorer</h1>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
                  {getRank(state.level)} Rank
                </span>
                <div className="w-1 h-1 rounded-full bg-slate-600" />
                <span className="text-xs text-slate-400">Class II</span>
              </div>
            </div>
          </div>

          {/* Resources */}
          <div className="flex flex-col items-end gap-1.5">
            <div className="flex items-center gap-2 bg-slate-900/50 backdrop-blur-md px-3 py-1 rounded-lg border border-white/5">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500/20" />
              <span className="text-sm font-bold text-orange-100">{state.streak} <span className="text-[10px] text-orange-500/80">STRK</span></span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/50 backdrop-blur-md px-3 py-1 rounded-lg border border-white/5">
              <Gem className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
              <span className="text-sm font-bold text-cyan-100">{state.coins} <span className="text-[10px] text-cyan-500/80">CR</span></span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Hero / Portal */}
      <section className="relative z-10 px-4 mb-10">
        <div className="relative">
          {/* Decorative Rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-purple-500/20 rounded-[2rem] scale-105" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] border border-blue-500/10 rounded-[1.8rem]" />
          
          <motion.div 
            whileTap={{ scale: 0.98 }}
            className="bg-[#0f0f13] border border-white/10 rounded-[2rem] p-6 relative overflow-hidden group shadow-2xl shadow-purple-900/20"
          >
            {/* Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Header */}
            <div className="relative z-20 flex justify-between items-start mb-12">
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-3 py-1 rounded-full border border-white/5">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-green-400">AI Engine Ready</span>
              </div>
              <Bot className="w-5 h-5 text-purple-400 opacity-80" />
            </div>

            {/* Main CTA Content */}
            <div className="relative z-20 text-center space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-100 to-slate-300 bg-clip-text text-transparent tracking-tight">
                  Mission Protocol
                </h2>
                <p className="text-sm text-slate-400 max-w-[80%] mx-auto">
                  Generate a personalized micro-adventure based on your current bio-metrics.
                </p>
              </div>

              <motion.button
                onClick={() => navigate('/adventure/reveal')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className="w-full relative group/btn"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-40 group-hover/btn:opacity-75 transition duration-500" />
                <div className="relative bg-slate-900 border border-white/10 h-16 rounded-xl flex items-center justify-center gap-3 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                  <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
                  <span className="font-bold text-lg tracking-wide bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent uppercase">
                    Summon Mission
                  </span>
                </div>
              </motion.button>

              <div className="flex items-center justify-center gap-4 text-xs font-medium text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-yellow-500" />
                  {state.rerolls} Rerolls Available
                </span>
              </div>
            </div>

            {/* Floating particles (simulated) */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-purple-900/10 to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* 3. Secondary Controls */}
      <section className="px-4 grid grid-cols-2 gap-3 mb-10 relative z-10">
        <button 
          onClick={() => setMoodOpen(true)}
          className="group relative h-14 bg-slate-900/50 border border-white/5 rounded-xl overflow-hidden active:scale-95 transition-all"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-center gap-2 h-full relative z-10">
            <Bot className="w-4 h-4 text-purple-400" />
            <span className="font-semibold text-sm text-slate-200">Tune AI</span>
          </div>
        </button>

        <button 
          onClick={() => setFilterOpen(true)}
          className="group relative h-14 bg-slate-900/50 border border-white/5 rounded-xl overflow-hidden active:scale-95 transition-all"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-center gap-2 h-full relative z-10">
            <Sliders className="w-4 h-4 text-blue-400" />
            <span className="font-semibold text-sm text-slate-200">Adjust Loadout</span>
          </div>
        </button>
      </section>

      {/* 4. Daily Boss */}
      <section className="px-4 mb-10 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-sm uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <Swords className="w-4 h-4" />
            Elite Target
          </h3>
          <span className="text-[10px] font-bold bg-red-500/20 text-red-400 px-2 py-0.5 rounded border border-red-500/20 animate-pulse">
            LIMITED TIME EVENT
          </span>
        </div>

        <motion.div 
          whileHover={{ y: -2 }}
          className="bg-gradient-to-br from-[#1a1a1e] to-black border border-white/10 border-l-4 border-l-red-500 rounded-xl p-4 relative overflow-hidden shadow-lg"
        >
           {/* Boss Background Texture */}
           <div className="absolute right-0 top-0 w-32 h-32 bg-red-900/10 blur-2xl rounded-full pointer-events-none" />

           <div className="flex gap-4 relative z-10">
             <div className="w-12 h-12 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
               <Skull className="w-6 h-6 text-red-500" />
             </div>
             
             <div className="flex-1">
               <h4 className="font-bold text-slate-100 text-lg leading-tight mb-1">{DAILY_BOSS.title}</h4>
               
               <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                 <span className="flex items-center gap-1">
                   <Clock className="w-3 h-3" />
                   {DAILY_BOSS.duration}m
                 </span>
                 <span className="flex items-center gap-1">
                   <MapPin className="w-3 h-3" />
                   {DAILY_BOSS.distance}m
                 </span>
               </div>

               <div className="flex items-center justify-between">
                 <div className="flex items-center gap-1">
                   <span className="text-yellow-500 font-bold text-lg">+{DAILY_BOSS.xp}</span>
                   <span className="text-[10px] font-bold text-yellow-500/70 uppercase">XP Reward</span>
                 </div>
                 <button className="text-xs font-bold bg-white/5 hover:bg-white/10 text-white border border-white/10 px-3 py-1.5 rounded transition-colors">
                   Inspect
                 </button>
               </div>
             </div>
           </div>
        </motion.div>
      </section>

      {/* 5. Mission Log */}
      <section className="relative z-10 px-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-bold text-sm uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            Mission Log
          </h3>
          <button className="text-xs text-purple-400 hover:text-purple-300 transition-colors">View All</button>
        </div>

        <div className="overflow-x-auto pb-4 scrollbar-hide flex gap-3 -mx-4 px-4">
          {[
            { id: 1, title: 'Warsaw Old Town', rank: 'GOLD', xp: 150, date: '2h ago' },
            { id: 2, title: 'Vistula Cyber-Walk', rank: 'SILVER', xp: 80, date: 'Yesterday' },
            { id: 3, title: 'Neon Museum Raid', rank: 'PLATINUM', xp: 300, date: '3 days ago' }
          ].map((mission, i) => (
            <motion.div 
              key={mission.id}
              whileHover={{ scale: 1.02 }}
              className="min-w-[200px] bg-[#121215] border border-white/5 rounded-xl p-3 flex flex-col gap-3 group hover:border-purple-500/30 transition-colors shadow-lg relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-2 opacity-10">
                <MapPin className="w-12 h-12 text-slate-500" />
              </div>

              <div className="flex justify-between items-start relative z-10">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                  mission.rank === 'GOLD' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500' :
                  mission.rank === 'PLATINUM' ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-500' :
                  'bg-slate-800 border-white/5 text-slate-400'
                }`}>
                  <Trophy className="w-4 h-4" />
                </div>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                  mission.rank === 'GOLD' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                  mission.rank === 'PLATINUM' ? 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20' :
                  'bg-slate-800 text-slate-500 border-white/5'
                }`}>
                  {mission.rank}
                </span>
              </div>
              
              <div className="relative z-10">
                <h5 className="font-bold text-sm text-slate-200 truncate">{mission.title}</h5>
                <p className="text-[10px] text-slate-500 mt-0.5">{mission.date}</p>
              </div>

              <div className="mt-auto pt-2 border-t border-white/5 flex items-center justify-between relative z-10">
                <span className="text-xs font-bold text-slate-300">+{mission.xp} XP</span>
                <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-purple-400 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <SetMoodSheet open={moodOpen} onOpenChange={setMoodOpen} />
      <FiltersSheet open={filterOpen} onOpenChange={setFilterOpen} />
    </div>
  );
}
