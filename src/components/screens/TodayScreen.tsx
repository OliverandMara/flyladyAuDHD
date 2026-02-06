import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRooms, useTasks, useDailyState, useSettings } from '@/hooks/useDB';
import { generateTodayList, TodayTask } from '@/lib/today';
import { getTodayCommand } from '@/lib/coaching';
import { Button } from '@/components/shared/Button';
import { Card } from '@/components/shared/Card';
import './TodayScreen.css';

export function TodayScreen() {
  const navigate = useNavigate();
  const { rooms, loading: roomsLoading } = useRooms();
  const { tasks, loading: tasksLoading } = useTasks();
  const { state: dailyState, loading: stateLoading } = useDailyState();
  const { settings } = useSettings();
  const [todayTasks, setTodayTasks] = useState<TodayTask[]>([]);

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