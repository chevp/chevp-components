import { ChevpBaseComponent } from '../../utils/base-component.js';

/**
 * <chevp-profile-card> — Profile card with avatar, name, subtitle, and info rows.
 *
 * @attr {string} name     - Display name
 * @attr {string} subtitle - Subtitle / role
 * @attr {string} initials - Avatar initials (2 chars)
 * @attr {string} color    - Avatar background color (CSS color)
 * @slot - Additional content (info rows, tags, etc.)
 * @slot tags - Tag badges below name
 */
export class ChevpProfileCard extends ChevpBaseComponent {
  static observedAttributes = ['name', 'subtitle', 'initials', 'color'];

  constructor() {
    super();
    this.addStyles(`
      :host { display: block; }
      .header {
        text-align: center;
        padding-bottom: 16px;
        border-bottom: 1px solid var(--chevp-border);
        margin-bottom: 16px;
      }
      .avatar {
        width: 64px; height: 64px;
        border-radius: 50%;
        margin: 0 auto 10px;
        display: flex; align-items: center; justify-content: center;
        font-size: 22px; font-weight: 700; color: #fff;
      }
      .name { font-size: 16px; font-weight: 700; margin-bottom: 2px; }
      .subtitle { font-size: 12px; color: var(--chevp-text-muted); }
      .tags { margin-top: 10px; }
      .content { }
    `);
    this.render();
  }

  attributeChangedCallback(): void { this.render(); }

  private render(): void {
    const name = this.getAttribute('name') || '';
    const subtitle = this.getAttribute('subtitle') || '';
    const initials = this.getAttribute('initials') || name.substring(0, 2).toUpperCase();
    const color = this.getAttribute('color') || 'var(--chevp-accent)';

    this.root.innerHTML = `
      <div class="header">
        <div class="avatar" style="background:${color}">${initials}</div>
        <div class="name">${name}</div>
        <div class="subtitle">${subtitle}</div>
        <div class="tags"><slot name="tags"></slot></div>
      </div>
      <div class="content"><slot></slot></div>
    `;
  }
}

customElements.define('chevp-profile-card', ChevpProfileCard);