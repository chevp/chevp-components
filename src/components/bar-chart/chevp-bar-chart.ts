import { ChevpBaseComponent } from '../../utils/base-component.js';

export interface BarChartData {
  label: string;
  value: number;
  highlight?: boolean;
}

/**
 * <chevp-bar-chart> — Simple vertical bar chart.
 * Populate via setData() method.
 *
 * @attr {string} height - Chart height in px (default: 200)
 */
export class ChevpBarChart extends ChevpBaseComponent {
  static observedAttributes = ['height'];
  private data: BarChartData[] = [];

  constructor() {
    super();
    this.addStyles(`
      :host { display: block; }
      .chart { display: flex; align-items: flex-end; gap: 8px; padding: 10px 0; }
      .bar-group { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; }
      .bar {
        width: 100%; border-radius: 4px 4px 0 0;
        background: var(--chevp-surface-2); transition: height 0.3s;
      }
      .bar.highlight { background: var(--chevp-accent); }
      .label { font-size: 10px; color: var(--chevp-text-dim); }
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

customElements.define('chevp-bar-chart', ChevpBarChart);