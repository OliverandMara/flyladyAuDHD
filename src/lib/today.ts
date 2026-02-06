import { Task, Room } from '@/types';

export interface TodayTask extends Task {
  room: Room;
}

export function generateTodayList(
  tasks: Task[],
  rooms: Room[],
  completedTaskIds: string[],
  dailyCap: number
): TodayTask[] {
  const today = new Date();
  const dayOfWeek = today.getDay();
  
  const eligibleTasks = tasks.filter((task) => {
    if (completedTaskIds.includes(task.id)) {
      return false;
    }

    if (task.frequencyType === 'daily') {
      return true;
    }

    if (task.frequencyType === 'weekly' && task.weekdayMask) {
      const dayBit = 1 << dayOfWeek;
      return (task.weekdayMask & dayBit) !== 0;
    }

    if (task.frequencyType === 'custom' && task.intervalDays) {
      return true;
    }

    return false;
  });

  eligibleTasks.sort((a, b) => {
    const roomA = rooms.find((r) => r.id === a.roomId);
    const roomB = rooms.find((r) => r.id === b.roomId);
    
    if (roomA && roomB) {
      if (roomA.sortOrder !== roomB.sortOrder) {
        return roomA.sortOrder - roomB.sortOrder;
      }
    }
    
    return a.createdAt - b.createdAt;
  });

  const cappedTasks = eligibleTasks.slice(0, dailyCap);

  return cappedTasks.map((task) => ({
    ...task,
    room: rooms.find((r) => r.id === task.roomId)!,
  }));
}
