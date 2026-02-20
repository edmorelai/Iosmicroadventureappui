
import React from 'react';
import { Navbar } from '../components/ui/Navbar';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Trophy, Clock, Target, Calendar, Award } from 'lucide-react';
import { DAILY_BOSS } from '../data/adventures';

export function Challenges() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar title="Challenges" largeTitle />
      
      <div className="px-4 space-y-6 pb-24">
        {/* Daily Boss */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold text-lg text-gray-900">Today's Boss</h2>
            <span className="text-sm font-semibold text-red-600 bg-red-50 px-2 py-1 rounded-md">
              <Clock className="w-4 h-4 inline mr-1" />
              04:23 left
            </span>
          </div>
          
          <Card className="p-5 border-2 border-red-500 bg-red-50/50">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-red-100 rounded-full mr-4">
                <Target className="w-8 h-8 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{DAILY_BOSS.title}</h3>
                <p className="text-sm text-red-800 font-medium">Difficulty: Hard • +{DAILY_BOSS.xp} XP</p>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-4 bg-white p-3 rounded-xl border border-red-100">
              "{DAILY_BOSS.description}"
            </p>
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-200">
              Start Boss Fight
            </Button>
          </Card>
        </section>

        {/* Weekly Quest */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold text-lg text-gray-900">Weekly Quest</h2>
            <span className="text-xs text-gray-500">Reset in 3d</span>
          </div>
          
          <Card className="p-4 bg-white border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">Explorer's Week</h3>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">2/5</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
              <div className="bg-blue-600 h-2 rounded-full w-[40%]" />
            </div>
            <p className="text-xs text-gray-500 mb-3">Complete 5 unique adventures this week.</p>
            <div className="flex -space-x-2 overflow-hidden mb-3 pl-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-gray-300 flex items-center justify-center text-[10px] font-bold text-gray-500">?</div>
              ))}
            </div>
          </Card>
        </section>

        {/* Season Journey */}
        <section>
          <h2 className="font-bold text-lg text-gray-900 mb-2">Season Journey</h2>
          <Card className="p-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">Season 1: Spark</h3>
                <p className="text-xs text-purple-100">Level 12 / 50</p>
              </div>
              <Award className="w-10 h-10 text-yellow-300" />
            </div>
            <div className="mt-4 w-full bg-black/20 rounded-full h-2">
              <div className="bg-yellow-400 h-2 rounded-full w-[24%]" />
            </div>
            <div className="mt-2 text-xs text-purple-100 flex justify-between">
              <span>Next Reward: Golden Compass</span>
              <span>120 XP to go</span>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
