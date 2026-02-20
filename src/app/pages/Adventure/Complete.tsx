
import React, { useEffect } from 'react';
import { useGame } from '../../store/gameStore';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { CheckCircle, Share2, ArrowRight, Star, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

export function AdventureComplete() {
  const { state } = useGame();
  const navigate = useNavigate();

  useEffect(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#a855f7', '#3b82f6', '#22d3ee']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#a855f7', '#3b82f6', '#22d3ee']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0c] text-white items-center justify-center p-6 relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
      <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-blue-900/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-purple-900/20 blur-[150px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="text-center z-10 w-full max-w-sm"
      >
        <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-green-500 blur-2xl opacity-20 animate-pulse rounded-full" />
            <div className="bg-[#0a0a0c] p-6 rounded-full relative border border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                <CheckCircle className="w-16 h-16 text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
            </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-2 tracking-tight uppercase">Operation Success</h1>
        <p className="text-slate-400 text-sm mb-10 tracking-wide font-mono">ADVENTURE PROTOCOL COMPLETE</p>
        
        <div className="grid grid-cols-2 gap-4 mb-10">
          <motion.div 
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.3 }}
             className="bg-[#121215]/80 backdrop-blur-md rounded-2xl p-5 border border-yellow-500/20 flex flex-col items-center shadow-[0_0_15px_rgba(234,179,8,0.1)] relative overflow-hidden group"
          >
             <div className="absolute inset-0 bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
             <Star className="w-8 h-8 text-yellow-500 mb-2 drop-shadow-[0_0_5px_rgba(234,179,8,0.8)]" />
             <span className="text-3xl font-bold text-white tracking-tight">+120</span>
             <span className="text-[10px] font-bold uppercase tracking-widest text-yellow-500/80 mt-1">XP Gained</span>
          </motion.div>

          <motion.div 
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.4 }}
             className="bg-[#121215]/80 backdrop-blur-md rounded-2xl p-5 border border-purple-500/20 flex flex-col items-center shadow-[0_0_15px_rgba(168,85,247,0.1)] relative overflow-hidden group"
          >
             <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
             <Trophy className="w-8 h-8 text-purple-500 mb-2 drop-shadow-[0_0_5px_rgba(168,85,247,0.8)]" />
             <span className="text-3xl font-bold text-white tracking-tight">{state.streak}</span>
             <span className="text-[10px] font-bold uppercase tracking-widest text-purple-500/80 mt-1">Day Streak</span>
          </motion.div>
        </div>

        <div className="space-y-4">
          <Button 
            onClick={() => navigate('/')}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white h-14 font-bold text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(37,99,235,0.4)] border border-blue-400/50 transition-all hover:scale-[1.02]"
          >
            Return to Base
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full text-slate-400 hover:bg-white/5 hover:text-white uppercase tracking-widest text-xs font-bold border border-transparent hover:border-white/10"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share Debrief
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
