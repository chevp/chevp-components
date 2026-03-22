import { ChevpMdBaseComponent } from '../../utils/md-base-component.js';
import '@material/web/divider/divider.js';
import '@material/web/ripple/ripple.js';

export interface TableColumn {
  key: string;
  label: string;
  width?: string;
}

/**
 * <chevp-md-data-table> — Material Design 3 data table with ripple rows.
 * Populate via setData() method.
 *
 * @fires chevp:row-clicked - When a row is clicked. Detail: { row, index }
 */
export class ChevpMdDataTable extends ChevpMdBaseComponent {
  private columns: TableColumn[] = [];
  private rows: Record<string, string>[] = [];

  constructor() {
    super();
    this.addStyles(`
      :host { display: block; }
      table {
        width: 100%;
        border-collapse: collapse;
        font-size: var(--chevp-font-size-sm, 12px);
      }
      th {
        text-align: left;
        padding: 12px 16px;
        font-weight: 500;
        color: var(--md-sys-color-on-surface-variant);
        font-size: var(--chevp-font-size-sm, 12px);
        border-bottom: 1px solid var(--md-sys-color-outline-variant);
      }
      td {
        padding: 12px 16px;
        color: var(--md-sys-color-on-surface);
        border-bottom: 1px solid var(--md-sys-color-outline-variant);
      }
      tr.body-row {
        position: relative;
        cursor: pointer;
        transition: background 0.15s;
      }
      tr.body-row:hover {
        background: color-mix(in srgb, var(--md-sys-color-on-surface) 8%, transparent);
      }
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
