/**
 * Design Tokens as CSS Custom Properties.
 *
 * Architecture (MongoDB Compass pattern):
 * 1. Tokens are defined on :root (document level) as defaults
 * 2. Components inherit tokens — they do NOT set defaults on :host
 * 3. Users/apps override tokens on :root or any ancestor element
 * 4. Theme switching = swapping token values on :root
 *
 * Composition:
 *   Base theme (lightTheme / darkTheme) + Color palette (paletteCobalt, etc.)
 *   document.adoptedStyleSheets = [lightTheme, paletteOcean];
 *
 * This stylesheet only sets fallbacks on :host for components used
 * outside a themed document (e.g. isolated tests).
 */
export const tokens = new CSSStyleSheet();
tokens.replaceSync(`
  :host {
    font-family: var(--chevp-font, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
    color: var(--chevp-text, #212631);
    box-sizing: border-box;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }
`);

/* ═══════════════════════════════════════════════════════════════
 * Helper: creates a CSSStyleSheet from a CSS string
 * ═══════════════════════════════════════════════════════════════ */
function sheet(css: string): CSSStyleSheet {
  const s = new CSSStyleSheet();
  s.replaceSync(css);
  return s;
}

/* ═══════════════════════════════════════════════════════════════
 * Shared layout/spacing/typography tokens (same for light & dark)
 * ═══════════════════════════════════════════════════════════════ */
const sharedTokens = `
    /* === Typography === */
    --chevp-font: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --chevp-font-mono: 'JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', monospace;
    --chevp-font-size: 14px;
    --chevp-font-size-sm: 12px;
    --chevp-font-size-xs: 11px;
    --chevp-font-size-lg: 16px;
    --chevp-line-height: 1.5;

    /* === Spacing === */
    --chevp-radius: 6px;
    --chevp-radius-lg: 10px;
    --chevp-radius-sm: 4px;
    --chevp-spacing-xs: 4px;
    --chevp-spacing-sm: 8px;
    --chevp-spacing-md: 16px;
    --chevp-spacing-lg: 24px;
    --chevp-spacing-xl: 32px;

    /* === Layout === */
    --chevp-sidebar-width: 260px;
    --chevp-topbar-height: 56px;
    --chevp-input-padding: 8px 12px;
    --chevp-input-height: 38px;
`;

/* ═══════════════════════════════════════════════════════════════
 * BASE THEMES — Surface, text, border, shadow, input chrome
 * These do NOT include accent/semantic colors (those come from palettes)
 * ═══════════════════════════════════════════════════════════════ */

/**
 * Light base theme.
 * Usage: document.adoptedStyleSheets = [lightTheme, paletteCobalt];
 */
export const lightTheme = sheet(`
  :root {
    /* === Surface === */
    --chevp-bg: #f8f9fa;
    --chevp-surface: #ffffff;
    --chevp-surface-2: #f0f2f5;
    --chevp-surface-3: #e9ecef;

    /* === Border === */
    --chevp-border: #d8dbe0;
    --chevp-border-light: #e9ecef;
    --chevp-border-focus: var(--chevp-accent);

    /* === Text === */
    --chevp-text: #212631;
    --chevp-text-muted: #636f83;
    --chevp-text-dim: #9da5b1;
    --chevp-text-inverse: #ffffff;

    /* === Shadows === */
    --chevp-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.06);
    --chevp-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    --chevp-shadow-lg: 0 4px 16px rgba(0, 0, 0, 0.12);

    /* === Input / Form === */
    --chevp-input-bg: #ffffff;
    --chevp-input-border: #d8dbe0;
    --chevp-input-border-focus: var(--chevp-accent);
    --chevp-input-text: var(--chevp-text);
    --chevp-input-placeholder: var(--chevp-text-dim);
    --chevp-input-radius: var(--chevp-radius);
    --chevp-input-disabled-bg: #f0f2f5;

    /* === Sidebar === */
    --chevp-sidebar-bg: #1b2838;
    --chevp-sidebar-text: #b2bec3;
    --chevp-sidebar-text-active: #ffffff;
    --chevp-sidebar-accent: var(--chevp-accent);
    --chevp-sidebar-hover: rgba(255, 255, 255, 0.05);

    /* === Topbar === */
    --chevp-topbar-bg: var(--chevp-surface);
    --chevp-topbar-border: var(--chevp-border);

    ${sharedTokens}
  }
`);

