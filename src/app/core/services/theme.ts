import { Injectable, signal, effect } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly STORAGE_KEY = 'theme-mode';

  // Signal for current theme
  readonly isDark = signal<boolean>(this.getInitialTheme());

  constructor() {
    // Effect to apply theme changes to DOM
    effect(() => {
      const dark = this.isDark();
      this.applyTheme(dark ? 'dark' : 'light');
    });
  }

  private getInitialTheme(): boolean {
    // Check localStorage first
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      return stored === 'dark';
    }

    // Fall back to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  toggleTheme(): void {
    this.isDark.update(dark => !dark);
  }

  setTheme(mode: ThemeMode): void {
    this.isDark.set(mode === 'dark');
  }

  private applyTheme(mode: ThemeMode): void {
    const root = document.documentElement;

    if (mode === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }

    // Persist to localStorage
    localStorage.setItem(this.STORAGE_KEY, mode);
  }
}
