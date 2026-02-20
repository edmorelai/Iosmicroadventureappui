
import { createBrowserRouter } from 'react-router';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { Challenges } from './pages/Challenges';
import { Progress } from './pages/Progress';
import { Profile } from './pages/Profile';
import { Onboarding } from './pages/Onboarding/Onboarding';
import { AdventureReveal } from './pages/Adventure/Reveal';
import { ActiveMission } from './pages/Adventure/Active';
import { AdventureComplete } from './pages/Adventure/Complete';
import { NotFound } from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'explore', element: <Explore /> },
      { path: 'challenges', element: <Challenges /> },
      { path: 'progress', element: <Progress /> },
      { path: 'profile', element: <Profile /> },
    ],
  },
  {
    path: '/onboarding',
    element: <Onboarding />,
  },
  {
    path: '/adventure/reveal',
    element: <AdventureReveal />,
  },
  {
    path: '/adventure/active',
    element: <ActiveMission />,
  },
  {
    path: '/adventure/complete',
    element: <AdventureComplete />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
