import { useDailyState } from '@/hooks/useDB';

export function RewardsScreen() {
  const { state } = useDailyState();

  return (
    <div className="screen" style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Rewards</h1>
      <div style={{ marginTop: '2rem' }}>
        <div style={{ fontSize: '4rem' }}>⭐</div>
        <h2 style={{ marginTop: '1rem' }}>{state?.earnedStickers || 0} Stickers Earned</h2>
        <p style={{ marginTop: '0.5rem', color: 'var(--color-text-secondary)' }}>
          Complete timers to earn more
        </p>
      </div>
    </div>
  );
}
