import { ChevpBaseComponent } from '../../utils/base-component.js';

/**
 * <chevp-stat-card> — Statistics card with label, value, and trend.
 *
 * @attr {string} label   - Metric label
 * @attr {string} value   - Metric value
 * @attr {string} trend   - Trend text (e.g. "+12%")
 * @attr {string} color   - Value color (CSS color)
 */
export class ChevpStatCard extends ChevpBaseComponent {
  static observedAttributes = ['label', 'value', 'trend', 'color'];

  constructor() {
    super();
    this.addStyles(`
      :host { display: block; }
      .card {
        background: var(--chevp-surface-2);
        border-radius: 10px;
        padding: 14px;
      }
      .label {
        font-size: 11px;
        color: var(--chevp-text-muted);
        margin-bottom: 4px;
      }
      .value {
        font-size: 22px;
        font-weight: 700;
      }
      .trend {
        font-size: 11px;
        margin-top: 2px;
      }
    `);
    this.render();
  }

  attributeChangedCallback(): void { this.render(); }

  private render(): void {
    const label = this.getAttribute('label') || '';
    const value = this.getAttribute('value') || '0';
    const trend = this.getAttribute('trend') || '';
    const color = this.getAttribute('color') || 'var(--chevp-accent-light)';

    this.root.innerHTML = `
      <div class="card">
        <div class="label">${label}</div>
        <div class="value" style="color:${color}">${value}</div>
        ${trend ? `<div class="trend">${trend}</div>` : ''}
      </div>
    `;
  }
}

customElements.define('chevp-stat-card', ChevpStatCard);