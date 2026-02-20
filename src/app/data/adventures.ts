
import { type LucideIcon, Coffee, TreePine, MapPin, Camera, BookOpen, Music, Users, Utensils } from 'lucide-react';

export type AdventureCategory = 'Food' | 'Nature' | 'Social' | 'Creative' | 'Active' | 'Culture' | 'Home';

export interface Adventure {
  id: string;
  title: string;
  category: AdventureCategory;
  duration: number; // minutes
  distance: number; // meters
  difficulty: 'Easy' | 'Medium' | 'Hard';
  xp: number;
  coins: number;
  description: string;
  steps: string[];
  tips: string[];
  imageQuery: string;
}

export const ADVENTURES: Adventure[] = [
  {
    id: '1',
    title: 'Hidden Café Discovery',
    category: 'Food',
    duration: 30,
    distance: 500,
    difficulty: 'Easy',
    xp: 50,
    coins: 10,
    description: 'Find a café you have never visited before and order their signature drink.',
    steps: [
      'Walk to a café within 500m that you have never entered.',
      'Order a drink you have never tried before.',
      'Take a photo of your drink.'
    ],
    tips: [
      'Ask the barista for their recommendation.',
      'Look for places with "Specialty Coffee" signs.'
    ],
    imageQuery: 'latte art coffee shop'
  },
  {
    id: '2',
    title: 'Urban Jungle Walk',
    category: 'Nature',
    duration: 15,
    distance: 200,
    difficulty: 'Easy',
    xp: 30,
    coins: 5,
    description: 'Find a patch of nature in the concrete jungle and observe it for 5 minutes.',
    steps: [
      'Find a tree, park, or even a flower box.',
      'Sit or stand quietly for 5 minutes.',
      'Notice 3 living things (birds, bugs, plants).'
    ],
    tips: [
      'Leave your phone in your pocket while observing.',
      'Take a deep breath.'
    ],
    imageQuery: 'city park bench'
  },
  {
    id: '3',
    title: 'Stranger Compliment',
    category: 'Social',
    duration: 5,
    distance: 0,
    difficulty: 'Hard',
    xp: 100,
    coins: 25,
    description: 'Give a genuine compliment to a stranger.',
    steps: [
      'Spot someone with a cool accessory or vibe.',
      'Approach them with a smile.',
      'Say "I love your [item], it looks great!"'
    ],
    tips: [
      'Keep it brief and sincere.',
      'Expect nothing in return.'
    ],
    imageQuery: 'people talking smiling street'
  },
  {
    id: '4',
    title: 'Sketch a Scene',
    category: 'Creative',
    duration: 20,
    distance: 0,
    difficulty: 'Medium',
    xp: 60,
    coins: 15,
    description: 'Draw what you see in front of you on a napkin or notebook.',
    steps: [
      'Find a comfortable spot to sit.',
      'Spend 10 minutes sketching the view.',
      'Don’t worry about quality, just capture shapes.'
    ],
    tips: [
      'Focus on outlines first.',
      'Use a pen so you can’t erase mistakes.'
    ],
    imageQuery: 'sketchbook drawing cafe'
  },
  {
    id: '5',
    title: 'Stair Master',
    category: 'Active',
    duration: 10,
    distance: 100,
    difficulty: 'Medium',
    xp: 40,
    coins: 10,
    description: 'Find a flight of stairs and walk up and down them 3 times.',
    steps: [
      'Locate public stairs (at least 20 steps).',
      'Climb up and down 3 times at a steady pace.',
      'Drink water afterwards.'
    ],
    tips: [
      'Watch your step!',
      'Good for a quick energy boost.'
    ],
    imageQuery: 'outdoor stairs running'
  },
   {
    id: '6',
    title: 'Book Roulette',
    category: 'Culture',
    duration: 45,
    distance: 1000,
    difficulty: 'Medium',
    xp: 80,
    coins: 20,
    description: 'Go to a library or bookstore and read the first page of a random book.',
    steps: [
      'Enter a library or bookstore.',
      'Close your eyes and pick a shelf.',
      'Read the first page of a random book.'
    ],
    tips: [
      'If you like it, keep reading!',
      'Respect the quiet rules.'
    ],
    imageQuery: 'library bookshelf reading'
  },
  {
    id: '7',
    title: 'Digital Detox Window',
    category: 'Home',
    duration: 60,
    distance: 0,
    difficulty: 'Hard',
    xp: 120,
    coins: 30,
    description: 'Put your phone in a drawer and do something analog for 1 hour.',
    steps: [
      'Set a timer on an external device (oven, watch).',
      'Put your phone completely away.',
      'Cook, clean, read, or stare at the wall.'
    ],
    tips: [
      'Notice how many times you reach for your phone.',
      'Enjoy the silence.'
    ],
    imageQuery: 'cozy reading chair home'
  }
];

export const DAILY_BOSS: Adventure = {
  id: 'boss-1',
  title: 'The Golden Hour Sprint',
  category: 'Active',
  duration: 45,
  distance: 3000,
  difficulty: 'Hard',
  xp: 500,
  coins: 100,
  description: 'Walk or run 3km during sunset (Golden Hour).',
  steps: [
    'Wait for the hour before sunset.',
    'Start your tracker.',
    'Move 3km before the sun goes down.'
  ],
  tips: [
    'Check sunset time locally.',
    'Bring water.'
  ],
  imageQuery: 'sunset running golden hour'
};
