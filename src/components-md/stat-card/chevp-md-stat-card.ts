import { ChevpMdBaseComponent } from '../../utils/md-base-component.js';
import '@material/web/elevation/elevation.js';

/**
 * <chevp-md-stat-card> — Material Design 3 statistics card with elevation.
 *
 * @attr {string} label   - Metric label
 * @attr {string} value   - Metric value
 * @attr {string} trend   - Trend text (e.g. "+12%")
 * @attr {string} color   - Value color (CSS color)
 */
export class ChevpMdStatCard extends ChevpMdBaseComponent {
  static observedAttributes = ['label', 'value', 'trend', 'color'];

  constructor() {
    super();
    this.addStyles(`
      :host { display: block; }
      .card {
        position: relative;
        background: var(--md-sys-color-surface-container);
        border-radius: var(--md-sys-shape-corner-large, 12px);
        padding: 16px;
      }
      md-elevation {
        --md-elevation-level: 0;
      }
      .label {
        font-size: var(--chevp-font-size-sm, 12px);
        color: var(--md-sys-color-on-surface-variant);
        margin-bottom: 4px;
      }
      .value {
        font-size: 24px;
        font-weight: 600;
      }
      .trend {
        font-size: var(--chevp-font-size-xs, 11px);
        color: var(--md-sys-color-on-surface-variant);
        margin-top: 4px;
      }
    `);
    this.render();
  }

  attributeChangedCallback(): void { this.render(); }

  private render(): void {
    const label = this.getAttribute('label') || '';
    const value = this.getAttribute('value') || '0';
    const trend = this.getAttribute('trend') || '';
    const color = this.getAttribute('color') || 'var(--md-sys-color-primary)';

    this.root.innerHTML = `
      <div class="card">
        <md-elevation></md-elevation>
        <div class="label">${label}</div>
        <div class="value" style="color:${color}">${value}</div>
        ${trend ? `<div class="trend">${trend}</div>` : ''}
      </div>
    `;
  }
}

customElements.define('chevp-md-stat-card', ChevpMdStatCard);
