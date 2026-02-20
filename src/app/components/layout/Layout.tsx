
import { Outlet } from 'react-router';
import { Tabbar } from './Tabbar';

export function Layout() {
  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-[430px] bg-gray-50 h-[100dvh] flex flex-col relative shadow-2xl overflow-hidden border-x border-gray-200">
        <main className="flex-1 overflow-y-auto scrollbar-hide pb-24">
          <Outlet />
        </main>
        <Tabbar />
      </div>
    </div>
  );
}
