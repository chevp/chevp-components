import { ChevpMdBaseComponent } from '../../utils/md-base-component.js';
import '@material/web/elevation/elevation.js';

/**
 * <chevp-md-profile-card> — Material Design 3 profile card with elevation.
 *
 * @attr {string} name     - Display name
 * @attr {string} subtitle - Subtitle / role
 * @attr {string} initials - Avatar initials (2 chars)
 * @attr {string} color    - Avatar background color (CSS color)
 * @slot - Additional content (info rows, tags, etc.)
 * @slot tags - Tag badges below name
 */
export class ChevpMdProfileCard extends ChevpMdBaseComponent {
  static observedAttributes = ['name', 'subtitle', 'initials', 'color'];

  constructor() {
    super();
    this.addStyles(`
      :host { display: block; position: relative; }
      .card {
        position: relative;
        background: var(--md-sys-color-surface);
        border-radius: var(--md-sys-shape-corner-large, 12px);
        overflow: hidden;
      }
      md-elevation { --md-elevation-level: 1; }
      .header {
        text-align: center;
        padding: 24px 16px 16px;
        border-bottom: 1px solid var(--md-sys-color-outline-variant);
      }
      .avatar {
        width: 64px; height: 64px;
        border-radius: 50%;
        margin: 0 auto 12px;
        display: flex; align-items: center; justify-content: center;
        font-size: 22px; font-weight: 600; color: #fff;
      }
      .name {
        font-size: 16px;
        font-weight: 600;
        color: var(--md-sys-color-on-surface);
        margin-bottom: 2px;
      }
      .subtitle {
        font-size: 12px;
        color: var(--md-sys-color-on-surface-variant);
      }
      .tags { margin-top: 10px; }
      .content { padding: 16px; }
    `);
    this.render();
  }

  attributeChangedCallback(): void { this.render(); }

  private render(): void {
    const name = this.getAttribute('name') || '';
    const subtitle = this.getAttribute('subtitle') || '';
    const initials = this.getAttribute('initials') || name.substring(0, 2).toUpperCase();
    const color = this.getAttribute('color') || 'var(--md-sys-color-primary)';

    this.root.innerHTML = `
      <div class="card">
        <md-elevation></md-elevation>
        <div class="header">
          <div class="avatar" style="background:${color}">${initials}</div>
          <div class="name">${name}</div>
          <div class="subtitle">${subtitle}</div>
          <div class="tags"><slot name="tags"></slot></div>
        </div>
        <div class="content"><slot></slot></div>
      </div>
    `;
  }
}

customElements.define('chevp-md-profile-card', ChevpMdProfileCard);
