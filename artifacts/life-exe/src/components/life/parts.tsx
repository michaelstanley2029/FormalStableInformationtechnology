import { useEffect, type ReactNode } from 'react';
import type { Stats } from '@/game/types';

export const STAT_META: { key: keyof Stats; label: string; color: string }[] = [
  { key: 'cash', label: 'Cash', color: '43 96% 56%' },
  { key: 'health', label: 'Health', color: '8 85% 62%' },
  { key: 'energy', label: 'Energy', color: '190 80% 55%' },
  { key: 'reputation', label: 'Rep', color: '280 60% 70%' },
  { key: 'skills', label: 'Skills', color: '150 70% 48%' },
  { key: 'relationships', label: 'People', color: '20 90% 62%' },
];

export function statLabel(k: keyof Stats) {
  return STAT_META.find((s) => s.key === k)?.label ?? k;
}

export function fmtCash(n: number) {
  const sign = n < 0 ? '-' : '';
  return `${sign}N${Math.abs(Math.round(n)).toLocaleString('en-NG')}`;
}

export function fmtDelta(k: keyof Stats, v: number) {
  const s = v > 0 ? '+' : v < 0 ? '-' : '';
  return k === 'cash' ? `${s}N${Math.abs(v).toLocaleString('en-NG')}` : `${s}${Math.abs(v)}`;
}

export function DeltaChips({ deltas, testPrefix }: { deltas: Partial<Stats>; testPrefix: string }) {
  const entries = (Object.entries(deltas) as [keyof Stats, number][]).filter(([, v]) => typeof v === 'number' && v !== 0);
  if (!entries.length) return <span className="chip">no stat change</span>;
  return (
    <>
      {entries.map(([k, v], i) => (
        <span
          key={k}
          className={`chip pop ${v > 0 ? 'up' : 'down'}`}
          style={{ animationDelay: `${i * 70}ms` }}
          data-testid={`${testPrefix}-${k}`}
        >
          {statLabel(k)} {fmtDelta(k, v)}
        </span>
      ))}
    </>
  );
}

export function StatPanel({ stats, deltas }: { stats: Stats; deltas?: Partial<Stats> | null }) {
  return (
    <div className="grid grid-cols-3 gap-x-3 gap-y-3 panel p-3 sm:p-4" data-testid="panel-stats">
      {STAT_META.map((m) => {
        const v = stats[m.key];
        const d = deltas?.[m.key];
        const pct = Math.max(0, Math.min(100, v));
        return (
          <div key={m.key} data-testid={`stat-${m.key}`} className="min-w-0">
            <div className="flex items-baseline justify-between gap-1">
              <span className="eyebrow truncate" style={{ fontSize: '0.62rem' }}>{m.label}</span>
              {d ? (
                <span className="mono pop" style={{ fontSize: '0.62rem', color: d > 0 ? 'hsl(150 70% 55%)' : 'hsl(8 90% 70%)' }}>
                  {fmtDelta(m.key, d)}
                </span>
              ) : null}
            </div>
            <div className="mono font-bold text-base sm:text-lg leading-tight truncate" data-testid={`value-${m.key}`}>
              {m.key === 'cash' ? fmtCash(v) : v}
            </div>
            {m.key === 'cash' ? (
              <div className="bar"><i style={{ background: `hsl(${m.color})`, transform: `scaleX(${Math.max(0.04, Math.min(1, v / 100000))})` }} /></div>
            ) : (
              <div className="bar"><i style={{ background: `hsl(${m.color})`, transform: `scaleX(${pct / 100})` }} /></div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function Modal({ title, onClose, children, testId }: { title: string; onClose: () => void; children: ReactNode; testId: string }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);
  return (
    <div className="modal-back" onClick={onClose} role="dialog" aria-modal="true" aria-label={title} data-testid={testId}>
      <div className="modal panel" onClick={(e) => e.stopPropagation()}>
        <div className="eyebrow mb-1">// {testId.replace('modal-', '')}</div>
        <h2 className="display text-3xl mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
}

export function Logo({ size = 'text-5xl' }: { size?: string }) {
  return (
    <div className={`display ${size} glitch flicker`} data-t="LIFE.exe" data-testid="text-logo">
      LIFE<span style={{ color: 'hsl(var(--amber))' }}>.exe</span>
    </div>
  );
}
