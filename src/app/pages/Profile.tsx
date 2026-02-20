import React, { useState } from 'react';
import { Navbar } from '../components/ui/Navbar';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Settings, User, Bell, Shield, Moon, Crown, LogOut, ChevronRight, Mail, Lock, Loader2 } from 'lucide-react';
import { useGame } from '../store/gameStore';
import { supabase } from '../../lib/supabase';
import { projectId } from '/utils/supabase/info';
import { toast } from 'sonner';

export function Profile() {
  const { state, user } = useGame();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        toast.success('Welcome back!');
      } else {
        // Use server endpoint for signup to auto-confirm
        const res = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-3db49237/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, name: 'Explorer' })
        });
        
        const data = await res.json();
        
        if (!res.ok) {
           throw new Error(data.error || 'Signup failed');
        }
        
        // Auto sign in after signup
        const { error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (loginError) throw loginError;
        
        toast.success('Account created! Welcome!');
      }
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('Logged out');
  };

  const settingsItems = [
    { icon: User, label: 'Personal Info', value: 'Level ' + state.level },
    { icon: Bell, label: 'Notifications', value: 'On' },
    { icon: Moon, label: 'Dark Mode', value: 'System' },
    { icon: Shield, label: 'Privacy', value: 'High' },
  ];

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar title={isLogin ? "Sign In" : "Create Account"} largeTitle />
        
        <div className="px-6 py-8 flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-blue-600 rounded-3xl mx-auto flex items-center justify-center shadow-lg shadow-blue-200 mb-4 transform rotate-3">
                 <Crown className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {isLogin ? "Welcome Back" : "Start Your Adventure"}
              </h1>
              <p className="text-gray-500">
                {isLogin 
                  ? "Sign in to sync your progress across devices." 
                  : "Create an account to save your stats and streaks."}
              </p>
            </div>

            <Card className="p-6 bg-white shadow-xl shadow-gray-200/50 border-gray-100">
              <form onSubmit={handleAuth} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 ml-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="adventurer@example.com"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 ml-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                      minLength={6}
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg shadow-lg shadow-blue-200/50 mt-4"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    isLogin ? "Sign In" : "Create Account"
                  )}
                </Button>
              </form>
            </Card>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                {isLogin ? "New to SparkQuest?" : "Already have an account?"}
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 font-bold text-blue-600 hover:underline"
                >
                  {isLogin ? "Sign Up" : "Sign In"}
                </button>
              </p>
            </div>
        </div>
      </div>
    );
  }

  // Logged In UI
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar title="Profile" largeTitle rightAction={<Settings className="w-6 h-6 text-gray-900" />} />
      
      <div className="px-4 space-y-6 pb-24">
        {/* User Card */}
        <div className="flex flex-col items-center py-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 flex items-center justify-center text-4xl text-white font-bold mb-4 shadow-lg shadow-blue-200">
            {user.email?.substring(0, 2).toUpperCase() || 'SQ'}
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{user.user_metadata?.name || 'Explorer'}</h2>
          <p className="text-gray-500">{user.email}</p>
          <div className="mt-4 flex space-x-2">
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold uppercase tracking-wide">
              Premium
            </span>
            <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-bold uppercase tracking-wide">
              Level {state.level}
            </span>
          </div>
        </div>

        {/* Premium Banner */}
        <Card className="p-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white flex items-center justify-between shadow-xl shadow-gray-300">
          <div>
            <h3 className="font-bold text-lg flex items-center">
              <Crown className="w-5 h-5 text-yellow-400 mr-2" />
              SparkQuest Premium
            </h3>
            <p className="text-sm text-gray-400">Unlock unlimited rerolls & AI stats.</p>
          </div>
          <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100">
            Upgrade
          </Button>
        </Card>

        {/* Settings List */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 divide-y divide-gray-100">
          {settingsItems.map((item, index) => (
            <button key={index} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <item.icon className="w-5 h-5 text-gray-600" />
                </div>
                <span className="font-medium text-gray-900">{item.label}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <span className="text-sm">{item.value}</span>
                <ChevronRight className="w-5 h-5" />
              </div>
            </button>
          ))}
        </div>

        <Button 
          variant="ghost" 
          className="w-full text-red-500 hover:text-red-600 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-2" />
          Log Out
        </Button>
      </div>
    </div>
  );
}
