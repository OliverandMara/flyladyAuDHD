import { useDailyState } from '@/hooks/useDB';
import './RewardsScreen.css';

export function RewardsScreen() {
  const { state, loading } = useDailyState();

  if (loading) {
    return <div className="screen-loading">Loading...</div>;
  }

  return (
    <div className="screen rewards-screen">
      <header className="screen-header">
        <h1>Rewards</h1>
      </header>
      <div className="rewards-content">
        <div className="rewards-count">
          <div className="sticker-display">⭐</div>
          <h2>{state?.earnedStickers || 0} Stickers</h2>
          <p className="rewards-subtitle">Earned today</p>
        </div>
        <div className="rewards-stats">
          <div className="stat-item">
            <div className="stat-value">{state?.timerCompletions || 0}</div>
            <div className="stat-label">Timers completed</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{state?.completedTaskIds.length || 0}</div>
            <div className="stat-label">Tasks done</div>
          </div>
        </div>
        {(state?.earnedStickers || 0) === 0 && (
          <div className="rewards-empty">
            <p>Complete timers to earn stickers</p>
          </div>
        )}
      </div>
    </div>
  );
}