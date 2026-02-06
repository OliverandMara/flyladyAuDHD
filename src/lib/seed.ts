import { getDB, generateId } from './db';
import type { Room, Task } from '@/types';

export async function seedDatabase() {
  const db = await getDB();
  
  const existingRooms = await db.getAll('rooms');
  if (existingRooms.length > 0) {
    console.log('Database already seeded');
    return;
  }

  console.log('Seeding database...');

  const rooms: Room[] = [
    {
      id: generateId(),
      name: 'Kitchen',
      emoji: '🍽️',
      color: '#B8935F',
      sortOrder: 0,
      createdAt: Date.now(),
    },
    {
      id: generateId(),
      name: 'Workspace',
      emoji: '💻',
      color: '#5F7A8E',
      sortOrder: 1,
      createdAt: Date.now(),
    },
    {
      id: generateId(),
      name: 'Personal',
      emoji: '✨',
      color: '#A89676',
      sortOrder: 2,
      createdAt: Date.now(),
    },
  ];

  for (const room of rooms) {
    await db.add('rooms', room);
  }

  const kitchenTasks: Omit<Task, 'id' | 'createdAt'>[] = [
    {
      roomId: rooms[0].id,
      title: 'Clear counter',
      frequencyType: 'daily',
      estMinutes: 5,
      active: true,
    },
    {
      roomId: rooms[0].id,
      title: 'Wash dishes',
      frequencyType: 'daily',
      estMinutes: 10,
      active: true,
    },
    {
      roomId: rooms[0].id,
      title: 'Wipe surfaces',
      frequencyType: 'daily',
      estMinutes: 5,
      active: true,
    },
    {
      roomId: rooms[0].id,
      title: 'Take out trash',
      frequencyType: 'weekly',
      weekdayMask: 0b0101010,
      estMinutes: 5,
      active: true,
    },
    {
      roomId: rooms[0].id,
      title: 'Clean sink',
      frequencyType: 'custom',
      intervalDays: 3,
      estMinutes: 10,
      active: true,
    },
  ];

  const workspaceTasks: Omit<Task, 'id' | 'createdAt'>[] = [
    {
      roomId: rooms[1].id,
      title: 'Clear desk',
      frequencyType: 'daily',
      estMinutes: 5,
      active: true,
    },
    {
      roomId: rooms[1].id,
      title: 'File papers',
      frequencyType: 'weekly',
      weekdayMask: 0b0100000,
      estMinutes: 15,
      active: true,
    },
    {
      roomId: rooms[1].id,
      title: 'Empty inbox (email)',
      frequencyType: 'daily',
      estMinutes: 15,
      active: true,
    },
    {
      roomId: rooms[1].id,
      title: 'Organize cables',
      frequencyType: 'custom',
      intervalDays: 7,
      estMinutes: 10,
      active: true,
    },
    {
      roomId: rooms[1].id,
      title: 'Backup files',
      frequencyType: 'weekly',
      weekdayMask: 0b0100000,
      estMinutes: 10,
      active: true,
    },
  ];

  const personalTasks: Omit<Task, 'id' | 'createdAt'>[] = [
    {
      roomId: rooms[2].id,
      title: 'Morning routine',
      frequencyType: 'daily',
      estMinutes: 10,
      active: true,
    },
    {
      roomId: rooms[2].id,
      title: 'Evening wind-down',
      frequencyType: 'daily',
      estMinutes: 15,
      active: true,
    },
    {
      roomId: rooms[2].id,
      title: 'Review weekly goals',
      frequencyType: 'weekly',
      weekdayMask: 0b0000001,
      estMinutes: 15,
      active: true,
    },
    {
      roomId: rooms[2].id,
      title: 'Tidy bedroom',
      frequencyType: 'daily',
      estMinutes: 10,
      active: true,
    },
    {
      roomId: rooms[2].id,
      title: 'Water plants',
      frequencyType: 'custom',
      intervalDays: 3,
      estMinutes: 5,
      active: true,
    },
  ];

  const allTasks = [...kitchenTasks, ...workspaceTasks, ...personalTasks];
  
  for (const task of allTasks) {
    await db.add('tasks', {
      ...task,
      id: generateId(),
      createdAt: Date.now(),
    });
  }

  console.log(`✓ Seeded ${rooms.length} rooms and ${allTasks.length} tasks`);
}
