import type { ModuleKey, PermissionLevel } from '@/lib/harmonic-kernel';
import { canAccess, moduleRegistry } from '@/lib/harmonic-kernel';

type ModuleCardProps = {
  module: ModuleKey;
  userLevel?: PermissionLevel;
  compact?: boolean;
};

export function ModuleCard({ module, userLevel = 'guest', compact = false }: ModuleCardProps) {
  const data = moduleRegistry[module];
  const unlocked = canAccess(userLevel, data.required);

  return (
    <article className="rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-xl font-black">{data.label}</h3>
        <span className={`rounded-full px-3 py-1 text-xs font-black ${unlocked ? 'bg-purple-300 text-black' : 'border border-white/15 text-purple-100/45'}`}>
          {unlocked ? 'Unlocked' : data.required}
        </span>
      </div>
      {!compact && <p className="text-sm leading-6 text-purple-100/60">{data.purpose}</p>}
    </article>
  );
}
