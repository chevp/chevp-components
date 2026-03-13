import { ChevpMdBaseComponent } from '../../utils/md-base-component.js';

/**
 * <chevp-md-timeline> — Material Design 3 vertical activity timeline.
 *
 * @slot - Timeline item elements
 */
export class ChevpMdTimeline extends ChevpMdBaseComponent {
  constructor() {
    super();
    this.addStyles(`
      :host { display: block; }
      ::slotted(chevp-md-timeline-item) {
        display: flex;
        gap: 12px;
        padding: 12px 0;
        border-bottom: 1px solid var(--md-sys-color-outline-variant);
      }
      ::slotted(chevp-md-timeline-item:last-child) { border-bottom: none; }
    `);
    this.root.innerHTML = `<slot></slot>`;
  }
}

/**
 * <chevp-md-timeline-item> — Single timeline entry with MD3 styling.
 *
 * @attr {string} icon       - Material Symbols icon name
 * @attr {string} icon-bg    - Icon background color
 * @attr {string} icon-color - Icon foreground color
 * @attr {string} time       - Timestamp text
 * @slot - Item description content
 */
export class ChevpMdTimelineItem extends ChevpMdBaseComponent {
  static observedAttributes = ['icon', 'icon-bg', 'icon-color', 'time'];

  constructor() {
    super();
    this.addStyles(`
      :host { display: flex; gap: 12px; }
      .icon {
        width: 32px; height: 32px;
        border-radius: var(--md-sys-shape-corner-medium, 8px);
        display: flex; align-items: center; justify-content: center;
        flex-shrink: 0;
        font-family: 'Material Symbols Outlined';
        font-size: 16px;
        font-variation-settings: 'FILL' 0, 'wght' 400;
      }
      .body { min-width: 0; }
      .text {
        font-size: 13px;
        line-height: 1.5;
        color: var(--md-sys-color-on-surface);
      }
      .time {
        font-size: 11px;
        color: var(--md-sys-color-on-surface-variant);
        margin-top: 2px;
      }
    `);
    this.render();
  }

  attributeChangedCallback(): void { this.render(); }

  private render(): void {
    const icon = this.getAttribute('icon') || 'circle';
    const iconBg = this.getAttribute('icon-bg') || 'var(--md-sys-color-primary-container)';
    const iconColor = this.getAttribute('icon-color') || 'var(--md-sys-color-on-primary-container)';
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

customElements.define('chevp-md-timeline', ChevpMdTimeline);
customElements.define('chevp-md-timeline-item', ChevpMdTimelineItem);
