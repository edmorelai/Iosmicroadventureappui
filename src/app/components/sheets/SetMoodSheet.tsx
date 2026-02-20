
import React, { useState } from 'react';
import { BottomSheet } from '../ui/BottomSheet';
import { Button } from '../ui/Button';
import { clsx } from 'clsx';
import { useGame } from '../../store/gameStore';

interface SetMoodSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SetMoodSheet({ open, onOpenChange }: SetMoodSheetProps) {
  const { setMood } = useGame();
  const [selectedMood, setSelected] = useState<string | null>(null);
  
  const moods = [
    { label: 'Low Energy', color: 'bg-blue-100 text-blue-700' },
    { label: 'Neutral', color: 'bg-gray-100 text-gray-700' },
    { label: 'High Energy', color: 'bg-orange-100 text-orange-700' },
  ];

  const handleApply = () => {
    if (selectedMood) {
        setMood(selectedMood);
    }
    onOpenChange(false);
  };

  return (
    <BottomSheet open={open} onOpenChange={onOpenChange} title="How do you feel?">
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-3">
            {moods.map((m) => (
                <button 
                  key={m.label}
                  onClick={() => setSelected(m.label)}
                  className={clsx(
                    "h-24 rounded-2xl font-bold text-sm flex items-center justify-center transition-all",
                    m.color,
                    selectedMood === m.label ? "ring-4 ring-offset-2 ring-blue-500 scale-105" : "hover:scale-105"
                  )}
                >
                    {m.label}
                </button>
            ))}
        </div>
        
        <div className="space-y-2">
            <label className="text-sm font-bold text-gray-900">Anything specific?</label>
            <input 
              type="text" 
              placeholder="e.g. coffee, no crowds, quiet" 
              className="w-full h-12 px-4 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500"
            />
        </div>

        <Button onClick={handleApply} className="w-full h-14 text-lg font-bold shadow-lg shadow-blue-200">
            Apply Mood
        </Button>
      </div>
    </BottomSheet>
  );
}
