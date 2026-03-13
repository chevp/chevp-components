import { ChevpBaseComponent } from '../../utils/base-component.js';

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
 * <chevp-schedule> — Day-based schedule view with time slots.
 * Populate via setDays() method.
 */
export class ChevpSchedule extends ChevpBaseComponent {
  private days: ScheduleDay[] = [];

  constructor() {
    super();
    this.addStyles(`
      :host { display: block; }
      .day { margin-bottom: 16px; }
      .day:last-child { margin-bottom: 0; }
      .day-label {
        font-size: 11px; font-weight: 600; text-transform: uppercase;
        color: var(--chevp-text-muted); letter-spacing: 0.05em; margin-bottom: 8px;
      }
      .slot {
        display: flex; align-items: center; gap: 10px;
        padding: 8px 12px; border-radius: 8px; margin-bottom: 4px;
        font-size: 12px; background: var(--chevp-surface-2);
      }
      .slot.muted { color: var(--chevp-orange); }
      .time {
        font-weight: 600; color: var(--chevp-accent-light); min-width: 50px;
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

customElements.define('chevp-schedule', ChevpSchedule);