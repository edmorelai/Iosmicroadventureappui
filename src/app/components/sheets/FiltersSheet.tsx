
import React from 'react';
import { BottomSheet } from '../ui/BottomSheet';
import { Button } from '../ui/Button';
import { clsx } from 'clsx';
import { useGame } from '../../store/gameStore';

interface FiltersSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FiltersSheet({ open, onOpenChange }: FiltersSheetProps) {
  const { state, updatePreferences } = useGame();
  
  const categories = ['Food', 'Nature', 'Social', 'Creative', 'Active', 'Culture', 'Home'];

  const toggleCategory = (cat: string) => {
    const current = state.preferences.categories;
    if (current.includes(cat)) {
      updatePreferences({ categories: current.filter(c => c !== cat) });
    } else {
      updatePreferences({ categories: [...current, cat] });
    }
  };

  return (
    <BottomSheet open={open} onOpenChange={onOpenChange} title="Filters">
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={clsx(
                  "px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200",
                  state.preferences.categories.includes(cat)
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Distance</h3>
            <input type="range" className="w-full accent-blue-600" />
            <div className="flex justify-between text-xs text-gray-500 font-medium">
                <span>Nearby (0-5km)</span>
                <span>Far</span>
            </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
            <span className="font-bold text-gray-900">Indoor / Outdoor</span>
            <div className="flex bg-white p-1 rounded-lg shadow-sm">
                <button className="px-3 py-1 rounded-md text-sm font-bold bg-blue-50 text-blue-700">Both</button>
                <button className="px-3 py-1 rounded-md text-sm font-bold text-gray-500 hover:text-gray-900">In</button>
                <button className="px-3 py-1 rounded-md text-sm font-bold text-gray-500 hover:text-gray-900">Out</button>
            </div>
        </div>

        <Button onClick={() => onOpenChange(false)} className="w-full h-14 text-lg font-bold shadow-lg shadow-blue-200">
            Apply Filters
        </Button>
      </div>
    </BottomSheet>
  );
}
