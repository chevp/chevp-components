import { ChevpBaseComponent } from '../../utils/base-component.js';

/**
 * <chevp-badge> — Status badge with configurable color variant.
 *
 * @attr {string} variant - Color variant: green | orange | red | blue | purple (default)
 * @slot - Badge text content
 */
export class ChevpBadge extends ChevpBaseComponent {
  static observedAttributes = ['variant'];

  constructor() {
    super();
    this.addStyles(`
      :host { display: inline-block; }
      .badge {
        display: inline-block;
        padding: 3px 10px;
        border-radius: 12px;
        font-size: 11px;
        font-weight: 500;
        line-height: 1.4;
      }
      .badge.purple  { background: var(--chevp-accent-bg); color: var(--chevp-accent-light); }
      .badge.green   { background: var(--chevp-green-bg);  color: var(--chevp-green); }
      .badge.orange  { background: var(--chevp-orange-bg); color: var(--chevp-orange); }
      .badge.red     { background: var(--chevp-red-bg);    color: var(--chevp-red); }
      .badge.blue    { background: var(--chevp-blue-bg);   color: var(--chevp-blue); }
    `);
    this.render();
  }

  attributeChangedCallback(): void { this.render(); }

  private render(): void {
    const variant = this.getAttribute('variant') || 'purple';
    this.root.innerHTML = `<span class="badge ${variant}"><slot></slot></span>`;
  }
}

customElements.define('chevp-badge', ChevpBadge);