/**
 * Dark base theme.
 * Usage: document.adoptedStyleSheets = [darkTheme, paletteNeon];
 */
export const darkTheme = sheet(`
  :root {
    /* === Surface === */
    --chevp-bg: #0f1117;
    --chevp-surface: #1a1d27;
    --chevp-surface-2: #232733;
    --chevp-surface-3: #2e3344;

    /* === Border === */
    --chevp-border: #2e3344;
    --chevp-border-light: #3a3f52;
    --chevp-border-focus: var(--chevp-accent-light);

    /* === Text === */
    --chevp-text: #e4e6ed;
    --chevp-text-muted: #8b8fa3;
    --chevp-text-dim: #5c6078;
    --chevp-text-inverse: #0f1117;

    /* === Shadows === */
    --chevp-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.2);
    --chevp-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    --chevp-shadow-lg: 0 4px 16px rgba(0, 0, 0, 0.4);

    /* === Input / Form === */
    --chevp-input-bg: #232733;
    --chevp-input-border: #3a3f52;
    --chevp-input-border-focus: var(--chevp-accent-light);
    --chevp-input-text: var(--chevp-text);
    --chevp-input-placeholder: var(--chevp-text-dim);
    --chevp-input-radius: var(--chevp-radius);
    --chevp-input-disabled-bg: #1a1d27;

    /* === Sidebar === */
    --chevp-sidebar-bg: #12151e;
    --chevp-sidebar-text: #8b8fa3;
    --chevp-sidebar-text-active: #ffffff;
    --chevp-sidebar-accent: var(--chevp-accent-light);
    --chevp-sidebar-hover: rgba(255, 255, 255, 0.05);

    /* === Topbar === */
    --chevp-topbar-bg: var(--chevp-surface);
    --chevp-topbar-border: var(--chevp-border);

    ${sharedTokens}
  }
`);

/* ═══════════════════════════════════════════════════════════════
 * COLOR PALETTES — Accent + semantic colors
 * Layered on top of a base theme. Each palette works with both
 * light and dark base themes.
 * ═══════════════════════════════════════════════════════════════ */

/** Cobalt — Deep indigo accent (default, CoreUI-inspired) */
export const paletteCobalt = sheet(`
  :root {
    --chevp-accent: #321fdb;
    --chevp-accent-light: #6e5fe6;
    --chevp-accent-bg: rgba(50, 31, 219, 0.08);
    --chevp-accent-hover: #2a1abf;

    --chevp-green: #2eb85c;
    --chevp-green-bg: rgba(46, 184, 92, 0.1);
    --chevp-orange: #f9b115;
    --chevp-orange-bg: rgba(249, 177, 21, 0.1);
    --chevp-red: #e55353;
    --chevp-red-bg: rgba(229, 83, 83, 0.1);
    --chevp-blue: #3399ff;
    --chevp-blue-bg: rgba(51, 153, 255, 0.1);
  }
`);

/** Ocean — Teal/cyan accent (calm, care-oriented) */
export const paletteOcean = sheet(`
  :root {
    --chevp-accent: #0891b2;
    --chevp-accent-light: #22d3ee;
    --chevp-accent-bg: rgba(8, 145, 178, 0.08);
    --chevp-accent-hover: #0e7490;

    --chevp-green: #059669;
    --chevp-green-bg: rgba(5, 150, 105, 0.1);
    --chevp-orange: #d97706;
    --chevp-orange-bg: rgba(217, 119, 6, 0.1);
    --chevp-red: #dc2626;
    --chevp-red-bg: rgba(220, 38, 38, 0.1);
    --chevp-blue: #2563eb;
    --chevp-blue-bg: rgba(37, 99, 235, 0.1);
  }
`);

