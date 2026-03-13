import { ChevpBaseComponent } from '../../utils/base-component.js';

/**
 * <chevp-panel> — Container panel with header, icon, and content area.
 *
 * @attr {string} heading - Panel title
 * @attr {string} icon    - Material Symbols icon name (optional)
 * @slot - Panel body content
 * @slot actions - Header action buttons
 */
export class ChevpPanel extends ChevpBaseComponent {
  static observedAttributes = ['heading', 'icon'];

  constructor() {
    super();
    this.addStyles(`
      :host {
        display: flex;
        flex-direction: column;
        background: var(--chevp-surface);
        border: 1px solid var(--chevp-border);
        border-radius: var(--chevp-radius-lg);
        overflow: hidden;
        min-height: 0;
      }
      .head {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 16px;
        border-bottom: 1px solid var(--chevp-border);
        flex-shrink: 0;
      }
      .head-icon {
        font-size: 18px;
        color: var(--chevp-accent-light);
        font-family: 'Material Symbols Outlined';
        font-variation-settings: 'FILL' 0, 'wght' 300;
      }
      .head-title {
        font-size: 13px;
        font-weight: 600;
      }
      .head-actions {
        margin-left: auto;
        display: flex;
        gap: 4px;
      }
      .body {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
        font-size: 13px;
      }
      .body::-webkit-scrollbar { width: 4px; }
      .body::-webkit-scrollbar-thumb { background: var(--chevp-border); border-radius: 2px; }
    `);
    this.render();
  }

  attributeChangedCallback(): void { this.render(); }

  private render(): void {
    const heading = this.getAttribute('heading') || '';
    const icon = this.getAttribute('icon') || '';
    this.root.innerHTML = `
      <div class="head">
        ${icon ? `<span class="head-icon">${icon}</span>` : ''}
        <span class="head-title">${heading}</span>
        <div class="head-actions"><slot name="actions"></slot></div>
      </div>
      <div class="body"><slot></slot></div>
    `;
  }
}

customElements.define('chevp-panel', ChevpPanel);