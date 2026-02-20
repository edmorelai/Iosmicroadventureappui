
import { Drawer } from 'vaul';
import { X } from 'lucide-react';

interface BottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  trigger?: React.ReactNode;
  children: React.ReactNode;
}

export function BottomSheet({ open, onOpenChange, title, trigger, children }: BottomSheetProps) {
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Trigger asChild>
        {trigger}
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity" />
        <Drawer.Content className="bg-white flex flex-col rounded-t-[32px] mt-24 h-[96%] fixed bottom-0 left-0 right-0 z-50 focus:outline-none">
          <div className="p-4 bg-white rounded-t-[32px] flex-1 overflow-auto">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8" />
            <div className="max-w-md mx-auto relative h-full">
              <Drawer.Title className="font-bold mb-6 text-2xl text-center">
                {title}
              </Drawer.Title>
              <button 
                className="absolute right-0 top-0 p-2 text-gray-400 hover:text-gray-900 bg-gray-100 rounded-full transition-colors"
                onClick={() => onOpenChange(false)}
              >
                <X className="w-5 h-5" />
              </button>
              
              {children}
            </div>
          </div>
          <div className="p-4 bg-gray-50 border-t mt-auto">
            {/* Optional footer */}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
