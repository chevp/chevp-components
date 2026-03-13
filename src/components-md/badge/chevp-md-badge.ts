import { ChevpMdBaseComponent } from '../../utils/md-base-component.js';
import '@material/web/chips/assist-chip.js';

/**
 * <chevp-md-badge> — Material Design 3 status badge using md-assist-chip.
 *
 * @attr {string} variant - Color variant: green | orange | red | blue | purple (default)
 * @slot - Badge text content
 */
export class ChevpMdBadge extends ChevpMdBaseComponent {
  static observedAttributes = ['variant'];

  constructor() {
    super();
    this.addStyles(`
      :host { display: inline-block; }
      .badge {
        display: inline-flex;
        align-items: center;
        padding: 4px 12px;
        border-radius: 8px;
        font-size: var(--chevp-font-size-xs, 11px);
        font-weight: 500;
        line-height: 1.4;
        font-family: var(--chevp-font);
      }
      .badge.purple {
        background: var(--md-sys-color-primary-container);
        color: var(--md-sys-color-on-primary-container);
      }
      .badge.green  { background: var(--chevp-green-bg);  color: var(--chevp-green); }
      .badge.orange { background: var(--chevp-orange-bg); color: var(--chevp-orange); }
      .badge.red    { background: var(--chevp-red-bg);    color: var(--chevp-red); }
      .badge.blue   { background: var(--chevp-blue-bg);   color: var(--chevp-blue); }
    `);
    this.render();
  }

  attributeChangedCallback(): void { this.render(); }

  private render(): void {
    const variant = this.getAttribute('variant') || 'purple';
    this.root.innerHTML = `<span class="badge ${variant}"><slot></slot></span>`;
  }
}

customElements.define('chevp-md-badge', ChevpMdBadge);
