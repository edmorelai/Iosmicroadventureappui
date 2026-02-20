
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import { useGame } from '../../store/gameStore';
import { Navbar } from '../../components/ui/Navbar';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { MapPin, Clock, Zap, X, Check, RefreshCw, HelpCircle, ArrowLeft, Loader2, Signal } from 'lucide-react';
import { Adventure } from '../../data/adventures';
import { toast } from 'sonner';

export function AdventureReveal() {
  const { generateAdventure, rerollAdventure, startAdventure, state } = useGame();
  const navigate = useNavigate();
  const [adventure, setAdventure] = useState<Adventure | null>(null);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);

  useEffect(() => {
    setAdventure(generateAdventure());
  }, []);

  const handleAccept = () => {
    if (!adventure) return;
    setDirection('right');
    setTimeout(() => {
      startAdventure(adventure);
      navigate('/adventure/active');
    }, 200);
  };

  const handleSkip = () => {
    setDirection('left');
    setTimeout(() => {
        const next = generateAdventure(); // In real app, avoid repeats
        setAdventure(next);
        setDirection(null);
    }, 200);
  };

  const handleReroll = () => {
    if (state.rerolls <= 0) {
        toast.error("Reroll cap reached for this cycle.");
        return;
    }
    const next = rerollAdventure();
    if (next) {
        setDirection('left');
        setTimeout(() => {
            setAdventure(next);
            setDirection(null);
            toast.success("Signal Refreshed");
        }, 200);
    }
  };

  if (!adventure) return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#0a0a0c] text-blue-400 gap-4">
        <Loader2 className="w-12 h-12 animate-spin" />
        <span className="font-mono text-sm tracking-widest animate-pulse">DECRYPTING MISSION DATA...</span>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0c] overflow-hidden relative font-sans text-slate-100">
      {/* Background FX */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-purple-900/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-blue-900/20 blur-[100px] rounded-full pointer-events-none" />

      <Navbar 
        className="bg-transparent border-none relative z-10" 
        rightAction={
           <div className="bg-black/40 backdrop-blur border border-white/10 px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-2">
             <Signal className="w-3 h-3 text-green-500" />
             {state.rerolls} Rerolls
           </div>
        }
      >
        <button onClick={() => navigate(-1)} className="p-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors">
           <ArrowLeft className="w-5 h-5 text-slate-300" />
        </button>
      </Navbar>

      <div className="flex-1 flex flex-col justify-center px-4 py-6 relative z-10">
        <AnimatePresence mode="wait">
            <motion.div
              key={adventure.id}
              initial={{ scale: 0.9, opacity: 0, y: 50, rotateX: 10 }}
              animate={{ 
                scale: 1, 
                opacity: 1, 
                y: 0, 
                rotateX: 0,
                x: direction === 'left' ? -500 : direction === 'right' ? 500 : 0,
                rotate: direction === 'left' ? -20 : direction === 'right' ? 20 : 0
              }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-full max-w-md mx-auto aspect-[3/4] relative perspective-1000"
            >
              <Card className="h-full flex flex-col relative overflow-hidden shadow-2xl border border-white/10 bg-[#121215] rounded-3xl">
                 {/* Image Placeholder */}
                 <div className="h-2/5 bg-slate-900 relative overflow-hidden group">
                    <img 
                      src={adventure.imageUrl} 
                      alt={adventure.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121215] to-transparent" />
                    
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur px-3 py-1 rounded-full border border-white/10 text-xs font-bold text-slate-200 uppercase tracking-wide">
                        {adventure.category} Protocol
                    </div>
                 </div>

                 <div className="flex-1 p-6 flex flex-col relative">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                    
                    <div className="mb-auto">
                        <h2 className="text-3xl font-bold text-white leading-tight mb-3 tracking-tight drop-shadow-md">{adventure.title}</h2>
                        <div className="flex flex-wrap gap-2 mb-6">
                            <span className="flex items-center text-xs font-bold bg-blue-500/10 border border-blue-500/20 px-2 py-1 rounded text-blue-400">
                                <Clock className="w-3 h-3 mr-1" /> {adventure.duration}m
                            </span>
                            <span className="flex items-center text-xs font-bold bg-purple-500/10 border border-purple-500/20 px-2 py-1 rounded text-purple-400 uppercase">
                                <Zap className="w-3 h-3 mr-1" /> {adventure.difficulty}
                            </span>
                             <span className="flex items-center text-xs font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded text-emerald-400">
                                <MapPin className="w-3 h-3 mr-1" /> {adventure.distance}m
                            </span>
                        </div>
                        <p className="text-slate-400 leading-relaxed text-sm border-l-2 border-white/10 pl-3">
                            "{adventure.description}"
                        </p>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/5">
                        <div className="flex justify-between items-center text-xs text-slate-500 mb-2 font-mono uppercase tracking-wider">
                             <span>Mission Rewards</span>
                        </div>
                        <div className="flex items-center space-x-6">
                             <div className="flex flex-col">
                                 <span className="text-2xl font-bold text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]">+{adventure.xp} XP</span>
                             </div>
                             <div className="w-px h-8 bg-white/10" />
                             <div className="flex flex-col">
                                 <span className="text-2xl font-bold text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">+{adventure.coins} CR</span>
                             </div>
                        </div>
                    </div>
                 </div>
              </Card>
            </motion.div>
        </AnimatePresence>
      </div>

      <div className="px-6 pb-10 pt-4 flex items-center justify-between max-w-md mx-auto w-full gap-6 relative z-10">
         <button 
           onClick={handleSkip}
           className="w-16 h-16 rounded-2xl bg-[#1a1a1e] border border-white/10 text-red-500 flex items-center justify-center hover:bg-red-500/10 hover:border-red-500/30 active:scale-95 transition-all group"
         >
             <X className="w-8 h-8 group-hover:scale-110 transition-transform" />
         </button>

         <button 
            onClick={handleReroll}
            className="flex flex-col items-center justify-center space-y-2 text-slate-500 hover:text-blue-400 transition-colors group"
         >
             <div className="w-12 h-12 rounded-full bg-[#1a1a1e] border border-white/10 flex items-center justify-center group-hover:border-blue-500/50 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all">
                <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
             </div>
             <span className="text-[10px] font-bold uppercase tracking-widest">Refresh</span>
         </button>

         <button 
           onClick={handleAccept}
           className="w-16 h-16 rounded-2xl bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center justify-center hover:bg-blue-500 active:scale-95 transition-all group border border-blue-400/50"
         >
             <Check className="w-8 h-8 group-hover:scale-110 transition-transform" />
         </button>
      </div>
    </div>
  );
}
