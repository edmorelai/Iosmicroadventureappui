
import React from 'react';
import { Navbar } from '../components/ui/Navbar';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useGame } from '../store/gameStore';
import { Calendar, TrendingUp, Map, Users, Cpu, Activity, Zap, Database } from 'lucide-react';

const data = [
  { name: 'Mon', xp: 120 },
  { name: 'Tue', xp: 200 },
  { name: 'Wed', xp: 150 },
  { name: 'Thu', xp: 80 },
  { name: 'Fri', xp: 250 },
  { name: 'Sat', xp: 300 },
  { name: 'Sun', xp: 100 },
];

export function Progress() {
  const { state } = useGame();

  return (
    <div className="flex flex-col min-h-screen pb-24 text-slate-100 bg-[#0a0a0c] relative">
      <Navbar title="Performance Metrics" largeTitle className="bg-transparent border-transparent" />
      
      <div className="px-4 space-y-6 relative z-10">
        {/* Main XP Chart */}
        <section>
          <div className="flex items-center justify-between mb-4">
             <h2 className="font-bold text-sm uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-500" />
                XP Activity Log
             </h2>
             <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-1 rounded-md">Last 7 Cycles</span>
          </div>
          <div className="p-4 h-64 bg-[#121215] border border-white/5 rounded-xl relative overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
            
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" fontSize={10} stroke="#475569" tickLine={false} axisLine={false} />
                <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.05)'}} 
                    contentStyle={{
                        backgroundColor: '#1e1e24', 
                        borderRadius: '8px', 
                        border: '1px solid rgba(255,255,255,0.1)', 
                        color: '#fff',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.5)'
                    }} 
                />
                <Bar dataKey="xp" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={12} className="drop-shadow-[0_0_4px_rgba(59,130,246,0.5)]" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 gap-3">
           <div className="p-4 flex flex-col items-center justify-center text-center space-y-2 bg-[#121215] border border-white/5 rounded-xl relative overflow-hidden group hover:border-purple-500/30 transition-colors">
             <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="p-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-1">
               <Database className="w-4 h-4 text-purple-400" />
             </div>
             <span className="text-2xl font-bold text-white tracking-tight drop-shadow-md">{state.history.length}</span>
             <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Missions</span>
           </div>
           
           <div className="p-4 flex flex-col items-center justify-center text-center space-y-2 bg-[#121215] border border-white/5 rounded-xl relative overflow-hidden group hover:border-green-500/30 transition-colors">
             <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="p-2 bg-green-500/10 border border-green-500/20 rounded-full mb-1">
               <Map className="w-4 h-4 text-green-400" />
             </div>
             <span className="text-2xl font-bold text-white tracking-tight drop-shadow-md">5</span>
             <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Sectors</span>
           </div>

           <div className="p-4 flex flex-col items-center justify-center text-center space-y-2 bg-[#121215] border border-white/5 rounded-xl relative overflow-hidden group hover:border-orange-500/30 transition-colors">
             <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="p-2 bg-orange-500/10 border border-orange-500/20 rounded-full mb-1">
               <Users className="w-4 h-4 text-orange-400" />
             </div>
             <span className="text-2xl font-bold text-white tracking-tight drop-shadow-md">2</span>
             <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Co-op Wins</span>
           </div>

           <div className="p-4 flex flex-col items-center justify-center text-center space-y-2 bg-[#121215] border border-white/5 rounded-xl relative overflow-hidden group hover:border-blue-500/30 transition-colors">
             <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-1">
               <Zap className="w-4 h-4 text-blue-400" />
             </div>
             <span className="text-2xl font-bold text-white tracking-tight drop-shadow-md">{state.streak}</span>
             <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Streak</span>
           </div>
        </section>

        {/* AI Insight */}
        <section>
          <h2 className="font-bold text-sm uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-indigo-500" />
            Tactical Analysis
          </h2>
          <div className="p-5 border border-indigo-500/30 bg-[#121215] rounded-xl relative overflow-hidden">
             <div className="absolute inset-0 bg-indigo-500/5" />
             <div className="relative z-10 flex gap-4">
                <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center shrink-0 border border-indigo-500/30">
                    <Cpu className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                    <h3 className="font-bold text-indigo-300 text-xs uppercase mb-2 tracking-wider">Optimization Suggestion</h3>
                    <p className="text-sm text-slate-300 leading-relaxed font-mono">
                    "Pattern detected: <strong className="text-green-400">Nature</strong> operations peak on weekends. Recommendation: Initiate <strong className="text-orange-400">Social</strong> protocols next Tuesday to balance skill tree."
                    </p>
                </div>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
}
