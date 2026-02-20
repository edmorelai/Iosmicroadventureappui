
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import { useGame } from '../../store/gameStore';
import { Navbar } from '../../components/ui/Navbar';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { MapPin, Clock, Zap, X, Check, Dices, HelpCircle, ArrowLeft } from 'lucide-react';
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
        toast.error("No rerolls left today!");
        return;
    }
    const next = rerollAdventure();
    if (next) {
        setDirection('left');
        setTimeout(() => {
            setAdventure(next);
            setDirection(null);
            toast.success("Rerolled!");
        }, 200);
    }
  };

  if (!adventure) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
      <Navbar 
        className="bg-transparent border-none" 
        rightAction={
           <div className="bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm">
             {state.rerolls} Rerolls
           </div>
        }
      >
        <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-full shadow-sm">
           <ArrowLeft className="w-5 h-5" />
        </button>
      </Navbar>

      <div className="flex-1 flex flex-col justify-center px-4 py-6 relative">
        <AnimatePresence>
            <motion.div
              key={adventure.id}
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ 
                scale: 1, 
                opacity: 1, 
                y: 0, 
                x: direction === 'left' ? -500 : direction === 'right' ? 500 : 0,
                rotate: direction === 'left' ? -20 : direction === 'right' ? 20 : 0
              }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-full max-w-md mx-auto aspect-[3/4] relative"
            >
              <Card className="h-full flex flex-col relative overflow-hidden shadow-2xl border-none">
                 {/* Image Placeholder */}
                 <div className="h-2/5 bg-gray-200 relative">
                    <img 
                      src={`https://source.unsplash.com/800x600/?${adventure.imageQuery}`} 
                      alt={adventure.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm uppercase tracking-wide">
                        {adventure.category}
                    </div>
                 </div>

                 <div className="flex-1 p-6 flex flex-col">
                    <div className="mb-auto">
                        <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-2">{adventure.title}</h2>
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="flex items-center text-sm bg-gray-100 px-2 py-1 rounded-md text-gray-600">
                                <Clock className="w-3 h-3 mr-1" /> {adventure.duration}m
                            </span>
                            <span className="flex items-center text-sm bg-gray-100 px-2 py-1 rounded-md text-gray-600">
                                <Zap className="w-3 h-3 mr-1" /> {adventure.difficulty}
                            </span>
                             <span className="flex items-center text-sm bg-gray-100 px-2 py-1 rounded-md text-gray-600">
                                <MapPin className="w-3 h-3 mr-1" /> {adventure.distance}m
                            </span>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            {adventure.description}
                        </p>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-100">
                        <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                             <span>Reward</span>
                             <button className="flex items-center text-blue-600 font-medium">
                                <HelpCircle className="w-3 h-3 mr-1" /> Why this?
                             </button>
                        </div>
                        <div className="flex items-center space-x-4">
                             <div className="flex flex-col">
                                 <span className="text-2xl font-bold text-yellow-500">+{adventure.xp} XP</span>
                             </div>
                             <div className="w-px h-8 bg-gray-200" />
                             <div className="flex flex-col">
                                 <span className="text-2xl font-bold text-yellow-600">+{adventure.coins} Coins</span>
                             </div>
                        </div>
                    </div>
                 </div>
              </Card>
            </motion.div>
        </AnimatePresence>
      </div>

      <div className="px-6 pb-10 pt-4 flex items-center justify-between max-w-md mx-auto w-full space-x-6">
         <button 
           onClick={handleSkip}
           className="w-16 h-16 rounded-full bg-white text-red-500 shadow-lg flex items-center justify-center hover:bg-red-50 active:scale-95 transition-all border border-gray-100"
         >
             <X className="w-8 h-8" />
         </button>

         <button 
            onClick={handleReroll}
            className="flex flex-col items-center justify-center space-y-1 text-gray-500 hover:text-blue-600 transition-colors"
         >
             <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center border border-gray-100">
                <Dices className="w-6 h-6" />
             </div>
             <span className="text-xs font-medium">Reroll</span>
         </button>

         <button 
           onClick={handleAccept}
           className="w-16 h-16 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center hover:bg-blue-700 active:scale-95 transition-all shadow-blue-200"
         >
             <Check className="w-8 h-8" />
         </button>
      </div>
    </div>
  );
}
