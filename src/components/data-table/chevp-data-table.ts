import { ChevpBaseComponent } from '../../utils/base-component.js';

export interface TableColumn {
  key: string;
  label: string;
  width?: string;
}

/**
 * <chevp-data-table> — Simple data table with header and rows.
 * Populate via setData() method.
 *
 * @fires chevp:row-clicked - When a row is clicked. Detail: { row, index }
 */
export class ChevpDataTable extends ChevpBaseComponent {
  private columns: TableColumn[] = [];
  private rows: Record<string, string>[] = [];

  constructor() {
    super();
    this.addStyles(`
      :host { display: block; }
      table { width: 100%; border-collapse: collapse; font-size: 12px; }
      th {
        text-align: left; padding: 8px 12px; font-weight: 600;
        color: var(--chevp-text-muted); font-size: 11px;
        text-transform: uppercase; letter-spacing: 0.05em;
        border-bottom: 1px solid var(--chevp-border);
      }
      td {
        padding: 10px 12px;
        border-bottom: 1px solid rgba(255,255,255,0.04);
      }
      tr.body-row { cursor: pointer; transition: background 0.15s; }
      tr.body-row:hover { background: var(--chevp-surface-2); }
    `);
  }

  setData(columns: TableColumn[], rows: Record<string, string>[]): void {
    this.columns = columns;
    this.rows = rows;
    this.render();
  }

  private render(): void {
    this.root.innerHTML = `
      <table>
        <thead>
          <tr>${this.columns.map(c =>
            `<th ${c.width ? `style="width:${c.width}"` : ''}>${c.label}</th>`
          ).join('')}</tr>
        </thead>
        <tbody>
          ${this.rows.map((row, i) => `
            <tr class="body-row" data-index="${i}">
              ${this.columns.map(c => `<td>${row[c.key] || ''}</td>`).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    this.root.querySelectorAll('.body-row').forEach(tr => {
      tr.addEventListener('click', () => {
        const index = parseInt((tr as HTMLElement).dataset.index!);
        this.emit('chevp:row-clicked', { row: this.rows[index], index });
      });
    });
  }
}
