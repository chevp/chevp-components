import { ChevpMdBaseComponent } from '../../utils/md-base-component.js';

export interface ScheduleDay {
  label: string;
  slots: ScheduleSlot[];
}

export interface ScheduleSlot {
  time: string;
  text: string;
  muted?: boolean;
}

/**
 * <chevp-md-schedule> — Material Design 3 day-based schedule view.
 * Populate via setDays() method.
 */
export class ChevpMdSchedule extends ChevpMdBaseComponent {
  private days: ScheduleDay[] = [];

  constructor() {
    super();
    this.addStyles(`
      :host { display: block; }
      .day { margin-bottom: 16px; }
      .day:last-child { margin-bottom: 0; }
      .day-label {
        font-size: 11px;
        font-weight: 500;
        text-transform: uppercase;
        color: var(--md-sys-color-on-surface-variant);
        letter-spacing: 0.05em;
        margin-bottom: 8px;
      }
      .slot {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 14px;
        border-radius: var(--md-sys-shape-corner-medium, 8px);
        margin-bottom: 4px;
        font-size: 13px;
        background: var(--md-sys-color-surface-container);
        color: var(--md-sys-color-on-surface);
      }
      .slot.muted { color: var(--chevp-orange); }
      .time {
        font-weight: 500;
        color: var(--md-sys-color-primary);
        min-width: 50px;
      }
      .time.muted { color: var(--chevp-orange); }
    `);
  }

  setDays(days: ScheduleDay[]): void {
    this.days = days;
    this.render();
  }

  private render(): void {
    this.root.innerHTML = this.days.map(day => `
      <div class="day">
        <div class="day-label">${day.label}</div>
        ${day.slots.map(s => `
          <div class="slot ${s.muted ? 'muted' : ''}">
            <span class="time ${s.muted ? 'muted' : ''}">${s.time}</span>
            ${s.text}
          </div>
        `).join('')}
      </div>
    `).join('');
  }
}

customElements.define('chevp-md-schedule', ChevpMdSchedule);
