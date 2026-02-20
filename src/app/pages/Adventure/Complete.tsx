
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
  // In a real app, pass the completed adventure via location state or store
  // For demo, we assume the last history item is the one just completed

  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-blue-600 text-white items-center justify-center p-6 relative overflow-hidden">
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="text-center z-10"
      >
        <div className="bg-white/20 p-6 rounded-full inline-block mb-6 backdrop-blur-md border border-white/30">
          <CheckCircle className="w-16 h-16 text-white" />
        </div>
        
        <h1 className="text-4xl font-bold mb-2">Mission Complete!</h1>
        <p className="text-blue-100 text-lg mb-8">You sparked a tiny adventure.</p>
        
        <div className="grid grid-cols-2 gap-4 mb-8 w-full max-w-xs mx-auto">
          <motion.div 
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.3 }}
             className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 flex flex-col items-center"
          >
             <Star className="w-8 h-8 text-yellow-300 mb-2" />
             <span className="text-2xl font-bold">+120</span>
             <span className="text-xs uppercase tracking-wider text-blue-200">XP Earned</span>
          </motion.div>

          <motion.div 
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.4 }}
             className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 flex flex-col items-center"
          >
             <Trophy className="w-8 h-8 text-orange-300 mb-2" />
             <span className="text-2xl font-bold">{state.streak}</span>
             <span className="text-xs uppercase tracking-wider text-blue-200">Day Streak</span>
          </motion.div>
        </div>

        <div className="space-y-3 w-full max-w-xs mx-auto">
          <Button 
            onClick={() => navigate('/')}
            className="w-full bg-white text-blue-600 hover:bg-blue-50 h-14 font-bold text-lg shadow-xl"
          >
            Continue Journey
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full text-blue-100 hover:bg-white/10 hover:text-white"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share Proof
          </Button>
        </div>
      </motion.div>
      
      {/* Decorative Circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />
      <div className="absolute bottom-0 left-20 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000" />
    </div>
  );
}
