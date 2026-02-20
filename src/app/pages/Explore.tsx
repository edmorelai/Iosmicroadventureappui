
import React from 'react';
import { Navbar } from '../components/ui/Navbar';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { MapPin, Star, Lock, Info } from 'lucide-react';

export function Explore() {
  const packs = [
    { id: 1, title: 'Old Town Micro-Adventures', city: 'Warsaw', price: '$4.99', items: 12, rating: 4.8 },
    { id: 2, title: 'Rainy Day Pack', city: 'Warsaw', price: 'Free', items: 5, rating: 4.5 },
    { id: 3, title: 'Underground Culture', city: 'Warsaw', price: '$2.99', items: 8, rating: 4.2 },
    { id: 4, title: 'Street Food Hunt', city: 'Warsaw', price: '$3.99', items: 10, rating: 4.9 },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar title="City Packs" largeTitle />
      
      <div className="p-4 grid grid-cols-1 gap-4 pb-24">
        <div className="bg-blue-50 p-4 rounded-2xl flex items-start space-x-3 mb-2">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-800">
            Discover curated adventure packs for your city. Each pack contains unique missions designed by locals.
          </p>
        </div>

        {packs.map((pack) => (
          <Card key={pack.id} className="overflow-hidden group">
            <div className="h-32 bg-gray-200 relative overflow-hidden">
               {/* Placeholder for city image */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                 <div className="text-white">
                   <h3 className="font-bold text-lg leading-tight">{pack.title}</h3>
                   <div className="flex items-center text-xs opacity-90 mt-1">
                     <MapPin className="w-3 h-3 mr-1" />
                     {pack.city}
                   </div>
                 </div>
               </div>
               <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-xs font-bold px-2 py-1 rounded-full flex items-center shadow-sm">
                 <Star className="w-3 h-3 text-yellow-500 mr-1 fill-yellow-500" />
                 {pack.rating}
               </div>
            </div>
            
            <div className="p-4 flex items-center justify-between bg-white">
              <div className="text-sm text-gray-500">
                <span className="font-semibold text-gray-900">{pack.items} Adventures</span>
                <span className="mx-2">•</span>
                <span>{pack.price === 'Free' ? 'Free' : 'Premium'}</span>
              </div>
              <Button size="sm" variant={pack.price === 'Free' ? 'secondary' : 'primary'}>
                {pack.price === 'Free' ? 'Get' : pack.price}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
