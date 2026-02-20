
import React from 'react';
import { Navbar } from '../components/ui/Navbar';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useGame } from '../store/gameStore';
import { Calendar, TrendingUp, Map, Users } from 'lucide-react';

const data = [
  { name: 'Mon', xp: 120 },
  { name: 'Tue', xp: 200 },
  { name: 'Wed', xp: 150 },
  { name: 'Thu', xp: 80 },
  { name: 'Fri', xp: 250 },
  { name: 'Sat', xp: 300 },
  { name: 'Sun', xp: 100 },
];

export function Progress() {
  const { state } = useGame();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar title="Your Progress" largeTitle />
      
      <div className="px-4 space-y-6 pb-24">
        {/* Main XP Chart */}
        <section>
          <div className="flex items-center justify-between mb-4">
             <h2 className="font-bold text-lg text-gray-900">Activity</h2>
             <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">Last 7 Days</span>
          </div>
          <Card className="p-4 h-64 shadow-md bg-white border border-gray-100">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" fontSize={12} stroke="#9ca3af" tickLine={false} axisLine={false} />
                <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
                <Bar dataKey="xp" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 gap-4">
           <Card className="p-4 flex flex-col items-center justify-center text-center space-y-2 bg-purple-50 border border-purple-100">
             <div className="p-2 bg-purple-100 rounded-full">
               <TrendingUp className="w-5 h-5 text-purple-600" />
             </div>
             <span className="text-2xl font-bold text-gray-900">{state.history.length}</span>
             <span className="text-xs text-purple-600 font-medium uppercase tracking-wide">Adventures</span>
           </Card>
           
           <Card className="p-4 flex flex-col items-center justify-center text-center space-y-2 bg-green-50 border border-green-100">
             <div className="p-2 bg-green-100 rounded-full">
               <Map className="w-5 h-5 text-green-600" />
             </div>
             <span className="text-2xl font-bold text-gray-900">5</span>
             <span className="text-xs text-green-600 font-medium uppercase tracking-wide">New Places</span>
           </Card>

           <Card className="p-4 flex flex-col items-center justify-center text-center space-y-2 bg-orange-50 border border-orange-100">
             <div className="p-2 bg-orange-100 rounded-full">
               <Users className="w-5 h-5 text-orange-600" />
             </div>
             <span className="text-2xl font-bold text-gray-900">2</span>
             <span className="text-xs text-orange-600 font-medium uppercase tracking-wide">Social Wins</span>
           </Card>

           <Card className="p-4 flex flex-col items-center justify-center text-center space-y-2 bg-blue-50 border border-blue-100">
             <div className="p-2 bg-blue-100 rounded-full">
               <Calendar className="w-5 h-5 text-blue-600" />
             </div>
             <span className="text-2xl font-bold text-gray-900">{state.streak}</span>
             <span className="text-xs text-blue-600 font-medium uppercase tracking-wide">Current Streak</span>
           </Card>
        </section>

        {/* AI Insight */}
        <section>
          <h2 className="font-bold text-lg text-gray-900 mb-2">AI Insights</h2>
          <Card className="p-4 border-l-4 border-l-indigo-500 bg-indigo-50/50">
            <p className="text-sm text-gray-800 leading-relaxed">
              "You seem to enjoy <strong className="text-indigo-700">Nature</strong> adventures more on weekends. Try pushing your <strong className="text-indigo-700">Social</strong> comfort zone next Tuesday!"
            </p>
          </Card>
        </section>
      </div>
    </div>
  );
}
