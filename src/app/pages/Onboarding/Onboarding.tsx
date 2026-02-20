
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useGame } from '../../store/gameStore';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MapPin, Bell, Clock, Users, ArrowRight, Check, Bot, Fingerprint, Zap, Radar, Shield } from 'lucide-react';
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
      title: "SparkQuest Protocol",
      content: (
        <div className="space-y-6 text-center px-4">
          <div className="bg-blue-500/10 p-8 rounded-full inline-block animate-pulse border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.2)] relative">
             <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 rounded-full" />
             <Sparkles className="w-16 h-16 text-blue-400 relative z-10" />
          </div>
          <div className="space-y-4 text-left">
             <div className="flex items-center space-x-4 bg-[#121215] p-4 rounded-xl shadow-lg border border-white/5 relative overflow-hidden group">
                <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20"><Zap className="w-5 h-5 text-orange-400" /></div>
                <div className="flex flex-col">
                    <span className="font-bold text-slate-200 text-sm uppercase tracking-wide">Micro-Missions</span>
                    <span className="text-xs text-slate-500">Instant adventure generation.</span>
                </div>
             </div>
             <div className="flex items-center space-x-4 bg-[#121215] p-4 rounded-xl shadow-lg border border-white/5 relative overflow-hidden group">
                <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20"><Bot className="w-5 h-5 text-purple-400" /></div>
                <div className="flex flex-col">
                    <span className="font-bold text-slate-200 text-sm uppercase tracking-wide">AI Guidance</span>
                    <span className="text-xs text-slate-500">Tailored to your bio-metrics.</span>
                </div>
             </div>
             <div className="flex items-center space-x-4 bg-[#121215] p-4 rounded-xl shadow-lg border border-white/5 relative overflow-hidden group">
                <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20"><Shield className="w-5 h-5 text-green-400" /></div>
                <div className="flex flex-col">
                    <span className="font-bold text-slate-200 text-sm uppercase tracking-wide">Rank Up</span>
                    <span className="text-xs text-slate-500">Earn XP and elite status.</span>
                </div>
             </div>
          </div>
        </div>
      ),
      action: "Initialize System"
    },
    {
      title: "System Access",
      content: (
        <div className="space-y-4 px-4">
           <div className="p-5 flex items-center justify-between border border-blue-500/30 bg-blue-900/10 rounded-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-500/5 animate-pulse pointer-events-none" />
              <div className="flex items-center space-x-4 relative z-10">
                 <div className="bg-blue-500/20 p-2.5 rounded-lg border border-blue-500/30"><MapPin className="w-6 h-6 text-blue-400" /></div>
                 <div>
                    <h3 className="font-bold text-white text-sm uppercase tracking-wider">GPS Uplink</h3>
                    <p className="text-xs text-blue-300/80">Required for sector scanning.</p>
                 </div>
              </div>
              <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)] cursor-pointer">
                  <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition shadow-sm" />
              </div>
           </div>
           
           <div className="p-5 flex items-center justify-between border border-white/10 bg-[#121215] rounded-xl relative overflow-hidden">
              <div className="flex items-center space-x-4">
                 <div className="bg-slate-800 p-2.5 rounded-lg border border-white/5"><Bell className="w-6 h-6 text-slate-400" /></div>
                 <div>
                    <h3 className="font-bold text-slate-300 text-sm uppercase tracking-wider">Comms Link</h3>
                    <p className="text-xs text-slate-500">Mission alerts & updates.</p>
                 </div>
              </div>
              <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-700 shadow-inner cursor-pointer">
                  <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-slate-400 transition shadow-sm" />
              </div>
           </div>
        </div>
      ),
      action: "Grant Access"
    },
    {
      title: "Select Archetypes",
      content: (
        <div className="flex flex-wrap gap-3 justify-center px-4">
            {['Chill', 'Curious', 'Social', 'Active', 'Creative', 'Food', 'Nature', 'City'].map(vibe => (
                <button 
                  key={vibe}
                  onClick={() => toggleVibe(vibe)}
                  className={clsx(
                    "px-5 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 border",
                    selectedVibes.includes(vibe) 
                      ? "bg-blue-600 text-white border-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.4)]" 
                      : "bg-[#121215] border-white/10 text-slate-400 hover:border-blue-500/50 hover:text-blue-300 hover:bg-white/5"
                  )}
                >
                    {vibe}
                </button>
            ))}
            <p className="text-xs text-slate-500 mt-6 w-full text-center font-mono">SELECT 2-3 PARAMETERS TO CALIBRATE AI</p>
        </div>
      ),
      action: "Calibrate"
    },
    {
      title: "Social Stealth",
      content: (
        <div className="space-y-8 py-8 px-4">
            <div className="text-center space-y-4">
                <div className="w-32 h-32 mx-auto rounded-full border-4 border-slate-800 flex items-center justify-center relative">
                    <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin duration-[3s]" />
                    <span className="text-5xl font-bold text-white tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">{socialLevel}</span>
                </div>
                <p className="text-blue-300 font-bold text-sm uppercase tracking-widest bg-blue-900/20 py-2 rounded-lg border border-blue-500/20">
                  {socialLevel === 1 && "Solo Operative"}
                  {socialLevel === 2 && "Low Profile Interaction"}
                  {socialLevel === 3 && "Standard Interaction"}
                  {socialLevel === 4 && "Active Engagement"}
                  {socialLevel === 5 && "Full Social Integration"}
                </p>
            </div>
            <div className="px-4">
              <input 
                type="range" 
                min="1" 
                max="5" 
                value={socialLevel}
                onChange={(e) => setSocialLevel(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500" 
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-3 font-bold uppercase tracking-widest">
                <span>Ghost</span>
                <span>Influencer</span>
              </div>
            </div>
        </div>
      ),
      action: "Confirm Level"
    },
    {
      title: "Time Allocation",
      content: (
        <div className="space-y-8 px-4">
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                 <Clock className="w-4 h-4" /> Available Window
              </h3>
              <div className="flex justify-between bg-[#121215] p-1 rounded-xl border border-white/5">
                 {['5m', '15m', '30m', '60m+'].map((t) => (
                     <button 
                       key={t} 
                       onClick={() => setTimeBudget(t)}
                       className={clsx(
                         "flex-1 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all", 
                         timeBudget === t 
                            ? 'bg-slate-700 text-white shadow-lg border border-white/10' 
                            : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                       )}
                     >
                         {t}
                     </button>
                 ))}
              </div>
            </div>
            
            <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="flex justify-between items-center">
                   <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Radar className="w-4 h-4" /> Chaos Factor
                   </label>
                   <span className="text-[10px] font-bold bg-purple-500/20 text-purple-300 px-2 py-1 rounded border border-purple-500/30">90% WILD</span>
                </div>
                <input type="range" min="10" max="100" defaultValue="90" className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500" />
                <p className="text-[10px] text-slate-500 font-mono">WARNING: High variance increases unpredictable mission parameters.</p>
            </div>
        </div>
      ),
      action: "Execute Launch"
    }
  ];

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0c] p-6 justify-between safe-area-inset-bottom font-sans text-slate-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
      <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="flex-1 flex flex-col pt-20 relative z-10">
          <div className="flex space-x-1 mb-10">
             {steps.map((_, i) => (
                 <div key={i} className={clsx("h-1 flex-1 rounded-full transition-all duration-500", i <= step ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'bg-slate-800')} />
             ))}
          </div>

          <AnimatePresence mode="wait">
             <motion.div
               key={step}
               initial={{ opacity: 0, x: 20, filter: 'blur(5px)' }}
               animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
               exit={{ opacity: 0, x: -20, filter: 'blur(5px)' }}
               transition={{ duration: 0.3 }}
               className="flex-1 flex flex-col"
             >
                <h1 className="text-2xl font-bold text-white mb-8 text-center uppercase tracking-tight drop-shadow-md">{steps[step].title}</h1>
                <div className="flex-1 flex flex-col justify-center">
                    {steps[step].content}
                </div>
             </motion.div>
          </AnimatePresence>
      </div>

      <div className="pt-6 relative z-10">
        <Button 
          onClick={handleNext}
          className="w-full h-14 text-sm font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(37,99,235,0.4)] mb-4 bg-blue-600 hover:bg-blue-500 border border-blue-400/50 hover:scale-[1.02] transition-all"
        >
          {steps[step].action}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
        {step === 1 && (
            <button onClick={handleNext} className="w-full text-center text-slate-500 hover:text-slate-300 font-bold text-xs uppercase tracking-wider transition-colors">
                Skip Authorization
            </button>
        )}
      </div>
    </div>
  );
}