/** Forest — Emerald green accent (nature, sustainability) */
export const paletteForest = sheet(`
  :root {
    --chevp-accent: #059669;
    --chevp-accent-light: #34d399;
    --chevp-accent-bg: rgba(5, 150, 105, 0.08);
    --chevp-accent-hover: #047857;

    --chevp-green: #16a34a;
    --chevp-green-bg: rgba(22, 163, 74, 0.1);
    --chevp-orange: #ea580c;
    --chevp-orange-bg: rgba(234, 88, 12, 0.1);
    --chevp-red: #dc2626;
    --chevp-red-bg: rgba(220, 38, 38, 0.1);
    --chevp-blue: #2563eb;
    --chevp-blue-bg: rgba(37, 99, 235, 0.1);
  }
`);

/** Ember — Warm orange/amber accent (energy, warmth) */
export const paletteEmber = sheet(`
  :root {
    --chevp-accent: #d97706;
    --chevp-accent-light: #fbbf24;
    --chevp-accent-bg: rgba(217, 119, 6, 0.08);
    --chevp-accent-hover: #b45309;

    --chevp-green: #16a34a;
    --chevp-green-bg: rgba(22, 163, 74, 0.1);
    --chevp-orange: #ea580c;
    --chevp-orange-bg: rgba(234, 88, 12, 0.1);
    --chevp-red: #dc2626;
    --chevp-red-bg: rgba(220, 38, 38, 0.1);
    --chevp-blue: #2563eb;
    --chevp-blue-bg: rgba(37, 99, 235, 0.1);
  }
`);

/** Rose — Pink/rose accent (soft, care/health) */
export const paletteRose = sheet(`
  :root {
    --chevp-accent: #e11d48;
    --chevp-accent-light: #fb7185;
    --chevp-accent-bg: rgba(225, 29, 72, 0.08);
    --chevp-accent-hover: #be123c;

    --chevp-green: #059669;
    --chevp-green-bg: rgba(5, 150, 105, 0.1);
    --chevp-orange: #d97706;
    --chevp-orange-bg: rgba(217, 119, 6, 0.1);
    --chevp-red: #dc2626;
    --chevp-red-bg: rgba(220, 38, 38, 0.1);
    --chevp-blue: #7c3aed;
    --chevp-blue-bg: rgba(124, 58, 237, 0.1);
  }
`);

/** Slate — Neutral gray accent (minimal, corporate) */
export const paletteSlate = sheet(`
  :root {
    --chevp-accent: #475569;
    --chevp-accent-light: #94a3b8;
    --chevp-accent-bg: rgba(71, 85, 105, 0.08);
    --chevp-accent-hover: #334155;

    --chevp-green: #16a34a;
    --chevp-green-bg: rgba(22, 163, 74, 0.1);
    --chevp-orange: #d97706;
    --chevp-orange-bg: rgba(217, 119, 6, 0.1);
    --chevp-red: #dc2626;
    --chevp-red-bg: rgba(220, 38, 38, 0.1);
    --chevp-blue: #2563eb;
    --chevp-blue-bg: rgba(37, 99, 235, 0.1);
  }
`);

/** Neon — Vibrant purple accent (modern, creative) */
export const paletteNeon = sheet(`
  :root {
    --chevp-accent: #7c3aed;
    --chevp-accent-light: #a78bfa;
    --chevp-accent-bg: rgba(124, 58, 237, 0.08);
    --chevp-accent-hover: #6d28d9;

    --chevp-green: #10b981;
    --chevp-green-bg: rgba(16, 185, 129, 0.1);
    --chevp-orange: #f59e0b;
    --chevp-orange-bg: rgba(245, 158, 11, 0.1);
    --chevp-red: #ef4444;
    --chevp-red-bg: rgba(239, 68, 68, 0.1);
    --chevp-blue: #06b6d4;
    --chevp-blue-bg: rgba(6, 182, 212, 0.1);
  }
`);

/**
 * All palettes as a lookup map for runtime selection.
 *
 * Usage:
 *   import { colorPalettes, lightTheme } from '@chevp/components';
 *   const palette = colorPalettes[userPreference]; // e.g. 'ocean'
 *   document.adoptedStyleSheets = [lightTheme, palette];
 */
export const colorPalettes: Record<string, CSSStyleSheet> = {
  cobalt: paletteCobalt,
  ocean: paletteOcean,
  forest: paletteForest,
  ember: paletteEmber,
  rose: paletteRose,
  slate: paletteSlate,
  neon: paletteNeon,
};