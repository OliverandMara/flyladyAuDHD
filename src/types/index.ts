export type FrequencyType = 'daily' | 'weekly' | 'custom';
export type CoachTone = 'soft' | 'firm' | 'brutal';

export interface Room {
  id: string;
  name: string;
  emoji: string;
  color: string;
  sortOrder: number;
  createdAt: number;
}

export interface Task {
  id: string;
  roomId: string;
  title: string;
  frequencyType: FrequencyType;
  intervalDays?: number;
  weekdayMask?: number;
  estMinutes: 5 | 10 | 15 | 30;
  notes?: string;
  active: boolean;
  createdAt: number;
}

export interface Zone {
  id: string;
  name: string;
  roomId: string;
  weekdayMask: number;
  createdAt: number;
}

export interface PlacedSticker {
  stickerId: string;
  dateISO?: string;
  roomId?: string;
  x?: number;
  y?: number;
}

export interface DailyState {
  dateISO: string;
  completedTaskIds: string[];
  earnedStickers: number;
  placedStickers: PlacedSticker[];
  timerCompletions: number;
}

export interface Settings {
  dailyCap: number;
  coachTone: CoachTone;
  noNegotiationMode: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
}

export interface TimerSession {
  taskId: string;
  startedAt: number;
  duration: number;
  isPaused: boolean;
  pausedAt?: number;
  elapsedBeforePause: number;
}