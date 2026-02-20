
import React from 'react';
import { Navbar } from '../components/ui/Navbar';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Trophy, Clock, Target, Calendar, Award, Swords, Skull, Flame } from 'lucide-react';
import { DAILY_BOSS } from '../data/adventures';

export function Challenges() {
  return (
    <div className="flex flex-col min-h-screen pb-24 text-slate-100 bg-[#0a0a0c] relative">
      <Navbar title="Active Raids" largeTitle className="bg-transparent border-transparent" />
      
      <div className="px-4 space-y-6 relative z-10">
        {/* Daily Boss */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-sm uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Skull className="w-4 h-4 text-red-500" />
              Primary Target
            </h2>
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full animate-pulse">
              <Clock className="w-3 h-3 text-red-400" />
              <span className="text-xs font-bold text-red-400">04:23 REMAINING</span>
            </div>
          </div>
          
          <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#1a0505] to-[#0a0a0c] border border-red-500/30 p-1">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-[60px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 p-5 flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="w-14 h-14 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                    <Target className="w-7 h-7 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight drop-shadow-md">{DAILY_BOSS.title}</h3>
                    <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs font-bold text-red-400 uppercase tracking-wider bg-red-950/50 px-2 py-0.5 rounded border border-red-900">Hard</span>
                        <span className="text-xs text-red-300 flex items-center gap-1">
                            <Flame className="w-3 h-3" /> +{DAILY_BOSS.xp} XP
                        </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-black/40 backdrop-blur-sm border border-red-900/30 rounded-lg p-3">
                <p className="text-sm text-slate-300 italic">
                  "{DAILY_BOSS.description}"
                </p>
              </div>

              <button className="w-full h-12 bg-red-600 hover:bg-red-500 text-white font-bold uppercase tracking-wider rounded-lg shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all active:scale-[0.98] flex items-center justify-center gap-2 group-hover:shadow-[0_0_30px_rgba(220,38,38,0.6)]">
                <Swords className="w-4 h-4" />
                Engage Target
              </button>
            </div>
          </div>
        </section>

        {/* Weekly Quest */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-sm uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Weekly Operation
            </h2>
            <span className="text-xs text-slate-500 font-mono">RESET: 3D 12H</span>
          </div>
          
          <div className="bg-[#121215] border border-white/5 rounded-xl p-5 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div>
                <h3 className="font-bold text-white text-lg">Operation: Explorer</h3>
                <p className="text-xs text-slate-400 mt-1">Complete 5 unique sector scans.</p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-2xl font-bold text-blue-400">2<span className="text-slate-600 text-sm">/5</span></span>
              </div>
            </div>

            <div className="w-full bg-slate-800/50 rounded-full h-2 mb-6 relative z-10 overflow-hidden">
              <div className="bg-blue-500 h-full rounded-full w-[40%] shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
            </div>

            <div className="flex gap-2 relative z-10">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={`
                    flex-1 h-10 rounded-lg flex items-center justify-center border transition-all
                    ${i <= 2 
                        ? 'bg-blue-500/20 border-blue-500/40 text-blue-400' 
                        : 'bg-slate-800/30 border-white/5 text-slate-600'}
                `}>
                    {i <= 2 ? <Trophy className="w-4 h-4" /> : <span className="text-xs font-bold">{i}</span>}
                </div>
              ))}
            </div>
            
            {/* Background glow */}
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500/5 blur-[50px] rounded-full pointer-events-none" />
          </div>
        </section>

        {/* Season Journey */}
        <section>
          <h2 className="font-bold text-sm uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
            <Award className="w-4 h-4" />
            Battle Pass
          </h2>
          <div className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-500/20 rounded-xl p-5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
            
            <div className="flex items-center justify-between relative z-10">
              <div>
                <h3 className="font-bold text-lg text-white group-hover:text-purple-200 transition-colors">Season 1: Awakening</h3>
                <p className="text-xs text-purple-300/80 uppercase tracking-wider font-bold mt-1">Tier 12 <span className="text-slate-500">/ 50</span></p>
              </div>
              <div className="w-12 h-12 bg-yellow-500/10 border border-yellow-500/20 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                <Award className="w-6 h-6 text-yellow-500" />
              </div>
            </div>

            <div className="mt-6 w-full bg-black/40 rounded-full h-3 border border-white/5 relative overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-yellow-500 h-full rounded-full w-[24%] shadow-[0_0_15px_rgba(168,85,247,0.5)] relative">
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/50 blur-[1px]" />
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center text-xs relative z-10">
              <span className="text-slate-400">Next: <span className="text-yellow-400 font-bold">Golden Compass Protocol</span></span>
              <span className="text-slate-500 font-mono">120 XP REQ</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
