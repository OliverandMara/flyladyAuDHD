import { openDB, DBSchema, IDBPDatabase } from 'idb';
import type { Room, Task, Zone, DailyState, Settings } from '@/types';

interface DopamineDB extends DBSchema {
  rooms: {
    key: string;
    value: Room;
    indexes: { 'by-sort': number };
  };
  tasks: {
    key: string;
    value: Task;
    indexes: { 'by-room': string; 'by-active': number };
  };
  zones: {
    key: string;
    value: Zone;
    indexes: { 'by-room': string };
  };
  dailyStates: {
    key: string;
    value: DailyState;
  };
  settings: {
    key: string;
    value: Settings;
  };
}

let dbInstance: IDBPDatabase<DopamineDB> | null = null;

export async function getDB() {
  if (dbInstance) return dbInstance;

  dbInstance = await openDB<DopamineDB>('dopamine-rooms', 1, {
    upgrade(db) {
      const roomStore = db.createObjectStore('rooms', { keyPath: 'id' });
      roomStore.createIndex('by-sort', 'sortOrder');

      const taskStore = db.createObjectStore('tasks', { keyPath: 'id' });
      taskStore.createIndex('by-room', 'roomId');
      taskStore.createIndex('by-active', 'active');

      const zoneStore = db.createObjectStore('zones', { keyPath: 'id' });
      zoneStore.createIndex('by-room', 'roomId');

      db.createObjectStore('dailyStates', { keyPath: 'dateISO' });
      db.createObjectStore('settings', { keyPath: 'key' });
    },
  });

  return dbInstance;
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function getTodayISO(): string {
  return new Date().toISOString().split('T')[0];
}
