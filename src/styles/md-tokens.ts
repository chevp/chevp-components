/**
 * Material Design 3 Token Bridge.
 *
 * Maps chevp design tokens to Material Design 3 custom properties
 * so @material/web components inherit the active chevp theme.
 *
 * Usage:
 *   document.adoptedStyleSheets = [lightTheme, paletteCobalt, mdTokens];
 */
export const mdTokens = new CSSStyleSheet();
mdTokens.replaceSync(`
  :root {
    /* === MD3 Color System (mapped from chevp tokens) === */
    --md-sys-color-primary: var(--chevp-accent);
    --md-sys-color-on-primary: var(--chevp-text-inverse);
    --md-sys-color-primary-container: var(--chevp-accent-bg);
    --md-sys-color-on-primary-container: var(--chevp-accent);

    --md-sys-color-secondary: var(--chevp-text-muted);
    --md-sys-color-on-secondary: var(--chevp-text-inverse);
    --md-sys-color-secondary-container: var(--chevp-surface-2);
    --md-sys-color-on-secondary-container: var(--chevp-text);

    --md-sys-color-surface: var(--chevp-surface);
    --md-sys-color-on-surface: var(--chevp-text);
    --md-sys-color-surface-variant: var(--chevp-surface-2);
    --md-sys-color-on-surface-variant: var(--chevp-text-muted);
    --md-sys-color-surface-container-lowest: var(--chevp-surface);
    --md-sys-color-surface-container-low: var(--chevp-surface);
    --md-sys-color-surface-container: var(--chevp-surface-2);
    --md-sys-color-surface-container-high: var(--chevp-surface-2);
    --md-sys-color-surface-container-highest: var(--chevp-surface-3);

    --md-sys-color-outline: var(--chevp-border);
    --md-sys-color-outline-variant: var(--chevp-border-light);

    --md-sys-color-error: var(--chevp-red);
    --md-sys-color-on-error: var(--chevp-text-inverse);

    /* === MD3 Typography (mapped from chevp tokens) === */
    --md-sys-typescale-body-medium-font: var(--chevp-font);
    --md-sys-typescale-body-medium-size: var(--chevp-font-size);
    --md-sys-typescale-body-small-font: var(--chevp-font);
    --md-sys-typescale-body-small-size: var(--chevp-font-size-sm);
    --md-sys-typescale-label-large-font: var(--chevp-font);
    --md-sys-typescale-label-medium-font: var(--chevp-font);
    --md-sys-typescale-label-small-font: var(--chevp-font);
    --md-sys-typescale-title-medium-font: var(--chevp-font);
    --md-sys-typescale-title-small-font: var(--chevp-font);

    /* === MD3 Shape (mapped from chevp tokens) === */
    --md-sys-shape-corner-small: var(--chevp-radius-sm);
    --md-sys-shape-corner-medium: var(--chevp-radius);
    --md-sys-shape-corner-large: var(--chevp-radius-lg);
  }
`);
