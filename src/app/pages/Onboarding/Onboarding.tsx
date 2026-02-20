
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useGame } from '../../store/gameStore';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MapPin, Bell, Clock, Users, ArrowRight, Check } from 'lucide-react';
import { clsx } from 'clsx';

export function Onboarding() {
  const navigate = useNavigate();
  const { setOnboardingComplete, updatePreferences } = useGame();
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      setOnboardingComplete(true);
      navigate('/');
    }
  };

  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  const [socialLevel, setSocialLevel] = useState(2);
  const [timeBudget, setTimeBudget] = useState('30m');

  const toggleVibe = (vibe: string) => {
    setSelectedVibes(prev => 
      prev.includes(vibe) ? prev.filter(v => v !== vibe) : [...prev, vibe]
    );
  };

  const steps = [
    {
      title: "Tiny adventures. Big mood shift.",
      content: (
        <div className="space-y-6 text-center px-4">
          <div className="bg-blue-100 p-8 rounded-full inline-block animate-bounce-slow">
             <Sparkles className="w-16 h-16 text-blue-600" />
          </div>
          <div className="space-y-4 text-left">
             <div className="flex items-center space-x-3 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <div className="bg-orange-100 p-2.5 rounded-xl"><Sparkles className="w-5 h-5 text-orange-600" /></div>
                <span className="font-semibold text-gray-800">One-tap micro-adventures</span>
             </div>
             <div className="flex items-center space-x-3 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <div className="bg-purple-100 p-2.5 rounded-xl"><Users className="w-5 h-5 text-purple-600" /></div>
                <span className="font-semibold text-gray-800">Personalized by AI</span>
             </div>
             <div className="flex items-center space-x-3 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <div className="bg-green-100 p-2.5 rounded-xl"><Check className="w-5 h-5 text-green-600" /></div>
                <span className="font-semibold text-gray-800">Earn XP, streaks, rewards</span>
             </div>
          </div>
        </div>
      ),
      action: "Get Started"
    },
    {
      title: "Enable Permissions",
      content: (
        <div className="space-y-4 px-4">
           <Card className="p-4 flex items-center justify-between border border-blue-100 bg-blue-50/50">
              <div className="flex items-center space-x-3">
                 <div className="bg-blue-200 p-2 rounded-lg"><MapPin className="w-5 h-5 text-blue-700" /></div>
                 <div>
                    <h3 className="font-bold text-gray-900">Location</h3>
                    <p className="text-xs text-gray-500">Find adventures nearby</p>
                 </div>
              </div>
              <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 shadow-sm ring-1 ring-blue-600/10">
                  <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition shadow-sm" />
              </div>
           </Card>
           
           <Card className="p-4 flex items-center justify-between border border-gray-100">
              <div className="flex items-center space-x-3">
                 <div className="bg-gray-200 p-2 rounded-lg"><Bell className="w-5 h-5 text-gray-700" /></div>
                 <div>
                    <h3 className="font-bold text-gray-900">Notifications</h3>
                    <p className="text-xs text-gray-500">Daily Boss & Streaks</p>
                 </div>
              </div>
              <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 shadow-inner">
                  <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition shadow-sm" />
              </div>
           </Card>
        </div>
      ),
      action: "Enable & Continue"
    },
    {
      title: "Pick your vibe",
      content: (
        <div className="flex flex-wrap gap-3 justify-center px-4">
            {['Chill', 'Curious', 'Social', 'Active', 'Creative', 'Food', 'Nature', 'City'].map(vibe => (
                <button 
                  key={vibe}
                  onClick={() => toggleVibe(vibe)}
                  className={clsx(
                    "px-5 py-2.5 rounded-full font-semibold transition-all duration-200 active:scale-95",
                    selectedVibes.includes(vibe) 
                      ? "bg-blue-600 text-white shadow-md shadow-blue-200 border border-transparent" 
                      : "bg-white border border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-blue-50"
                  )}
                >
                    {vibe}
                </button>
            ))}
            <p className="text-sm text-gray-400 mt-4 w-full text-center">Pick 2-3 to start</p>
        </div>
      ),
      action: "Continue"
    },
    {
      title: "Social Comfort",
      content: (
        <div className="space-y-8 py-8 px-4">
            <div className="text-center space-y-2">
                <span className="text-5xl font-bold text-blue-600 tracking-tighter">Level {socialLevel}</span>
                <p className="text-gray-600 font-medium text-lg">
                  {socialLevel === 1 && "Solo only please"}
                  {socialLevel === 2 && "I can ask for directions"}
                  {socialLevel === 3 && "I can compliment someone"}
                  {socialLevel === 4 && "I can start a conversation"}
                  {socialLevel === 5 && "I'll talk to anyone!"}
                </p>
            </div>
            <div className="px-4">
              <input 
                type="range" 
                min="1" 
                max="5" 
                value={socialLevel}
                onChange={(e) => setSocialLevel(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" 
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium">
                <span>Solo</span>
                <span>Social Butterfly</span>
              </div>
            </div>
        </div>
      ),
      action: "Continue"
    },
    {
      title: "Time Budget",
      content: (
        <div className="space-y-8 px-4">
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">How much time?</h3>
              <div className="flex justify-between bg-gray-100 p-1 rounded-xl">
                 {['5m', '15m', '30m', '60m+'].map((t) => (
                     <button 
                       key={t} 
                       onClick={() => setTimeBudget(t)}
                       className={clsx(
                         "flex-1 py-3 rounded-lg text-sm font-bold transition-all shadow-sm", 
                         timeBudget === t ? 'bg-white text-blue-600 shadow-md transform scale-105' : 'text-gray-500 hover:text-gray-900 bg-transparent shadow-none'
                       )}
                     >
                         {t}
                     </button>
                 ))}
              </div>
            </div>
            
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                   <label className="text-sm font-bold text-gray-900 uppercase tracking-wide">Randomness</label>
                   <span className="text-xs font-bold bg-purple-100 text-purple-700 px-2 py-1 rounded-md">Wild (90%)</span>
                </div>
                <input type="range" min="10" max="100" defaultValue="90" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600" />
                <p className="text-xs text-gray-400">Higher randomness means more unexpected adventures.</p>
            </div>
        </div>
      ),
      action: "Start SparkQuest"
    }
  ];

  return (
    <div className="flex flex-col h-screen bg-white p-6 justify-between safe-area-inset-bottom">
      <div className="flex-1 flex flex-col pt-10">
          <div className="flex space-x-1 mb-8">
             {steps.map((_, i) => (
                 <div key={i} className={clsx("h-1 flex-1 rounded-full transition-colors", i <= step ? 'bg-blue-600' : 'bg-gray-100')} />
             ))}
          </div>

          <AnimatePresence mode="wait">
             <motion.div
               key={step}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               className="flex-1 flex flex-col"
             >
                <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">{steps[step].title}</h1>
                <div className="flex-1 flex flex-col justify-center">
                    {steps[step].content}
                </div>
             </motion.div>
          </AnimatePresence>
      </div>

      <div className="pt-6">
        <Button 
          onClick={handleNext}
          className="w-full h-14 text-lg font-bold shadow-xl shadow-blue-100 mb-4"
        >
          {steps[step].action}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
        {step === 1 && (
            <button onClick={handleNext} className="w-full text-center text-gray-400 font-medium text-sm">
                Not now
            </button>
        )}
      </div>
    </div>
  );
}
