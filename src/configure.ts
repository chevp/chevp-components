import {
  lightTheme, darkTheme, colorPalettes, paletteCobalt,
} from './styles/tokens.js';
import { mdTokens } from './styles/md-tokens.js';

export type ChevpTheme = 'vanilla' | 'material';
export type ChevpMode = 'light' | 'dark';
export type ChevpPalette = 'cobalt' | 'ocean' | 'forest' | 'ember' | 'rose' | 'slate' | 'neon';

export interface ChevpConfig {
  /** Component theme: 'vanilla' (default) or 'material' (Material Design 3) */
  theme?: ChevpTheme;
  /** Color mode: 'light' or 'dark' (default) */
  mode?: ChevpMode;
  /** Color palette name (default: 'cobalt') */
  palette?: ChevpPalette;
}

let configured = false;

/**
 * Configure and register all chevp components under unified `<chevp-*>` tag names.
 *
 * Must be called **once** before any `<chevp-*>` elements are used in the DOM.
 * Custom elements can only be registered once — calling configure() a second time
 * will only update the theme tokens (mode/palette) without re-registering components.
 *
 * @example
 * ```ts
 * import { configure } from '@chevp/components';
 *
 * await configure({ theme: 'material', mode: 'dark', palette: 'ocean' });
 * // Now use <chevp-panel>, <chevp-badge>, etc. everywhere
 * ```
 */
export async function configure(opts: ChevpConfig = {}): Promise<void> {
  const theme = opts.theme ?? 'vanilla';
  const mode = opts.mode ?? 'dark';
  const palette = opts.palette ?? 'cobalt';

  // Register components (only once)
  if (!configured) {
    if (theme === 'material') {
      await import('./register-material.js');
    } else {
      await import('./register-vanilla.js');
    }
    configured = true;
  }

  // Apply theme tokens
  const base = mode === 'dark' ? darkTheme : lightTheme;
  const pal = colorPalettes[palette] || paletteCobalt;
  const sheets: CSSStyleSheet[] = [base, pal];

  if (theme === 'material') {
    sheets.push(mdTokens);
  }

  document.adoptedStyleSheets = sheets;
}

/**
 * Update mode and/or palette without re-registering components.
 * Useful for runtime theme switching (e.g. dark/light toggle).
 */
export function applyTheme(opts: { mode?: ChevpMode; palette?: ChevpPalette; material?: boolean } = {}): void {
  const mode = opts.mode ?? 'dark';
  const palette = opts.palette ?? 'cobalt';
  const base = mode === 'dark' ? darkTheme : lightTheme;
  const pal = colorPalettes[palette] || paletteCobalt;
  const sheets: CSSStyleSheet[] = [base, pal];

  if (opts.material) {
    sheets.push(mdTokens);
  }

  document.adoptedStyleSheets = sheets;
}
