import { ChevpBaseComponent } from '../../utils/base-component.js';

/**
 * <chevp-workspace> — CSS Grid layout container for panels.
 *
 * @attr {string} layout  - Grid template as shorthand (e.g. "2col", "3col", or custom CSS grid-template)
 * @attr {string} columns - Explicit grid-template-columns value
 * @attr {string} rows    - Explicit grid-template-rows value
 * @attr {string} areas   - Explicit grid-template-areas value (quoted rows separated by semicolons)
 * @slot - Panel elements
 */
export class ChevpWorkspace extends ChevpBaseComponent {
  static observedAttributes = ['layout', 'columns', 'rows', 'areas'];

  constructor() {
    super();
    this.addStyles(`
      :host {
        display: block;
        height: 100%;
        overflow-y: auto;
        padding: 16px;
      }
      :host::-webkit-scrollbar { width: 6px; }
      :host::-webkit-scrollbar-thumb { background: var(--chevp-border); border-radius: 3px; }
      .grid {
        display: grid;
        gap: 16px;
        height: 100%;
        min-height: 0;
      }
    `);
    this.render();
  }

  attributeChangedCallback(): void { this.render(); }

  private render(): void {
    const layout = this.getAttribute('layout');
    const columns = this.getAttribute('columns');
    const rows = this.getAttribute('rows');
    const areas = this.getAttribute('areas');

    let style = '';

    if (columns) style += `grid-template-columns:${columns};`;
    if (rows) style += `grid-template-rows:${rows};`;
    if (areas) {
      // Convert semicolon-separated to proper CSS (e.g. "a b;c d" → "'a b' 'c d'")
      const areaRows = areas.split(';').map(r => `'${r.trim()}'`).join(' ');
      style += `grid-template-areas:${areaRows};`;
    }

    if (!style && layout) {
      switch (layout) {
        case '2col': style = 'grid-template-columns:1fr 1fr;'; break;
        case '3col': style = 'grid-template-columns:1fr 1fr 1fr;'; break;
        case 'sidebar-main': style = 'grid-template-columns:320px 1fr;'; break;
        case 'main-sidebar': style = 'grid-template-columns:1fr 320px;'; break;
        default: style = layout; break;
      }
    }

    this.root.innerHTML = `<div class="grid" style="${style}"><slot></slot></div>`;
  }
}
