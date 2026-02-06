import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/shared/Button';

export function TimerScreen() {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();

  return (
    <div className="screen" style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Timer Screen</h1>
      <p style={{ marginBottom: '1rem' }}>Task ID: {taskId}</p>
      <p style={{ marginBottom: '2rem', color: 'var(--color-text-secondary)' }}>
        TODO: Implement timer with ProgressRing, coaching lines, and completion flow.
        <br />
        See README.md for complete implementation code.
      </p>
      <Button onClick={() => navigate('/today')}>Back to Today</Button>
    </div>
  );
}
