import { ChevpBaseComponent } from '../../utils/base-component.js';

/**
 * <chevp-timeline> — Vertical activity timeline.
 * Populate via setItems() or by appending <chevp-timeline-item> children.
 *
 * @slot - Timeline item elements
 */
export class ChevpTimeline extends ChevpBaseComponent {
  constructor() {
    super();
    this.addStyles(`
      :host { display: block; }
      ::slotted(chevp-timeline-item) {
        display: flex;
        gap: 10px;
        padding: 10px 0;
        border-bottom: 1px solid rgba(255,255,255,0.04);
      }
      ::slotted(chevp-timeline-item:last-child) { border-bottom: none; }
    `);
    this.root.innerHTML = `<slot></slot>`;
  }
}

/**
 * <chevp-timeline-item> — Single timeline entry.
 *
 * @attr {string} icon      - Material Symbols icon name
 * @attr {string} icon-bg   - Icon background color
 * @attr {string} icon-color - Icon foreground color
 * @attr {string} time      - Timestamp text
 * @slot - Item description content
 */
export class ChevpTimelineItem extends ChevpBaseComponent {
  static observedAttributes = ['icon', 'icon-bg', 'icon-color', 'time'];

  constructor() {
    super();
    this.addStyles(`
      :host { display: flex; gap: 10px; }
      .icon {
        width: 30px; height: 30px;
        border-radius: 8px;
        display: flex; align-items: center; justify-content: center;
        flex-shrink: 0;
        font-family: 'Material Symbols Outlined';
        font-size: 16px;
        font-variation-settings: 'FILL' 0, 'wght' 300;
      }
      .body { min-width: 0; }
      .text { font-size: 12px; line-height: 1.5; }
      .time { font-size: 11px; color: var(--chevp-text-dim); margin-top: 2px; }
    `);
    this.render();
  }

  attributeChangedCallback(): void { this.render(); }

  private render(): void {
    const icon = this.getAttribute('icon') || 'circle';
    const iconBg = this.getAttribute('icon-bg') || 'var(--chevp-accent-bg)';
    const iconColor = this.getAttribute('icon-color') || 'var(--chevp-accent-light)';
    const time = this.getAttribute('time') || '';

    this.root.innerHTML = `
      <div class="icon" style="background:${iconBg};color:${iconColor}">${icon}</div>
      <div class="body">
        <div class="text"><slot></slot></div>
        ${time ? `<div class="time">${time}</div>` : ''}
      </div>
    `;
  }
}

customElements.define('chevp-timeline', ChevpTimeline);
customElements.define('chevp-timeline-item', ChevpTimelineItem);