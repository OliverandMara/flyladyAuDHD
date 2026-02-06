import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TodayScreen } from '@/components/screens/TodayScreen';
import { RoomsScreen } from '@/components/screens/RoomsScreen';
import { RewardsScreen } from '@/components/screens/RewardsScreen';
import { SettingsScreen } from '@/components/screens/SettingsScreen';
import { TimerScreen } from '@/components/screens/TimerScreen';
import { TabBar } from '@/components/shared/TabBar';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Navigate to="/today" replace />} />
            <Route path="/today" element={<TodayScreen />} />
            <Route path="/rooms" element={<RoomsScreen />} />
            <Route path="/rewards" element={<RewardsScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />
            <Route path="/timer/:taskId" element={<TimerScreen />} />
          </Routes>
        </main>
        <TabBar />
      </div>
    </BrowserRouter>
  );
}

export default App;
