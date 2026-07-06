export type WindowSize = 'sm' | 'md' | 'lg' | 'xl';
export type WindowState = 'open' | 'minimized' | 'pinned' | 'closed';

export type OSWindow = {
  id: string;
  title: string;
  route: string;
  size: WindowSize;
  state: WindowState;
  x: number;
  y: number;
  z: number;
};

export const defaultWindows: OSWindow[] = [
  { id: 'world-router', title: 'World Router', route: '/#worlds', size: 'lg', state: 'open', x: 4, y: 4, z: 1 },
  { id: 'creator-console', title: 'Creator Console', route: '/hub', size: 'xl', state: 'open', x: 16, y: 10, z: 2 },
  { id: 'beat-vault', title: 'Beat Vault', route: '/beats', size: 'md', state: 'minimized', x: 24, y: 18, z: 3 },
  { id: 'shop-portal', title: 'Shop Portal', route: '/shop', size: 'md', state: 'minimized', x: 32, y: 22, z: 4 },
];

export function openWindow(windows: OSWindow[], id: string) {
  return windows.map((window) => window.id === id ? { ...window, state: 'open' as WindowState } : window);
}

export function closeWindow(windows: OSWindow[], id: string) {
  return windows.map((window) => window.id === id ? { ...window, state: 'closed' as WindowState } : window);
}
