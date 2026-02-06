import { CoachTone } from '@/types';

const SOFT_LINES = [
  "One thing. That's all.",
  "You're doing it.",
  "Keep the pace.",
  "This is the work.",
  "No rush. Just steady.",
  "You showed up.",
  "Momentum builds here.",
  "Small win. Counts.",
  "You're on it.",
  "Progress is quiet.",
  "This is enough.",
  "You're here. That's the start.",
  "One task. No extras.",
  "Stay with it.",
  "This matters.",
  "You've got this one.",
  "Focus holds.",
  "You're moving.",
  "Keep your ground.",
  "This is traction.",
  "No heroics. Just finish.",
  "You're in it.",
  "Trust the timer.",
  "One foot forward.",
  "You commit. Timer handles the rest.",
  "Almost there.",
  "Stay close.",
  "You're solid.",
  "Let it finish.",
  "Done is done."
];

const FIRM_LINES = [
  "No distractions. Just this.",
  "Finish what you started.",
  "The timer doesn't negotiate.",
  "Do the work.",
  "No shortcuts.",
  "Stay in the room.",
  "This is the job.",
  "No debate. Just finish.",
  "You know what's next.",
  "Follow through.",
  "This is non-negotiable.",
  "Complete it.",
  "The task doesn't care. Do it anyway.",
  "Commitment means finishing.",
  "No excuses. Just action.",
  "You said you would. Now prove it.",
  "Discipline is showing up.",
  "Keep your word to yourself.",
  "This is the standard.",
  "Finish first. Reward after.",
  "You don't get to skip.",
  "Hold the line.",
  "See it through.",
  "Your focus. Your responsibility.",
  "No quitting mid-task.",
  "Finish strong.",
  "Do what you said.",
  "This is the requirement.",
  "Stay until done.",
  "No walking away."
];

const BRUTAL_LINES = [
  "Stop stalling.",
  "Excuses don't count.",
  "Finish or fail. Pick one.",
  "Quit lying to yourself.",
  "No one's coming to save you.",
  "Do it or don't. Stop pretending.",
  "Weak effort = weak results.",
  "You chose this. Own it.",
  "Your comfort zone is a trap.",
  "Finish what you promised.",
  "The work doesn't care about your feelings.",
  "Stop negotiating with yourself.",
  "You've wasted enough time.",
  "Discipline or regret. Your call.",
  "No sympathy for quitters.",
  "You know what you need to do.",
  "Stop looking for exits.",
  "This is the cost of progress.",
  "Finish it. No theatrics.",
  "You're better than this excuse.",
  "The timer won't budge. You will.",
  "Prove you meant it.",
  "No points for trying. Only for finishing.",
  "Your future self is counting on this.",
  "Stop negotiating. Start finishing.",
  "Discipline isn't comfortable. Do it anyway.",
  "You're stronger than your resistance.",
  "Complete it. No debate.",
  "Weakness is a choice. So is finishing.",
  "The gap between wanting and doing? This task."
];

const COMPLETION_SOFT = [
  "Finished. That's what matters.",
  "You did what you said.",
  "Task complete. Well done.",
  "You stayed with it.",
  "Done. Simple as that.",
  "You followed through.",
  "Complete. That counts.",
  "Finished it. Good.",
];

const COMPLETION_FIRM = [
  "Complete. As required.",
  "Finished. That's the standard.",
  "Task done. Keep that momentum.",
  "You followed through.",
  "Complete. Now the next one.",
  "Done. That's how it's done.",
  "Finished. On to the next.",
];

const COMPLETION_BRUTAL = [
  "Done. See? You had it in you.",
  "Finished. Took long enough.",
  "Complete. That's what discipline looks like.",
  "Done. Your excuses were wrong.",
  "Task finished. Now prove it wasn't luck.",
  "Complete. Stop doubting yourself.",
  "Done. That's the baseline.",
];

export function getCoachingLine(tone: CoachTone, progress: number): string {
  let lines: string[];
  
  switch (tone) {
    case 'soft':
      lines = SOFT_LINES;
      break;
    case 'firm':
      lines = FIRM_LINES;
      break;
    case 'brutal':
      lines = BRUTAL_LINES;
      break;
  }
  
  const index = Math.floor((progress / 100) * lines.length);
  return lines[Math.min(index, lines.length - 1)];
}

export function getCompletionLine(tone: CoachTone): string {
  let lines: string[];
  
  switch (tone) {
    case 'soft':
      lines = COMPLETION_SOFT;
      break;
    case 'firm':
      lines = COMPLETION_FIRM;
      break;
    case 'brutal':
      lines = COMPLETION_BRUTAL;
      break;
  }
  
  return lines[Math.floor(Math.random() * lines.length)];
}

export function getTodayCommand(taskTitle: string): string {
  return `Do this now: ${taskTitle}`;
}