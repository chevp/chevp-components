import { ChevpMdBaseComponent } from '../../utils/md-base-component.js';
import '@material/web/elevation/elevation.js';
import '@material/web/divider/divider.js';

/**
 * <chevp-md-panel> — Material Design 3 container panel with elevation and divider.
 *
 * @attr {string} heading - Panel title
 * @attr {string} icon    - Material Symbols icon name (optional)
 * @slot - Panel body content
 * @slot actions - Header action buttons
 */
export class ChevpMdPanel extends ChevpMdBaseComponent {
  static observedAttributes = ['heading', 'icon'];

  constructor() {
    super();
    this.addStyles(`
      :host {
        display: flex;
        flex-direction: column;
        position: relative;
        background: var(--md-sys-color-surface);
        border-radius: var(--md-sys-shape-corner-large, 12px);
        overflow: hidden;
        min-height: 0;
      }
      md-elevation {
        --md-elevation-level: 1;
      }
      .head {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 16px;
        flex-shrink: 0;
      }
      .head-icon {
        font-size: 20px;
        color: var(--md-sys-color-primary);
        font-family: 'Material Symbols Outlined';
        font-variation-settings: 'FILL' 0, 'wght' 400;
      }
      .head-title {
        font-size: 14px;
        font-weight: 500;
        color: var(--md-sys-color-on-surface);
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
        font-size: 14px;
        color: var(--md-sys-color-on-surface);
      }
      .body::-webkit-scrollbar { width: 4px; }
      .body::-webkit-scrollbar-thumb {
        background: var(--md-sys-color-outline-variant);
        border-radius: 2px;
      }
    `);
    this.render();
  }

  attributeChangedCallback(): void { this.render(); }

  private render(): void {
    const heading = this.getAttribute('heading') || '';
    const icon = this.getAttribute('icon') || '';
    this.root.innerHTML = `
      <md-elevation></md-elevation>
      <div class="head">
        ${icon ? `<span class="head-icon">${icon}</span>` : ''}
        <span class="head-title">${heading}</span>
        <div class="head-actions"><slot name="actions"></slot></div>
      </div>
      <md-divider></md-divider>
      <div class="body"><slot></slot></div>
    `;
  }
}
