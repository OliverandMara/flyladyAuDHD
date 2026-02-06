import { useState, useEffect, useRef } from 'react';

export interface TimerState {
  isRunning: boolean;
  isPaused: boolean;
  timeRemaining: number;
  totalDuration: number;
  progress: number;
}

export function useTimer(durationMinutes: number, onComplete: () => void) {
  const [state, setState] = useState<TimerState>({
    isRunning: false,
    isPaused: false,
    timeRemaining: durationMinutes * 60,
    totalDuration: durationMinutes * 60,
    progress: 0,
  });

  const intervalRef = useRef<number | null>(null);

  const start = () => {
    setState((prev) => ({
      ...prev,
      isRunning: true,
      isPaused: false,
    }));
  };

  const pause = () => {
    setState((prev) => ({
      ...prev,
      isPaused: true,
    }));
  };

  const resume = () => {
    setState((prev) => ({
      ...prev,
      isPaused: false,
    }));
  };

  const reset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setState({
      isRunning: false,
      isPaused: false,
      timeRemaining: durationMinutes * 60,
      totalDuration: durationMinutes * 60,
      progress: 0,
    });
  };

  const finishEarly = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setState((prev) => ({
      ...prev,
      isRunning: false,
      timeRemaining: 0,
      progress: 100,
    }));
    onComplete();
  };

  useEffect(() => {
    if (state.isRunning && !state.isPaused) {
      intervalRef.current = window.setInterval(() => {
        setState((prev) => {
          const newTimeRemaining = prev.timeRemaining - 1;
          
          if (newTimeRemaining <= 0) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
            onComplete();
            return {
              ...prev,
              isRunning: false,
              timeRemaining: 0,
              progress: 100,
            };
          }

          const progress = ((prev.totalDuration - newTimeRemaining) / prev.totalDuration) * 100;
          
          return {
            ...prev,
            timeRemaining: newTimeRemaining,
            progress,
          };
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [state.isRunning, state.isPaused, onComplete]);

  return {
    state,
    start,
    pause,
    resume,
    reset,
    finishEarly,
  };
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
