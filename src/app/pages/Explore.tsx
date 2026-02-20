
import React from 'react';
import { Navbar } from '../components/ui/Navbar';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { MapPin, Star, Lock, Info, Globe, Shield, Zap } from 'lucide-react';

export function Explore() {
  const packs = [
    { id: 1, title: 'Old Town Sector', city: 'Warsaw', price: '$4.99', items: 12, rating: 4.8, rarity: 'Legendary' },
    { id: 2, title: 'Rainy Day Protocol', city: 'Warsaw', price: 'Free', items: 5, rating: 4.5, rarity: 'Common' },
    { id: 3, title: 'Underground Network', city: 'Warsaw', price: '$2.99', items: 8, rating: 4.2, rarity: 'Rare' },
    { id: 4, title: 'Street Food Hunt', city: 'Warsaw', price: '$3.99', items: 10, rating: 4.9, rarity: 'Epic' },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Legendary': return 'text-yellow-500 border-yellow-500/20 bg-yellow-500/10';
      case 'Epic': return 'text-purple-500 border-purple-500/20 bg-purple-500/10';
      case 'Rare': return 'text-blue-500 border-blue-500/20 bg-blue-500/10';
      default: return 'text-slate-500 border-white/10 bg-white/5';
    }
  };

  return (
    <div className="flex flex-col min-h-screen pb-24 text-slate-100 relative overflow-x-hidden">
       {/* Background Elements */}
       <div className="fixed inset-0 pointer-events-none z-0 bg-[#0a0a0c]">
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-blue-900/10 to-transparent" />
        <div className="absolute top-[20%] right-[-50%] w-[100%] h-[50%] bg-blue-600/5 blur-[100px] rounded-full" />
      </div>

      <Navbar title="Zone Data" largeTitle className="bg-transparent border-transparent" />
      
      <div className="px-4 grid grid-cols-1 gap-4 relative z-10">
        <div className="bg-blue-900/20 border border-blue-500/20 p-4 rounded-xl flex items-start space-x-3 mb-2 backdrop-blur-sm">
          <Globe className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-200">
            Access curated adventure data for your sector. Each pack contains classified mission intelligence.
          </p>
        </div>

        {packs.map((pack) => (
          <div key={pack.id} className="group relative overflow-hidden rounded-xl border border-white/10 bg-[#121215] hover:border-blue-500/30 transition-all duration-300">
            <div className="h-32 bg-slate-800 relative overflow-hidden">
               {/* Decorative grid */}
               <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
               
               <div className="absolute inset-0 bg-gradient-to-t from-[#121215] to-transparent flex items-end p-4">
                 <div className="relative z-10 w-full">
                   <div className="flex justify-between items-end">
                     <div>
                       <div className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase inline-block mb-1 ${getRarityColor(pack.rarity)}`}>
                         {pack.rarity}
                       </div>
                       <h3 className="font-bold text-lg leading-tight text-white shadow-black drop-shadow-md">{pack.title}</h3>
                       <div className="flex items-center text-xs text-slate-300 mt-1">
                         <MapPin className="w-3 h-3 mr-1 text-slate-400" />
                         {pack.city}
                       </div>
                     </div>
                     <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10">
                       <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                       <span className="text-xs font-bold">{pack.rating}</span>
                     </div>
                   </div>
                 </div>
               </div>
            </div>
            
            <div className="p-4 flex items-center justify-between bg-[#121215]">
              <div className="text-xs text-slate-400 flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                    <Shield className="w-3 h-3" />
                    <span className="font-semibold text-slate-200">{pack.items} Missions</span>
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-700" />
                <span className="flex items-center gap-1">
                    {pack.price === 'Free' ? (
                        <span className="text-green-400">Public Access</span>
                    ) : (
                        <span className="text-amber-400">Restricted</span>
                    )}
                </span>
              </div>
              
              <button className={`
                px-4 py-2 rounded-lg text-xs font-bold transition-all
                ${pack.price === 'Free' 
                    ? 'bg-white/10 text-white hover:bg-white/20 border border-white/10' 
                    : 'bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.3)]'}
              `}>
                {pack.price === 'Free' ? 'INSTALL' : pack.price}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
