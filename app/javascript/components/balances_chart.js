import * as d3 from "d3";

window.d3 = d3;

const parseDate = d3.timeParse("%Y-%m-%d");

class BalancesChart {
  constructor(options) {
    this.options = Object.assign(this.defaultOptions(), options);
    this.svg = this.buildSvg();
    this.drawInitialLine();
    this.createTooltip();
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
    const maxY = d3.max(this.balances()) * 1.3;
    this.yScale = d3.scaleLinear()
                    .domain([0, maxY])
                    .range([height - margin.bottom, margin.top]);
    return (g) => {
      g.attr("transform", `translate(${margin.left}, 0)`)
       .call(d3.axisLeft(this.yScale))
       .call(g => g.select(".domain").remove());
    }
  }

  drawInitialLine() {
    const line = d3.line()
                   .curve(d3.curveLinear)
                   .x(d => this.xScale(d.date))
                   .y(d => this.yScale(d.total));
    this.initialLineData = this.datesWithBalances();
    const path = this.svg.append("path")
      .datum(this.initialLineData)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 2.0)
      .attr("d", line);
    const length = path.node().getTotalLength();
    path.attr("stroke-dasharray", `${length} ${length}`)
        .attr("stroke-dashoffset", length)
        .transition()
          .duration(2000)
          .ease(d3.easeSin)
          .attr("stroke-dashoffset", 0);
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
      const data = bisect(d3.pointer(event, this)[0]);
      tooltip.attr("transform", `translate(${x(data.date)},${y(data.total)})`)
             .call(show, data);
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
            `Total: ${formatCurrency(data.total)}`
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
    const bisect = d3.bisector(d => d.date).left,
          data = this.initialLineData;
    return (mx) => {
      const date = this.xScale.invert(mx),
            index = bisect(data, date, 1),
            a = data[index - 1],
            b = data[index];
      return b && (date - a.date > b.date - date) ? b : a;
    }
  }

  formatDate(date) {
    return date.toLocaleString("en", {month: "short", day: "numeric", year: "numeric"});
  }

  formatCurrency(value) {
    return value.toLocaleString("en", { style: "currency", currency: "USD" });
  }

  balances() {
    return Preloads.balances.balances.map(accounts => d3.sum(accounts));
  }

  dates() {
    return Preloads.balances.dates.map(str => parseDate(str));
  }

  columnFormat() {
    return {
      date: new Date(),
      totals: [1000, 1001],
      // mirrors account names array elsewhere
      balances: [ [500, 250, 250], [500, 251, 250] ]
    }
  }

  dataFormat() {
    return {
      dates: ["2020-01-01"], // corresponds to number/index of column objects (width of matrix)
      accounts: ["IRA", "Savings", "Roth"], // corresponds to index of account within each row in column object balances
      simulations: [0, 39363204521742172398000198292480853792], // corresponds to number of rows within column objects (height of matrix)
      columns: this.columnFormat()
    };
  }

  datesWithBalances() {
    const dates = this.dates(),
          balances = Preloads.balances.balances;
    return dates.map((date, index) => {
      return {
        date: date,
        balances: balances[index],
        total: d3.max([0, d3.sum(balances[index])]),
        index: index
      };
    });
  }

  startDate() {
    return new Date(Preloads.simulation.start_date);
  }

  stopDate() {
    return new Date(Preloads.simulation.target_death_date);
  }
}

export default BalancesChart;
