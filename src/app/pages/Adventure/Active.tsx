
import React, { useState, useEffect } from 'react';
import { useGame } from '../../store/gameStore';
import { Navbar } from '../../components/ui/Navbar';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { CheckCircle2, Circle, Clock, MapPin, Share2, HelpCircle } from 'lucide-react';
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
    if (confirm("Are you sure? You will lose your progress.")) {
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
    <div className="flex flex-col min-h-screen bg-gray-50 pb-24 relative">
      <Navbar 
        title="Mission Active" 
        rightAction={
          <button onClick={handleCancel} className="text-red-500 font-medium text-sm">Cancel</button>
        }
      />

      <div className="px-4 py-6 space-y-6">
        {/* Timer Card */}
        <div className="flex justify-center">
            <div className="bg-white rounded-full px-6 py-2 shadow-sm border border-gray-100 flex items-center space-x-2 font-mono text-xl font-bold text-gray-900">
                <Clock className="w-5 h-5 text-blue-600" />
                <span>{formatTime(timeLeft)}</span>
            </div>
        </div>

        <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">{adventure.title}</h1>
            <div className="flex justify-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> {adventure.distance}m</span>
                <span className="flex items-center text-orange-500 font-medium">+{adventure.xp} XP</span>
            </div>
        </div>

        {/* Steps */}
        <Card className="p-0 overflow-hidden bg-white border border-gray-100">
            <div className="p-4 bg-gray-50 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Checklist</h3>
            </div>
            <div className="divide-y divide-gray-100">
                {adventure.steps.map((step, index) => (
                    <button 
                        key={index} 
                        onClick={() => toggleStep(index)}
                        className="w-full flex items-start p-4 hover:bg-gray-50 transition-colors text-left"
                    >
                        <div className={`mt-0.5 mr-3 flex-shrink-0 transition-colors ${checkedSteps.includes(index) ? 'text-green-500' : 'text-gray-300'}`}>
                            {checkedSteps.includes(index) ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                        </div>
                        <span className={`text-gray-700 leading-relaxed ${checkedSteps.includes(index) ? 'line-through text-gray-400' : ''}`}>
                            {step}
                        </span>
                    </button>
                ))}
            </div>
        </Card>

        {/* Tips */}
        {adventure.tips && (
            <div className="bg-blue-50 p-4 rounded-2xl flex items-start space-x-3">
                <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                    <p className="font-semibold mb-1">AI Tip:</p>
                    <ul className="list-disc list-inside space-y-1 text-blue-800 opacity-90">
                        {adventure.tips.map((tip, i) => <li key={i}>{tip}</li>)}
                    </ul>
                </div>
            </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 z-50">
         <div className="max-w-md mx-auto flex space-x-3">
             <Button variant="secondary" className="flex-1">
                 <Share2 className="w-5 h-5 mr-2" />
                 Invite
             </Button>
             <Button 
                className="flex-[2] bg-green-600 hover:bg-green-700 text-white shadow-green-200"
                disabled={checkedSteps.length < adventure.steps.length}
                onClick={handleComplete}
             >
                 Complete Mission
             </Button>
         </div>
      </div>
    </div>
  );
}
