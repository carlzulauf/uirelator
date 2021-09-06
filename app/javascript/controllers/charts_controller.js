import { Controller } from "stimulus";
import { timeParse } from "d3";
import BalancesChart from "components/balances_chart";

const parseDate = timeParse("%Y-%m-%d");

export default class extends Controller {
  static targets = ['chart'];

  connect() {
    this.drawCharts();
    window.addEventListener("resize", () => this.drawCharts());
  }

  drawCharts() {
    if (this.chartInstances) this.removeCharts();
    this.chartInstances = [];
    this.chartTargets.forEach((el, i) => {
      const width = el.clientWidth;
      // maintain 16:10 aspect ratio
      const height = Math.ceil((width / 16) * 10);

      this.chartInstances.push(
        new BalancesChart({
          el: el,
          width: width,
          height: height,
        }, this.getSummary(i))
      );
    });
  }

  removeCharts() {
    this.chartInstances.forEach((chart) => chart.remove());
  }

  getSummary(index) {
    const columns = [];
    Preloads.summaries[index].columns.forEach((col, colNum) => {
      // preloaded JSON needs dates parsed and string numbers numberfied
      columns.push({
        date: parseDate(col.date),
        balances: col.balances.map(accounts => accounts.map(b => +b)),
        totals: col.totals.map(t => +t)
      });
    });
    return columns;
  }
}
