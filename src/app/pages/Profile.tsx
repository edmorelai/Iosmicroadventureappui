import React, { useState } from 'react';
import { Navbar } from '../components/ui/Navbar';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Settings, User, Bell, Shield, Moon, Crown, LogOut, ChevronRight, Mail, Lock, Loader2, Fingerprint } from 'lucide-react';
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
        toast.success('Access Granted');
      } else {
        // Use server endpoint for signup to auto-confirm
        const res = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-3db49237/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, name: 'Agent' })
        });
        
        const data = await res.json();
        
        if (!res.ok) {
           throw new Error(data.error || 'Registration failed');
        }
        
        // Auto sign in after signup
        const { error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (loginError) throw loginError;
        
        toast.success('Identity Created. Welcome, Agent.');
      }
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || 'Access Denied');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('Session Terminated');
  };

  const settingsItems = [
    { icon: User, label: 'Identity Matrix', value: 'Level ' + state.level },
    { icon: Bell, label: 'Comms Uplink', value: 'Active' },
    { icon: Moon, label: 'Visual Interface', value: 'Dark' },
    { icon: Shield, label: 'Security Protocols', value: 'Max' },
  ];

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen bg-[#0a0a0c] text-slate-100 font-sans relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
        
        <Navbar title={isLogin ? "System Access" : "New Registration"} largeTitle className="bg-transparent border-transparent" />
        
        <div className="px-6 py-8 flex-1 flex flex-col justify-center max-w-md mx-auto w-full relative z-10">
            <div className="text-center mb-10">
              <div className="w-24 h-24 bg-blue-500/10 border border-blue-500/20 rounded-3xl mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.2)] mb-6 transform rotate-3 backdrop-blur-md">
                 <Fingerprint className="w-12 h-12 text-blue-500" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">
                {isLogin ? "Identify Yourself" : "Initialize Agent Protocol"}
              </h1>
              <p className="text-slate-400 text-sm">
                {isLogin 
                  ? "Enter credentials to sync neural link." 
                  : "Create a secure ID to track mission progress."}
              </p>
            </div>

            <div className="p-6 bg-[#121215] border border-white/10 rounded-2xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-50" />
              
              <form onSubmit={handleAuth} className="space-y-4 relative z-10">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 ml-1 uppercase tracking-wider">Secure Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="agent@sparkquest.net"
                      className="w-full pl-10 pr-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500/50 transition-all text-white placeholder:text-slate-600"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 ml-1 uppercase tracking-wider">Passcode</label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500/50 transition-all text-white placeholder:text-slate-600"
                      required
                      minLength={6}
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white py-6 text-lg shadow-[0_0_20px_rgba(37,99,235,0.3)] mt-6 font-bold tracking-wide uppercase"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    isLogin ? "Authenticate" : "Register ID"
                  )}
                </Button>
              </form>
            </div>

            <div className="mt-8 text-center">
              <p className="text-slate-500 text-sm">
                {isLogin ? "New recruit?" : "Already registered?"}
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 font-bold text-blue-400 hover:text-blue-300 transition-colors uppercase text-xs tracking-wider"
                >
                  {isLogin ? "Enlist Now" : "Login"}
                </button>
              </p>
            </div>
        </div>
      </div>
    );
  }

  // Logged In UI
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0c] text-slate-100 pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />

      <Navbar title="Agent Profile" largeTitle rightAction={<Settings className="w-6 h-6 text-slate-400 hover:text-white transition-colors" />} className="bg-transparent border-transparent" />
      
      <div className="px-4 space-y-6 relative z-10">
        {/* User Card */}
        <div className="flex flex-col items-center py-6 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-purple-500/20 blur-[50px] rounded-full pointer-events-none" />
          
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-3xl text-white font-bold mb-4 shadow-[0_0_20px_rgba(168,85,247,0.4)] border border-white/10 relative z-10">
            {user.email?.substring(0, 2).toUpperCase() || 'SQ'}
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-4 border-[#0a0a0c] rounded-full" />
          </div>
          
          <h2 className="text-2xl font-bold text-white tracking-tight">{user.user_metadata?.name || 'Operative'}</h2>
          <p className="text-slate-500 text-sm font-mono">{user.email}</p>
          
          <div className="mt-4 flex space-x-2">
            <span className="px-3 py-1 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(234,179,8,0.2)]">
              Elite Status
            </span>
            <span className="px-3 py-1 bg-slate-800 text-slate-300 border border-white/5 rounded-full text-[10px] font-bold uppercase tracking-wider">
              Level {state.level}
            </span>
          </div>
        </div>

        {/* Premium Banner */}
        <div className="p-1 rounded-xl bg-gradient-to-r from-yellow-600/20 via-orange-600/20 to-purple-600/20 border border-yellow-500/20">
            <div className="bg-[#121215]/80 backdrop-blur-sm p-4 rounded-lg flex items-center justify-between">
            <div>
                <h3 className="font-bold text-sm text-yellow-100 flex items-center gap-2 mb-1">
                <Crown className="w-4 h-4 text-yellow-500" />
                SparkQuest Prime
                </h3>
                <p className="text-xs text-slate-400">Unlimited rerolls & advanced metrics.</p>
            </div>
            <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-bold uppercase tracking-wider rounded transition-colors shadow-[0_0_15px_rgba(234,179,8,0.4)]">
                Upgrade
            </button>
            </div>
        </div>

        {/* Settings List */}
        <div className="bg-[#121215] rounded-xl overflow-hidden border border-white/5 divide-y divide-white/5">
          {settingsItems.map((item, index) => (
            <button key={index} className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors group">
              <div className="flex items-center space-x-4">
                <div className="bg-slate-800/50 p-2 rounded-lg group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors text-slate-400">
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="font-medium text-slate-200 text-sm">{item.label}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-500 group-hover:text-slate-300 transition-colors">
                <span className="text-xs font-mono">{item.value}</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          ))}
        </div>

        <Button 
          variant="ghost" 
          className="w-full text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all uppercase tracking-widest text-xs font-bold"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Terminate Session
        </Button>
      </div>
    </div>
  );
}
