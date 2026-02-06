import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTasks, useRooms, useDailyState, useSettings } from '@/hooks/useDB';
import { useTimer, formatTime } from '@/hooks/useTimer';
import { getCoachingLine, getCompletionLine } from '@/lib/coaching';
import { Button } from '@/components/shared/Button';
import { Card } from '@/components/shared/Card';
import { ProgressRing } from '@/components/shared/ProgressRing';
import type { Task, Room } from '@/types';
import './TimerScreen.css';

export function TimerScreen() {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const { tasks, loading: tasksLoading } = useTasks();
  const { rooms, loading: roomsLoading } = useRooms();
  const { markTaskComplete } = useDailyState();
  const { settings } = useSettings();
  const [task, setTask] = useState<Task | null>(null);
  const [room, setRoom] = useState<Room | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [completionMessage, setCompletionMessage] = useState('');

  useEffect(() => {
    if (!tasksLoading && !roomsLoading && taskId) {
      const foundTask = tasks.find(t => t.id === taskId);
      if (foundTask) {
        setTask(foundTask);
        const foundRoom = rooms.find(r => r.id === foundTask.roomId);
        setRoom(foundRoom || null);
      }
    }
  }, [taskId, tasks, rooms, tasksLoading, roomsLoading]);

  const handleComplete = async () => {
    if (!task) return;

    await markTaskComplete(task.id);
    setCompletionMessage(getCompletionLine(settings.coachTone));
    setIsCompleted(true);

    // Navigate back after a short delay to show completion message
    setTimeout(() => {
      navigate('/today');
    }, 2000);
  };

  const timer = useTimer(task?.estMinutes || 5, handleComplete);

  if (tasksLoading || roomsLoading) {
    return <div className="screen-loading">Loading...</div>;
  }

  if (!task || !room) {
    return (
      <div className="screen timer-screen">
        <div className="empty-state">
          <h1>Task not found</h1>
          <Button onClick={() => navigate('/today')}>Back to Today</Button>
        </div>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="screen timer-screen">
        <div className="completion-state">
          <div className="completion-icon">✓</div>
          <h1 className="completion-message">{completionMessage}</h1>
          <div className="completion-sticker">🌟</div>
        </div>
      </div>
    );
  }

  const coachingMessage = getCoachingLine(settings.coachTone, timer.state.progress);

  return (
    <div className="screen timer-screen">
      <header className="timer-header">
        <Card borderColor={room.color}>
          <div className="task-info">
            <div className="task-room">
              <span className="task-room-icon">{room.emoji}</span>
              <span className="task-room-name">{room.name}</span>
            </div>
            <h2 className="task-title">{task.title}</h2>
          </div>
        </Card>
      </header>

      <div className="timer-display">
        <ProgressRing progress={timer.state.progress} size={280} strokeWidth={12}>
          <div className="timer-content">
            <div className="timer-time">{formatTime(timer.state.timeRemaining)}</div>
            <div className="timer-total">of {task.estMinutes} min</div>
          </div>
        </ProgressRing>
      </div>

      <div className="coaching-message">{coachingMessage}</div>

      <div className="timer-controls">
        {!timer.state.isRunning ? (
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={timer.start}
          >
            Start Timer
          </Button>
        ) : (
          <>
            <Button
              variant={timer.state.isPaused ? 'primary' : 'secondary'}
              size="lg"
              fullWidth
              onClick={timer.state.isPaused ? timer.resume : timer.pause}
            >
              {timer.state.isPaused ? 'Resume' : 'Pause'}
            </Button>
            <div className="timer-actions">
              <Button
                variant="tertiary"
                onClick={timer.finishEarly}
              >
                Finish Early
              </Button>
              <Button
                variant="danger"
                onClick={() => navigate('/today')}
              >
                Cancel
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
