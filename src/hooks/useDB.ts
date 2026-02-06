import { useState, useEffect } from 'react';
import { getDB, generateId, getTodayISO } from '@/lib/db';
import type { Room, Task, Zone, DailyState, Settings } from '@/types';

export function useRooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRooms();
  }, []);

  async function loadRooms() {
    const db = await getDB();
    const allRooms = await db.getAllFromIndex('rooms', 'by-sort');
    setRooms(allRooms);
    setLoading(false);
  }

  async function addRoom(room: Omit<Room, 'id' | 'createdAt' | 'sortOrder'>) {
    const db = await getDB();
    const maxSort = rooms.length > 0 ? Math.max(...rooms.map(r => r.sortOrder)) : -1;
    const newRoom: Room = {
      ...room,
      id: generateId(),
      sortOrder: maxSort + 1,
      createdAt: Date.now(),
    };
    await db.add('rooms', newRoom);
    await loadRooms();
    return newRoom;
  }

  async function updateRoom(id: string, updates: Partial<Room>) {
    const db = await getDB();
    const existing = await db.get('rooms', id);
    if (existing) {
      await db.put('rooms', { ...existing, ...updates });
      await loadRooms();
    }
  }

  async function deleteRoom(id: string) {
    const db = await getDB();
    await db.delete('rooms', id);
    const tasks = await db.getAllFromIndex('tasks', 'by-room', id);
    for (const task of tasks) {
      await db.delete('tasks', task.id);
    }
    await loadRooms();
  }

  return { rooms, loading, addRoom, updateRoom, deleteRoom, reload: loadRooms };
}

export function useTasks(roomId?: string) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, [roomId]);

  async function loadTasks() {
    const db = await getDB();
    if (roomId) {
      const roomTasks = await db.getAllFromIndex('tasks', 'by-room', roomId);
      setTasks(roomTasks.filter(t => t.active));
    } else {
      const allTasks = await db.getAll('tasks');
      setTasks(allTasks.filter(t => t.active));
    }
    setLoading(false);
  }

  async function addTask(task: Omit<Task, 'id' | 'createdAt'>) {
    const db = await getDB();
    const newTask: Task = {
      ...task,
      id: generateId(),
      createdAt: Date.now(),
    };
    await db.add('tasks', newTask);
    await loadTasks();
    return newTask;
  }

  async function updateTask(id: string, updates: Partial<Task>) {
    const db = await getDB();
    const existing = await db.get('tasks', id);
    if (existing) {
      await db.put('tasks', { ...existing, ...updates });
      await loadTasks();
    }
  }

  async function deleteTask(id: string) {
    const db = await getDB();
    await db.delete('tasks', id);
    await loadTasks();
  }

  return { tasks, loading, addTask, updateTask, deleteTask, reload: loadTasks };
}

export function useDailyState() {
  const [state, setState] = useState<DailyState | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadState();
  }, []);

  async function loadState() {
    const db = await getDB();
    const today = getTodayISO();
    let dailyState = await db.get('dailyStates', today);
    
    if (!dailyState) {
      dailyState = {
        dateISO: today,
        completedTaskIds: [],
        earnedStickers: 0,
        placedStickers: [],
        timerCompletions: 0,
      };
      await db.put('dailyStates', dailyState);
    }
    
    setState(dailyState);
    setLoading(false);
  }

  async function markTaskComplete(taskId: string) {
    if (!state) return;
    const db = await getDB();
    const updated = {
      ...state,
      completedTaskIds: [...state.completedTaskIds, taskId],
    };
    
    if (updated.completedTaskIds.length % 3 === 0) {
      updated.earnedStickers += 1;
    }
    
    await db.put('dailyStates', updated);
    setState(updated);
  }

  async function earnStickerFromTimer() {
    if (!state) return;
    const db = await getDB();
    const updated = {
      ...state,
      earnedStickers: state.earnedStickers + 1,
      timerCompletions: state.timerCompletions + 1,
    };
    await db.put('dailyStates', updated);
    setState(updated);
  }

  async function placeSticker(sticker: PlacedSticker) {
    if (!state) return;
    const db = await getDB();
    const updated = {
      ...state,
      placedStickers: [...state.placedStickers, sticker],
    };
    await db.put('dailyStates', updated);
    setState(updated);
  }

  return { 
    state, 
    loading, 
    markTaskComplete, 
    earnStickerFromTimer,
    placeSticker,
    reload: loadState 
  };
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>({
    dailyCap: 5,
    coachTone: 'firm',
    noNegotiationMode: false,
    soundEnabled: true,
    vibrationEnabled: true,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    const db = await getDB();
    const stored = await db.get('settings', 'main');
    if (stored) {
      setSettings(stored);
    } else {
      await db.put('settings', { key: 'main', ...settings });
    }
    setLoading(false);
  }

  async function updateSettings(updates: Partial<Settings>) {
    const db = await getDB();
    const updated = { ...settings, ...updates };
    await db.put('settings', { key: 'main', ...updated });
    setSettings(updated);
  }

  return { settings, loading, updateSettings };
}