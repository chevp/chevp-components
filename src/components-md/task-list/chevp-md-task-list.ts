import { ChevpMdBaseComponent } from '../../utils/md-base-component.js';
import '@material/web/checkbox/checkbox.js';

export interface TaskItem {
  id: string;
  text: string;
  done: boolean;
  due?: string;
  priority?: 'low' | 'medium' | 'high';
}

/**
 * <chevp-md-task-list> — Material Design 3 task list with md-checkbox.
 * Populate via setTasks() method.
 *
 * @fires chevp:task-toggled - When a task checkbox is toggled. Detail: { id, done }
 */
export class ChevpMdTaskList extends ChevpMdBaseComponent {
  private tasks: TaskItem[] = [];

  constructor() {
    super();
    this.addStyles(`
      :host { display: block; }
      .item {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        padding: 8px 0;
        border-bottom: 1px solid var(--md-sys-color-outline-variant);
      }
      .item:last-child { border-bottom: none; }
      md-checkbox {
        --md-checkbox-outline-color: var(--md-sys-color-outline);
        --md-checkbox-selected-container-color: var(--md-sys-color-primary);
        flex-shrink: 0;
        margin-top: -4px;
      }
      .text {
        font-size: var(--chevp-font-size-sm, 12px);
        line-height: 1.5;
        color: var(--md-sys-color-on-surface);
      }
      .text.done {
        text-decoration: line-through;
        color: var(--md-sys-color-on-surface-variant);
      }
      .due {
        font-size: var(--chevp-font-size-xs, 11px);
        color: var(--md-sys-color-on-surface-variant);
        margin-top: 2px;
      }
      .dot {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-right: 6px;
        vertical-align: middle;
      }
      .dot.high   { background: var(--chevp-red); }
      .dot.medium { background: var(--chevp-orange); }
      .dot.low    { background: var(--chevp-blue); }
    `);
  }

  setTasks(tasks: TaskItem[]): void {
    this.tasks = tasks;
    this.render();
  }

  private render(): void {
    this.root.innerHTML = this.tasks.map(t => `
      <div class="item">
        <md-checkbox data-id="${t.id}" ${t.done ? 'checked' : ''} touch-target="wrapper"></md-checkbox>
        <div>
          <div class="text ${t.done ? 'done' : ''}">${t.text}</div>
          ${t.due ? `<div class="due">${t.priority ? `<span class="dot ${t.priority}"></span>` : ''}${t.due}</div>` : ''}
        </div>
      </div>
    `).join('');

    this.root.querySelectorAll('md-checkbox').forEach(cb => {
      cb.addEventListener('change', () => {
        const id = (cb as HTMLElement).dataset.id!;
        const task = this.tasks.find(t => t.id === id);
        if (task) {
          task.done = !task.done;
          this.render();
          this.emit('chevp:task-toggled', { id, done: task.done });
        }
      });
    });
  }
}
