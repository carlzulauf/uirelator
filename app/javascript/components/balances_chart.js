import * as d3 from "d3";

window.d3 = d3;

const parseDate = d3.timeParse("%Y-%m-%d");

class BalancesChart {
  constructor(options) {
    this.options = Object.assign(this.defaultOptions(), options);
    this.columns = this.preloadedColumns();
    this.svg = this.buildSvg();
    this.createTooltip();
    this.drawPreloadedLines();
    window.currentBalancesChart = this;
  }

  defaultOptions() {
    return {
      width: 1024,
      height: 576,
      margin: { bottom: 20, left: 100, right: 15, top: 0 }
    };
  }

  buildSvg() {
    const
      width = this.options.width,
      height = this.options.height,
      margin = this.options.margin;
    const svg = d3.select(this.options.el).append("svg")
      .attr("viewBox", [0, 0, width, height])
      .style("overflow", "visible");
    svg.append("g").call(this.buildXAxis(margin, width, height));
    svg.append("g").call(this.buildYAxis(margin, height));
    return svg;
  }

  buildXAxis(margin, width, height) {
    this.xScale = d3.scaleTime()
      .domain([this.startDate(), this.stopDate()])
      .range([margin.left, width - margin.right]);
    return (g) => {
      g.attr("transform", `translate(0, ${height - margin.bottom})`)
       .call(d3.axisBottom(this.xScale).tickSizeOuter(0));
    }
  }

  buildYAxis(margin, height) {
    this.yScale = d3.scaleLinear()
      .domain([0, this.maxY()])
      .range([height - margin.bottom, margin.top]);
    return (g) => {
      g.attr("transform", `translate(${margin.left}, 0)`)
       .call(d3.axisLeft(this.yScale))
       .call(g => g.select(".domain").remove());
    }
  }

  maxY() {
    return d3.max(this.balances()) * 1.3;
  }

  drawPreloadedLines() {
    this.columns[0].totals.forEach((_total, lineNum) => this.drawLine(lineNum));
  }

  drawLine(index = 0) {
    const lineData = this.buildLineData(index);
    const line = d3.line()
      .curve(d3.curveLinear)
      .x(c => this.xScale(c.date))
      .y(c => this.yScale(c.total));
    const color = this.lineColor(index);
    const path = this.svg.append("path")
      .datum(lineData)
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("d", line);
    const length = path.node().getTotalLength();

    if (index == 0) {
      path.attr("stroke-width", 2.0);
    } else {
      path.attr("stroke-width", 1.5)
        .attr("opacity", 0.6);
    }
    path.attr("stroke-dasharray", `${length} ${length}`)
      .attr("stroke-dashoffset", length)
      .transition()
        .duration(2000)
        .ease(d3.easeSin)
        .attr("stroke-dashoffset", 0);
  }

  buildLineData(index = 0) {
    const points = [];
    this.columns.forEach((col, colNum) => {
      if (colNum == 0 || col.totals[index] > 0) {
        points.push({ date: col.date, total: col.totals[index], index: index });
      }
    });
    return points;
  }

  lineColor(index) {
    const last = this.columns[ this.columns.length - 1 ];
    return last.totals[index] > 0 ? "green" : "red";
  }

  createTooltip() {
    const
      svg = this.svg,
      tooltip = svg.append("g")
        .style("pointer-events", "none")
        .style("opacity", 0)
        .style("transition", "opacity 500ms ease-in-out"),
      x = this.xScale,
      y = this.yScale,
      bisect = this.dateBisector(),
      show = this.showTooltip,
      hide = this.hideTooltip;
    svg.on("touchmove mousemove", function (event) {
      const col = bisect(d3.pointer(event, this)[0]);
      tooltip.attr("transform", `translate(${x(col.date)},${y(col.totals[0])})`)
             .call(show, col);
    });
    svg.on("touchend mouseleave", () => tooltip.call(hide));
  }

  hideTooltip(g) {
    g.style("opacity", 0);
  }

  showTooltip(g, data) {
    g.style("opacity", 1)
     .style("pointer-events", "none");
    const formatDate = (date) => {
      return date.toLocaleString("en", {
        month:  "numeric",
        day:    "numeric",
        year:   "numeric"
      });
    };

    const formatCurrency = (value) => {
      return value.toLocaleString("en", {
        style: "currency",
        currency: "USD"
      });
    };

    const path = g.selectAll("path")
      .data([null])
      .join("path")
      .attr("fill", "white")
      .attr("stroke", "black");
    const text = g.selectAll("text")
      .data([null])
      .join("text")
      .call(t =>
        t.selectAll("tspan")
          .data([
            formatDate(data.date),
            `Total: ${formatCurrency(data.totals[0])}`
          ])
          .join("tspan")
            .attr("x", 0)
            .attr("y", (d, i) => `${i * 1.1}em`)
            .style("font-weight", (_, i) => i ? null : "bold")
            .text(d => d));
    const {x, y, width: w, height: h} = text.node().getBBox();
    text.attr("transform", `translate(${-w / 2}, ${15 - y})`);
    path.attr("d", `M${-w / 2 - 10},5H-5l5,-5l5,5H${w / 2 + 10}v${h + 20}h-${w + 20}z`);
  }

  dateBisector() {
    const bisect = d3.bisector(d => d.date).left;
    return (mx) => {
      const date = this.xScale.invert(mx),
            index = bisect(this.columns, date, 1),
            a = this.columns[index - 1],
            b = this.columns[index];
      return b && (date - a.date > b.date - date) ? b : a;
    }
  }

  formatDate(date) {
    return date.toLocaleString("en", {month: "short", day: "numeric", year: "numeric"});
  }

  formatCurrency(value) {
    return value.toLocaleString("en", { style: "currency", currency: "USD" });
  }

  balances(index = 0) {
    return this.columns.map(col => col.totals[index]);
  }

  preloadedColumns() {
    const columns = [];
    Preloads.summary.columns.forEach((col, colNum) => {
      columns.push({
        date: parseDate(col.date),
        balances: col.balances.map(accounts => accounts.map(b => +b)),
        totals: col.totals.map(t => +t)
      });
    });
    return columns;
  }

  startDate() {
    return this.columns[0].date;
  }

  stopDate() {
    return this.columns[this.columns.length - 1].date;
  }
}

export default BalancesChart;
