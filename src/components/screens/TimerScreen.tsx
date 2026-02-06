import { useParams, useNavigate } from 'react-router-dom';
import { useTasks, useRooms, useDailyState, useSettings } from '@/hooks/useDB';
import { useTimer, formatTime } from '@/hooks/useTimer';
import { getCoachingLine, getCompletionLine } from '@/lib/coaching';
import { ProgressRing } from '@/components/shared/ProgressRing';
import { Button } from '@/components/shared/Button';
import { useState } from 'react';
import './TimerScreen.css';

export function TimerScreen() {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const { tasks } = useTasks();
  const { rooms } = useRooms();
  const { earnStickerFromTimer, markTaskComplete } = useDailyState();
  const { settings } = useSettings();
  const [showCelebration, setShowCelebration] = useState(false);
  
  const task = tasks.find(t => t.id === taskId);
  const room = task ? rooms.find(r => r.id === task.roomId) : null;
  
  const handleComplete = async () => {
    if (task) {
      await markTaskComplete(task.id);
      await earnStickerFromTimer();
      setShowCelebration(true);
      setTimeout(() => navigate('/today'), 2000);
    }
  };
  
  const { state, start, pause, resume, finishEarly } = useTimer(
    task?.estMinutes || 5,
    handleComplete
  );

  if (!task || !room) {
    return (
      <div className="screen timer-screen">
        <div className="empty-state">
          <h2>Task not found</h2>
          <Button onClick={() => navigate('/today')}>Back to Today</Button>
        </div>
      </div>
    );
  }

  if (showCelebration) {
    return (
      <div className="timer-screen celebration">
        <div className="celebration-content">
          <h1>🎉</h1>
          <h2>{getCompletionLine(settings.coachTone)}</h2>
          <p>+1 Sticker earned</p>
        </div>
      </div>
    );
  }

  if (!state.isRunning) {
    return (
      <div className="screen timer-screen timer-start">
        <div className="timer-start-content">
          <div className="timer-task-info">
            <span className="timer-room-icon">{room.emoji}</span>
            <h2 className="timer-task-title">{task.title}</h2>
            <p className="timer-room-name">{room.name}</p>
            <p className="timer-duration">{task.estMinutes} minutes</p>
          </div>
          <div className="timer-start-actions">
            <Button onClick={start} size="lg" fullWidth>Start Timer</Button>
            <Button variant="tertiary" onClick={() => navigate('/today')}>Cancel</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="timer-screen timer-active">
      <div className="timer-content">
        <ProgressRing progress={state.progress} size={280}>
          <div className="timer-display">
            <div className="timer-time">{formatTime(state.timeRemaining)}</div>
            <div className="timer-task">{task.title}</div>
          </div>
        </ProgressRing>
        
        <div className="timer-coaching">
          {getCoachingLine(settings.coachTone, state.progress)}
        </div>
        
        <div className="timer-controls">
          {state.isPaused ? (
            <Button onClick={resume} size="lg" fullWidth>Resume</Button>
          ) : (
            <Button onClick={pause} size="lg" variant="secondary" fullWidth>Pause</Button>
          )}
          
          {!settings.noNegotiationMode && (
            <Button variant="tertiary" onClick={finishEarly}>Finish Early</Button>
          )}
        </div>
      </div>
    </div>
  );
}