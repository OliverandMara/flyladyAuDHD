import { useSettings } from '@/hooks/useDB';
import { getDB } from '@/lib/db';
import { Button } from '@/components/shared/Button';
import './SettingsScreen.css';

export function SettingsScreen() {
  const { settings, updateSettings } = useSettings();

  const handleExport = async () => {
    const db = await getDB();
    const data = {
      rooms: await db.getAll('rooms'),
      tasks: await db.getAll('tasks'),
      dailyStates: await db.getAll('dailyStates'),
      settings: await db.getAll('settings'),
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dopamine-rooms-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="screen settings-screen">
      <header className="screen-header">
        <h1>Settings</h1>
      </header>
      
      <div className="settings-content">
        <section className="settings-section">
          <h2>Coaching Tone</h2>
          <div className="radio-group">
            {(['soft', 'firm', 'brutal'] as const).map(tone => (
              <label key={tone} className="radio-label">
                <input
                  type="radio"
                  name="tone"
                  checked={settings.coachTone === tone}
                  onChange={() => updateSettings({ coachTone: tone })}
                />
                <span className="radio-text">{tone.charAt(0).toUpperCase() + tone.slice(1)}</span>
              </label>
            ))}
          </div>
        </section>

        <section className="settings-section">
          <h2>Daily Task Cap</h2>
          <p className="setting-description">Maximum tasks shown per day</p>
          <div className="stepper">
            <Button 
              size="sm" 
              variant="tertiary"
              onClick={() => updateSettings({ dailyCap: Math.max(3, settings.dailyCap - 1) })}
            >
              −
            </Button>
            <span className="stepper-value">{settings.dailyCap}</span>
            <Button 
              size="sm" 
              variant="tertiary"
              onClick={() => updateSettings({ dailyCap: Math.min(10, settings.dailyCap + 1) })}
            >
              +
            </Button>
          </div>
        </section>

        <section className="settings-section">
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={settings.noNegotiationMode}
              onChange={(e) => updateSettings({ noNegotiationMode: e.target.checked })}
              className="toggle-input"
            />
            <span className="toggle-text">No Negotiation Mode</span>
          </label>
          <p className="setting-description">Removes skip and abandon options during timers</p>
        </section>

        <section className="settings-section">
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={settings.soundEnabled}
              onChange={(e) => updateSettings({ soundEnabled: e.target.checked })}
              className="toggle-input"
            />
            <span className="toggle-text">Sound Effects</span>
          </label>
        </section>

        <section className="settings-section">
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={settings.vibrationEnabled}
              onChange={(e) => updateSettings({ vibrationEnabled: e.target.checked })}
              className="toggle-input"
            />
            <span className="toggle-text">Vibration Feedback</span>
          </label>
        </section>

        <section className="settings-section">
          <h2>Data Management</h2>
          <Button onClick={handleExport} fullWidth variant="secondary">
            Export Data
          </Button>
          <p className="setting-description">Download a backup of all your data</p>
        </section>
      </div>
    </div>
  );
}