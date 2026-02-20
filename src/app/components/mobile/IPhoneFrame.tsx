import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

interface IPhoneFrameProps {
  children: React.ReactNode;
}

export function IPhoneFrame({ children }: IPhoneFrameProps) {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center p-8 overflow-hidden font-sans">
        <style>{`
            #iphone-preview-root .h-screen { height: 100% !important; }
            #iphone-preview-root .min-h-screen { min-height: 100% !important; }
            #iphone-preview-root .w-screen { width: 100% !important; }
            
            /* Hide scrollbar */
            #iphone-preview-root ::-webkit-scrollbar {
                display: none;
            }
        `}</style>
      
      {/* Phone Frame */}
      <div 
        className="relative bg-black rounded-[55px] shadow-[0_0_0_12px_#3a3a3c,0_0_0_13px_#000,0_20px_50px_-10px_rgba(0,0,0,0.5)] overflow-hidden shrink-0"
        style={{ width: '430px', height: '932px' }}
      >
        {/* Dynamic Island Area / Notch */}
        <div className="absolute top-0 left-0 right-0 h-14 z-50 flex justify-between items-center px-6 pt-2 pointer-events-none">
            {/* Time */}
            <div className="w-12 text-center">
                <span className="text-white font-semibold text-[15px]">
                    {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                </span>
            </div>

            {/* Dynamic Island */}
            <div className="h-[35px] w-[120px] bg-black rounded-full absolute left-1/2 -translate-x-1/2 top-[11px] flex items-center justify-center z-50">
                <div className="w-2 h-2 rounded-full bg-[#1a1a1a] mr-2" /> {/* Camera lens simulation */}
                <div className="w-1.5 h-1.5 rounded-full bg-[#0f0f0f]" />
            </div>

            {/* Status Icons */}
            <div className="flex items-center space-x-2 text-white">
                <Signal className="w-4 h-4 fill-current" />
                <Wifi className="w-4 h-4" />
                <Battery className="w-5 h-5" />
            </div>
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-white/20 rounded-full z-50 pointer-events-none" />

        {/* Content Container - Use transform to contain fixed elements */}
        <div 
            id="iphone-preview-root" 
            className="w-full h-full relative overflow-hidden bg-[#0a0a0c]"
            style={{ transform: 'translateZ(0)' }} 
        >
           <div className="w-full h-full overflow-y-auto scrollbar-hide">
              {children}
           </div>
        </div>
      </div>
    </div>
  );
}
