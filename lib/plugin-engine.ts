import type { ModuleKey, PermissionLevel } from './harmonic-kernel';
import { moduleRegistry } from './harmonic-kernel';

export type PluginKind = 'community' | 'commerce' | 'media' | 'creator' | 'system';

export type HarmonicPlugin = {
  key: ModuleKey;
  kind: PluginKind;
  label: string;
  required: PermissionLevel;
  purpose: string;
  aiReadable: boolean;
  reusableByWorlds: boolean;
};

export const plugins: HarmonicPlugin[] = Object.entries(moduleRegistry).map(([key, plugin]) => ({
  key: key as ModuleKey,
  kind: key === 'products' ? 'commerce' : key === 'calendar' || key === 'analytics' ? 'creator' : key === 'video' || key === 'gallery' ? 'media' : 'community',
  label: plugin.label,
  required: plugin.required,
  purpose: plugin.purpose,
  aiReadable: true,
  reusableByWorlds: true,
}));

export function getPlugin(key: ModuleKey) {
  return plugins.find((plugin) => plugin.key === key);
}

export function getPluginsByKind(kind: PluginKind) {
  return plugins.filter((plugin) => plugin.kind === kind);
}
