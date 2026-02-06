import { useSettings } from '@/hooks/useDB';
import { Button } from '@/components/shared/Button';

export function SettingsScreen() {
  const { settings, updateSettings } = useSettings();

  return (
    <div className="screen" style={{ padding: '2rem' }}>
      <h1>Settings</h1>
      
      <div style={{ marginTop: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Coaching Tone</h2>
        <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
          {(['soft', 'firm', 'brutal'] as const).map(tone => (
            <label key={tone} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="radio"
                name="tone"
                checked={settings.coachTone === tone}
                onChange={() => updateSettings({ coachTone: tone })}
              />
              <span>{tone.charAt(0).toUpperCase() + tone.slice(1)}</span>
            </label>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Daily Task Cap: {settings.dailyCap}</h2>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button 
            size="sm" 
            onClick={() => updateSettings({ dailyCap: Math.max(3, settings.dailyCap - 1) })}
          >
            −
          </Button>
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{settings.dailyCap}</span>
          <Button 
            size="sm" 
            onClick={() => updateSettings({ dailyCap: Math.min(10, settings.dailyCap + 1) })}
          >
            +
          </Button>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
          TODO: Add export/import data functionality.
          <br />
          See README.md for implementation details.
        </p>
      </div>
    </div>
  );
}
