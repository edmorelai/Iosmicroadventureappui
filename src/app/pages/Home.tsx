
import React, { useState } from 'react';
import { useGame } from '../store/gameStore';
import { Navbar } from '../components/ui/Navbar';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { SetMoodSheet } from '../components/sheets/SetMoodSheet';
import { FiltersSheet } from '../components/sheets/FiltersSheet';
import { Flame, Star, Coins, Sparkles, Clock, MapPin, SlidersHorizontal, UserPlus } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { DAILY_BOSS } from '../data/adventures';

export function Home() {
  const { state } = useGame();
  const navigate = useNavigate();
  const [moodOpen, setMoodOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar title="Today" largeTitle />
      
      <div className="px-4 space-y-6 pb-24">
        {/* Stats Row */}
        <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 flex-shrink-0">
            <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
            <span className="font-bold text-gray-800">{state.streak} Day Streak</span>
          </div>
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 flex-shrink-0">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            <span className="font-bold text-gray-800">Lvl {state.level}</span>
          </div>
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 flex-shrink-0">
            <Coins className="w-5 h-5 text-yellow-600" />
            <span className="font-bold text-gray-800">{state.coins}</span>
          </div>
        </div>

        {/* Hero Card */}
        <motion.div
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-6 bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden shadow-xl shadow-blue-200">
            <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
              <Sparkles className="w-40 h-40" />
            </div>
            
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-2">Ready for a tiny adventure?</h2>
              <p className="text-blue-100 mb-8 max-w-[80%]">
                Spark a micro-mission tailored to your mood and time.
              </p>
              
              <Button 
                onClick={() => navigate('/adventure/reveal')}
                className="w-full bg-white text-blue-600 hover:bg-blue-50 border-none shadow-lg h-14 text-lg font-bold"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Tap to Spark
              </Button>
              
              <div className="mt-4 flex justify-between text-sm text-blue-200 font-medium px-1">
                <span>{state.rerolls} Rerolls left</span>
                <button 
                  onClick={() => setFilterOpen(true)}
                  className="underline hover:text-white transition-colors"
                >
                  Adjust Filters
                </button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => setMoodOpen(true)}
              className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center space-x-2 font-semibold text-gray-700 active:bg-gray-50 active:scale-95 transition-all"
            >
                <Sparkles className="w-5 h-5 text-purple-500" />
                <span>Set Mood</span>
            </button>
            <button 
              onClick={() => setFilterOpen(true)}
              className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center space-x-2 font-semibold text-gray-700 active:bg-gray-50 active:scale-95 transition-all"
            >
                <SlidersHorizontal className="w-5 h-5 text-blue-500" />
                <span>Filters</span>
            </button>
        </div>

        {/* Daily Boss */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-lg text-gray-900">Daily Boss Challenge</h3>
            <span className="text-xs font-semibold bg-red-100 text-red-600 px-2 py-1 rounded-md">Expires in 4h</span>
          </div>
          
          <Card className="p-4 border-l-4 border-l-red-500">
            <div className="flex items-start space-x-4">
              <div className="bg-red-50 p-3 rounded-2xl">
                <Flame className="w-8 h-8 text-red-500" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900">{DAILY_BOSS.title}</h4>
                <div className="flex items-center text-sm text-gray-500 mt-1 space-x-3">
                  <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {DAILY_BOSS.duration}m</span>
                  <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> {DAILY_BOSS.distance}m</span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-bold text-yellow-600">+{DAILY_BOSS.xp} XP</span>
                  <Button size="sm" variant="secondary">View Details</Button>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Recent */}
        <section>
          <h3 className="font-bold text-lg text-gray-900 mb-3">Recently Completed</h3>
          {state.history.length === 0 ? (
            <div className="text-center py-8 text-gray-400 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <p>No adventures yet. Tap Spark to begin!</p>
            </div>
          ) : (
            <div className="space-y-3">
               {/* In a real app, map over history. For demo, showing a placeholder */}
               <Card className="p-3 flex items-center space-x-3 opacity-60">
                 <div className="bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center">
                   <Clock className="w-5 h-5 text-gray-500" />
                 </div>
                 <div>
                   <p className="font-medium text-gray-900">Morning Coffee Run</p>
                   <p className="text-xs text-gray-500">Yesterday • +50 XP</p>
                 </div>
               </Card>
            </div>
          )}
        </section>
      </div>

      <SetMoodSheet open={moodOpen} onOpenChange={setMoodOpen} />
      <FiltersSheet open={filterOpen} onOpenChange={setFilterOpen} />
    </div>
  );
}
