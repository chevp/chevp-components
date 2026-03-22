import { ChevpBaseComponent } from '../../utils/base-component.js';

export interface TaskItem {
  id: string;
  text: string;
  done: boolean;
  due?: string;
  priority?: 'low' | 'medium' | 'high';
}

/**
 * <chevp-task-list> — Interactive task list with checkboxes.
 * Populate via setTasks() method.
 *
 * @fires chevp:task-toggled - When a task checkbox is toggled. Detail: { id, done }
 */
export class ChevpTaskList extends ChevpBaseComponent {
  private tasks: TaskItem[] = [];

  constructor() {
    super();
    this.addStyles(`
      :host { display: block; }
      .item {
        display: flex; align-items: flex-start; gap: 10px;
        padding: 10px 0;
        border-bottom: 1px solid rgba(255,255,255,0.04);
      }
      .item:last-child { border-bottom: none; }
      .check {
        width: 18px; height: 18px;
        border: 2px solid var(--chevp-border-light);
        border-radius: 4px;
        cursor: pointer; flex-shrink: 0; margin-top: 1px;
        transition: all 0.15s;
        background: none;
        padding: 0;
      }
      .check:hover { border-color: var(--chevp-accent); }
      .check.done { background: var(--chevp-green); border-color: var(--chevp-green); }
      .text { font-size: 12px; line-height: 1.5; }
      .text.done { text-decoration: line-through; color: var(--chevp-text-dim); }
      .due { font-size: 11px; color: var(--chevp-text-dim); margin-top: 2px; }
      .dot {
        display: inline-block; width: 8px; height: 8px;
        border-radius: 50%; margin-right: 6px; vertical-align: middle;
      }
      .dot.high { background: var(--chevp-red); }
      .dot.medium { background: var(--chevp-orange); }
      .dot.low { background: var(--chevp-blue); }
    `);
  }

  setTasks(tasks: TaskItem[]): void {
    this.tasks = tasks;
    this.render();
  }

  private render(): void {
    this.root.innerHTML = this.tasks.map(t => `
      <div class="item">
        <button class="check ${t.done ? 'done' : ''}" data-id="${t.id}"></button>
        <div>
          <div class="text ${t.done ? 'done' : ''}">${t.text}</div>
          ${t.due ? `<div class="due">${t.priority ? `<span class="dot ${t.priority}"></span>` : ''}${t.due}</div>` : ''}
        </div>
      </div>
    `).join('');

    this.root.querySelectorAll('.check').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = (btn as HTMLElement).dataset.id!;
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
