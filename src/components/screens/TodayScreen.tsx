import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRooms, useTasks, useDailyState, useSettings } from '@/hooks/useDB';
import { generateTodayList, TodayTask } from '@/lib/today';
import { getTodayCommand } from '@/lib/coaching';
import { Button } from '@/components/shared/Button';
import { Card } from '@/components/shared/Card';
import './TodayScreen.css';

function generateDailySummary(
  todayTasks: TodayTask[],
  completedTaskIds: string[],
  earnedStickers: number
): string {
  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const completedCount = todayTasks.filter(t => completedTaskIds.includes(t.id)).length;
  const totalCount = todayTasks.length;
  const totalMinutes = todayTasks.reduce((sum, t) => sum + t.estMinutes, 0);

  let summary = `📅 Daily Summary - ${date}\n\n`;
  summary += `Progress: ${completedCount}/${totalCount} tasks completed\n`;
  summary += `Total time: ${totalMinutes} minutes\n`;
  summary += `Stickers earned today: ${earnedStickers} 🌟\n\n`;

  summary += `Tasks:\n`;
  todayTasks.forEach((task, idx) => {
    const status = completedTaskIds.includes(task.id) ? '✅' : '⬜';
    summary += `${idx + 1}. ${status} ${task.room.emoji} ${task.title} (${task.estMinutes}min - ${task.room.name})\n`;
  });

  return summary;
}

export function TodayScreen() {
  const navigate = useNavigate();
  const { rooms, loading: roomsLoading } = useRooms();
  const { tasks, loading: tasksLoading } = useTasks();
  const { state: dailyState, loading: stateLoading } = useDailyState();
  const { settings } = useSettings();
  const [todayTasks, setTodayTasks] = useState<TodayTask[]>([]);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopySummary = async () => {
    if (!dailyState) return;

    const summary = generateDailySummary(
      todayTasks,
      dailyState.completedTaskIds,
      dailyState.earnedStickers
    );

    try {
      await navigator.clipboard.writeText(summary);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy summary:', err);
    }
  };

  useEffect(() => {
    if (!roomsLoading && !tasksLoading && !stateLoading && dailyState) {
      const list = generateTodayList(
        tasks,
        rooms,
        dailyState.completedTaskIds,
        settings.dailyCap
      );
      setTodayTasks(list);
    }
  }, [rooms, tasks, dailyState, settings.dailyCap, roomsLoading, tasksLoading, stateLoading]);

  if (roomsLoading || tasksLoading || stateLoading) {
    return <div className="screen-loading">Loading...</div>;
  }

  if (todayTasks.length === 0) {
    return (
      <div className="screen today-screen">
        <div className="empty-state">
          <h1>All tasks complete.</h1>
          <p>Add more rooms or adjust your daily cap in Settings.</p>
          <Button onClick={() => navigate('/rooms')}>Manage Rooms</Button>
        </div>
      </div>
    );
  }

  const nextTask = todayTasks[0];

  return (
    <div className="screen today-screen">
      <header className="today-header">
        <h1 className="today-date">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
          })}
        </h1>
        <div className="today-command">{getTodayCommand(nextTask.title)}</div>
        <Button
          variant="tertiary"
          size="sm"
          onClick={handleCopySummary}
          className="summary-button"
        >
          {copySuccess ? '✓ Copied!' : '📋 Copy Daily Summary'}
        </Button>
      </header>

      <div className="today-list">
        {todayTasks.map((task) => (
          <Card 
            key={task.id} 
            borderColor={task.room.color}
            className="task-card"
          >
            <div className="task-card-header">
              <span className="task-room-icon">{task.room.emoji}</span>
              <span className="task-room-name">{task.room.name}</span>
            </div>
            <h3 className="task-title">{task.title}</h3>
            <div className="task-footer">
              <span className="task-duration">{task.estMinutes} min</span>
              <Button
                size="sm"
                onClick={() => navigate(`/timer/${task.id}`)}
              >
                Start
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="today-action">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={() => navigate(`/timer/${nextTask.id}`)}
        >
          Do Next: {nextTask.title}
        </Button>
      </div>
    </div>
  );
}
