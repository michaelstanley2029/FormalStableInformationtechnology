import { EVENTS } from './events';
import type { GameState, Stats } from './types';

export const MAX_DAYS = 20;
const KEY = 'life-exe-save-v1';
const pick = <T,>(items: T[]): T => items[Math.floor(Math.random() * items.length)]!;
const bounded = (stats: Stats): Stats => ({
  cash: Math.round(stats.cash),
  health: Math.max(0, Math.min(100, stats.health)),
  energy: Math.max(0, Math.min(100, stats.energy)),
  reputation: Math.max(-100, Math.min(100, stats.reputation)),
  skills: Math.max(0, Math.min(100, stats.skills)),
  relationships: Math.max(0, Math.min(100, stats.relationships)),
});
const statKeys: (keyof Stats)[] = ['cash', 'health', 'energy', 'reputation', 'skills', 'relationships'];
export function createLife(): GameState {
  return {
    version: 1, phase: 'onboarding',
    identity: {
      name: `${pick(['Tobi', 'Amara', 'Chidi', 'Zainab', 'Dami', 'Kemi', 'Emeka', 'Amina'])} ${pick(['Bello', 'Okafor', 'Adeyemi', 'Usman', 'Nwosu', 'Bakare'])}`,
      age: pick([21, 22, 24, 25, 27, 29]),
      city: pick(['Lagos', 'Ibadan', 'Enugu', 'Abuja', 'Benin City']),
      occupation: pick(['Aspiring creative', 'Between opportunities', 'Professional side hustler', 'Fresh graduate', 'Small-business dreamer']),
      quirk: pick(['Has 43 unread family messages.', 'Believes every problem needs a spreadsheet.', 'Always knows where the best suya is.', 'Has a backup plan for the backup plan.', 'Says “I’m five minutes away” from bed.', 'Owns a motivational mug and no matching socks.']),
    },
    stats: { cash: 5000, health: 100, energy: 100, reputation: 0, skills: 0, relationships: 0 },
    day: 1, eventId: pick(EVENTS.filter(e => !e.needsFlag && !e.minDay)).id,
    seen: [], flags: [], history: [], lastResult: null, chaos: 0,
  };
}
export function getEvent(state: GameState) {
  return EVENTS.find(e => e.id === state.eventId) ?? EVENTS[0]!;
}
export function choose(state: GameState, index: number): GameState {
  if (state.phase !== 'playing') return state;
  const event = getEvent(state);
  const choice = event.choices[index];
  if (!choice || (choice.requires && state.stats[choice.requires.stat] < choice.requires.min) ||
    (choice.effects.cash && choice.effects.cash < 0 && state.stats.cash < -choice.effects.cash)) return state;
  const failed = choice.risk && Math.random() < choice.risk.chance;
  const text = failed ? choice.risk!.outcome : choice.outcome;
  const effects = { ...choice.effects };
  // Risk cash is an additional payout/loss, not a replacement for the stake.
  if (choice.risk) {
    const riskEffects = failed ? choice.risk.effects : event.id === 'hustle' ? { cash: 4000 } : event.id === 'scheme' ? { cash: 2500 } : {};
    for (const key of statKeys) effects[key] = (effects[key] ?? 0) + (riskEffects[key] ?? 0);
  }
  const nextStats = { ...state.stats };
  for (const key of statKeys) nextStats[key] += effects[key] ?? 0;
  let extra = '';
  if (nextStats.energy <= 0) {
    nextStats.health -= 15;
    nextStats.energy = 20;
    extra = ' You hit burnout: −15 health, then an emergency rest restores energy to 20.';
  }
  const stats = bounded(nextStats);
  const deltas: Partial<Stats> = {};
  for (const key of statKeys) if (stats[key] !== state.stats[key]) deltas[key] = stats[key] - state.stats[key];
  const flag = failed && choice.risk?.flag ? choice.risk.flag : choice.flag;
  const flags = flag && !state.flags.includes(flag) ? [...state.flags, flag] : state.flags;
  const unlocked = flag && !state.flags.includes(flag) ? 'This decision may come back later.' : undefined;
  return {
    ...state, phase: 'feedback', stats, flags,
    chaos: state.chaos + (choice.chaos ?? 0),
    seen: [...state.seen, event.id],
    history: [...state.history, { day: state.day, eventTitle: event.title, choice: choice.label, outcome: text + extra }],
    lastResult: { title: choice.label, text: text + extra, deltas, unlocked },
  };
}
export function advance(state: GameState): GameState {
  if (state.phase !== 'feedback') return state;
  if (state.day >= MAX_DAYS || state.stats.health <= 0 || state.stats.cash <= -2000) return { ...state, phase: 'ended' };
  const nextDay = state.day + 1;
  const eligible = EVENTS.filter(e => !state.seen.includes(e.id) && (!e.minDay || e.minDay <= nextDay) && (!e.needsFlag || state.flags.includes(e.needsFlag)));
  const consequences = eligible.filter(e => e.needsFlag);
  // Unlocked follow-ups are favoured, but not guaranteed immediately.
  const event = pick(consequences.length && Math.random() < .65 ? consequences : eligible);
  if (!event) return { ...state, phase: 'ended' };
  return { ...state, phase: 'playing', day: nextDay, eventId: event.id, lastResult: null };
}
export function getEnding(state: GameState) {
  const { stats, chaos, identity } = state;
  const lead = `${identity.name} navigated ${state.history.length} days of ${identity.city} life.`;
  if (stats.cash < 1000) return { id: 'broke', title: 'Financially on airplane mode', subtitle: 'The broke ending', story: `${lead} The wallet is quiet, but the stories are loud. Next time, maybe do not invest in a screenshot.` };
  if (stats.reputation <= -20) return { id: 'infamous', title: 'Local legend. Wrong reasons.', subtitle: 'The infamous ending', story: `${lead} Everyone knows your name. Several household appliances would prefer not to. Fame has arrived without a recommendation letter.` };
  if (chaos >= 6 || stats.health <= 0) return { id: 'chaotic', title: 'A walking plot twist', subtitle: 'The chaotic ending', story: `${lead} Plans were made, ignored, and replaced by spectacular improvisation. ${stats.health <= 0 ? 'Burnout forced a long recovery break. Rest is now the next chapter.' : 'Your group chat will be discussing this season for years.'}` };
  if (stats.cash >= 12000 && stats.skills >= 20) return { id: 'successful', title: 'Soft life, hard-earned', subtitle: 'The successful ending', story: `${lead} Small sensible moves became real momentum. Skills, receipts, and paid invoices: a surprisingly effective success formula.` };
  if (stats.health >= 70 && stats.energy >= 65 && chaos <= 2) return { id: 'peaceful', title: 'Unbothered. Well hydrated.', subtitle: 'The peaceful ending', story: `${lead} You chose enough, not everything. Your boundaries held, your body thanked you, and the family group remained muted when necessary.` };
  return { id: 'balanced', title: 'Still standing. Mostly thriving.', subtitle: 'The balanced ending', story: `${lead} Some wins, some questionable calls, a few good people. Not every day was brilliant, but you built a life that is actually yours.` };
}
export function saveGame(state: GameState): boolean {
  try { localStorage.setItem(KEY, JSON.stringify(state)); return true; } catch { return false; }
}
export function loadGame(): GameState | null {
  try {
    const text = localStorage.getItem(KEY);
    if (!text) return null;
    const s = JSON.parse(text) as GameState;
    if (s.version !== 1 || !['onboarding', 'playing', 'feedback', 'ended'].includes(s.phase) ||
      !s.identity || typeof s.identity.name !== 'string' || !Number.isInteger(s.day) || s.day < 1 || s.day > MAX_DAYS ||
      !s.stats || !statKeys.every(k => typeof s.stats[k] === 'number' && Number.isFinite(s.stats[k])) ||
      !Array.isArray(s.seen) || !Array.isArray(s.flags) || !Array.isArray(s.history) ||
      !EVENTS.some(e => e.id === s.eventId) || typeof s.chaos !== 'number' ||
      (s.phase === 'feedback' && (!s.lastResult || typeof s.lastResult.text !== 'string' || !s.lastResult.deltas))) return null;
    return s;
  } catch { return null; }
}
