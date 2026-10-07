export interface Stats {
  cash: number;
  health: number;
  energy: number;
  reputation: number;
  skills: number;
  relationships: number;
}
export interface Choice {
  label: string;
  hint: string;
  effects: Partial<Stats>;
  outcome: string;
  flag?: string;
  chaos?: number;
  requires?: { stat: keyof Stats; min: number };
  risk?: { chance: number; effects: Partial<Stats>; outcome: string; flag?: string };
}
export interface GameEvent {
  id: string;
  category: string;
  title: string;
  description: string;
  choices: Choice[];
  needsFlag?: string;
  minDay?: number;
}
export interface GameState {
  version: 1;
  phase: 'onboarding' | 'playing' | 'feedback' | 'ended';
  identity: { name: string; age: number; city: string; occupation: string; quirk: string };
  stats: Stats;
  day: number;
  eventId: string;
  seen: string[];
  flags: string[];
  history: { day: number; eventTitle: string; choice: string; outcome: string }[];
  lastResult: { title: string; text: string; deltas: Partial<Stats>; unlocked?: string } | null;
  chaos: number;
}
