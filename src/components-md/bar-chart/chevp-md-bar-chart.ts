import { ChevpMdBaseComponent } from '../../utils/md-base-component.js';

export interface BarChartData {
  label: string;
  value: number;
  highlight?: boolean;
}

/**
 * <chevp-md-bar-chart> — Material Design 3 vertical bar chart.
 * Populate via setData() method.
 *
 * @attr {string} height - Chart height in px (default: 200)
 */
export class ChevpMdBarChart extends ChevpMdBaseComponent {
  static observedAttributes = ['height'];
  private data: BarChartData[] = [];

  constructor() {
    super();
    this.addStyles(`
      :host { display: block; }
      .chart {
        display: flex;
        align-items: flex-end;
        gap: 8px;
        padding: 10px 0;
      }
      .bar-group {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
      }
      .bar {
        width: 100%;
        border-radius: var(--md-sys-shape-corner-small, 4px) var(--md-sys-shape-corner-small, 4px) 0 0;
        background: var(--md-sys-color-surface-container-highest);
        transition: height 0.3s;
      }
      .bar.highlight {
        background: var(--md-sys-color-primary);
      }
      .label {
        font-size: 10px;
        color: var(--md-sys-color-on-surface-variant);
      }
    `);
  }

  setData(data: BarChartData[]): void {
    this.data = data;
    this.render();
  }

  private render(): void {
    const height = parseInt(this.getAttribute('height') || '200');
    const max = Math.max(...this.data.map(d => d.value), 1);

    this.root.innerHTML = `
      <div class="chart" style="height:${height}px">
        ${this.data.map(d => {
          const barH = (d.value / max) * (height - 20);
          return `
            <div class="bar-group">
              <div class="bar ${d.highlight ? 'highlight' : ''}" style="height:${barH}px"></div>
              <span class="label">${d.label}</span>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }
}

customElements.define('chevp-md-bar-chart', ChevpMdBarChart);
