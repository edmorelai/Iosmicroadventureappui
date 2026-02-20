
import React, { useState, useEffect } from 'react';
import { useGame } from '../../store/gameStore';
import { Navbar } from '../../components/ui/Navbar';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { CheckCircle2, Circle, Clock, MapPin, Share2, HelpCircle, TriangleAlert, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { toast } from 'sonner';

export function ActiveMission() {
  const { state, completeAdventure, cancelAdventure } = useGame();
  const navigate = useNavigate();
  const [checkedSteps, setCheckedSteps] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(state.currentAdventure ? state.currentAdventure.duration * 60 : 0);

  useEffect(() => {
    if (!state.currentAdventure) {
      navigate('/');
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [state.currentAdventure, navigate]);

  const toggleStep = (index: number) => {
    setCheckedSteps((prev) => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const handleComplete = () => {
    if (state.currentAdventure) {
      completeAdventure(state.currentAdventure);
      navigate('/adventure/complete');
    }
  };

  const handleCancel = () => {
    if (confirm("WARNING: Aborting mission will result in XP forfeiture. Confirm?")) {
      cancelAdventure();
      navigate('/');
    }
  };

  if (!state.currentAdventure) return null;

  const adventure = state.currentAdventure;
  const progress = (checkedSteps.length / adventure.steps.length) * 100;
  
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0c] pb-24 relative overflow-hidden text-slate-100 font-sans">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
      <div className="absolute top-[-20%] right-[-20%] w-[50%] h-[50%] bg-blue-900/10 blur-[100px] rounded-full pointer-events-none" />

      <Navbar 
        title="Active Protocol" 
        className="bg-transparent border-transparent relative z-10"
        rightAction={
          <button onClick={handleCancel} className="text-red-500 hover:text-red-400 font-bold text-xs uppercase tracking-wider border border-red-900/50 bg-red-950/20 px-2 py-1 rounded transition-colors flex items-center gap-1">
            <TriangleAlert className="w-3 h-3" /> Abort
          </button>
        }
      />

      <div className="px-4 py-6 space-y-6 relative z-10">
        {/* Timer Card */}
        <div className="flex justify-center">
            <div className="bg-[#121215] rounded-lg px-6 py-2 shadow-[0_0_15px_rgba(59,130,246,0.2)] border border-blue-500/30 flex items-center space-x-3 font-mono text-2xl font-bold text-blue-400 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
                <Clock className="w-5 h-5 text-blue-500 animate-pulse" />
                <span>{formatTime(timeLeft)}</span>
            </div>
        </div>

        <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-white tracking-tight drop-shadow-md">{adventure.title}</h1>
            <div className="flex justify-center space-x-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> {adventure.distance}m Range</span>
                <span className="flex items-center text-yellow-500">+{adventure.xp} XP Bounty</span>
            </div>
        </div>

        {/* Steps */}
        <div className="overflow-hidden bg-[#121215] border border-white/10 rounded-xl relative group">
            <div className="absolute inset-0 bg-blue-900/5 group-hover:bg-blue-900/10 transition-colors pointer-events-none" />
            
            <div className="p-3 bg-black/40 border-b border-white/5 flex items-center justify-between">
                <h3 className="font-bold text-slate-400 text-xs uppercase tracking-widest flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    Objectives
                </h3>
                <span className="text-[10px] font-mono text-slate-500">{Math.round(progress)}% COMPLETE</span>
            </div>
            
            <div className="divide-y divide-white/5">
                {adventure.steps.map((step, index) => (
                    <button 
                        key={index} 
                        onClick={() => toggleStep(index)}
                        className="w-full flex items-start p-4 hover:bg-white/5 transition-colors text-left group/item relative"
                    >
                        <div className={`mt-0.5 mr-3 flex-shrink-0 transition-all duration-300 ${checkedSteps.includes(index) ? 'text-green-500 scale-110' : 'text-slate-600 group-hover/item:text-slate-400'}`}>
                            {checkedSteps.includes(index) ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                        </div>
                        <span className={`text-sm leading-relaxed transition-all ${checkedSteps.includes(index) ? 'line-through text-slate-600' : 'text-slate-200'}`}>
                            {step}
                        </span>
                        {checkedSteps.includes(index) && <div className="absolute inset-0 bg-green-500/5 pointer-events-none" />}
                    </button>
                ))}
            </div>
        </div>

        {/* Tips */}
        {adventure.tips && (
            <div className="bg-blue-900/10 border border-blue-500/20 p-4 rounded-xl flex items-start space-x-3 backdrop-blur-sm">
                <HelpCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-slate-300">
                    <p className="font-bold mb-1 text-blue-300 text-xs uppercase tracking-wider">Tactical Intel:</p>
                    <ul className="list-disc list-inside space-y-1 opacity-80 text-xs font-mono">
                        {adventure.tips.map((tip, i) => <li key={i}>{tip}</li>)}
                    </ul>
                </div>
            </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#0a0a0c]/90 backdrop-blur-xl border-t border-white/10 z-50">
         <div className="max-w-md mx-auto flex space-x-3">
             <Button variant="secondary" className="flex-1 bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 uppercase tracking-wider text-xs font-bold">
                 <Share2 className="w-4 h-4 mr-2" />
                 Signal
             </Button>
             <Button 
                className={`
                    flex-[2] text-white shadow-[0_0_20px_rgba(34,197,94,0.3)] uppercase tracking-wider text-xs font-bold transition-all
                    ${checkedSteps.length < adventure.steps.length 
                        ? 'bg-slate-800 text-slate-500 shadow-none cursor-not-allowed border border-white/5' 
                        : 'bg-green-600 hover:bg-green-500 border border-green-500/50'}
                `}
                disabled={checkedSteps.length < adventure.steps.length}
                onClick={handleComplete}
             >
                 Mission Complete
             </Button>
         </div>
      </div>
    </div>
  );
}
