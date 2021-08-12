import * as d3 from "d3";

window.d3 = d3;

const parseDate = d3.timeParse("%Y-%m-%d");

class BalancesChart {
  constructor(options) {
    this.options = Object.assign(this.defaultOptions(), options);
    this.buildSvg();
    this.drawInitialLine();
    this.createTooltip();
    console.log(["new BalancesChart()", this]);
  }

  defaultOptions() {
    return {
      width: 1024,
      height: 576,
      margin: { bottom: 20, left: 100, right: 15, top: 0 }
    };
  }

  buildSvg() {
    this.svg = d3.select(this.options.el)
                 .append("svg")
                 .attr("viewBox", [0, 0, this.options.width, this.options.height]);
    this.svg.append("g").call(this.buildXAxis());
    this.svg.append("g").call(this.buildYAxis());
  }

  buildXAxis() {
    const margin = this.options.margin,
          width = this.options.width,
          height = this.options.height;
    this.xScale = d3.scaleTime()
                    .domain([this.startDate(), this.stopDate()])
                    .range([margin.left, width - margin.right]);
    return (g) => {
      g.attr("transform", `translate(0, ${height - margin.bottom})`)
       .call(d3.axisBottom(this.xScale).tickSizeOuter(0));
    }
  }

  buildYAxis() {
    const margin = this.options.margin,
          height = this.options.height,
          maxY = d3.max(this.balances()) * 1.3;
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
          .duration(3000)
          .ease(d3.easeSin)
          .attr("stroke-dashoffset", 0);
  }

  createTooltip() {
    const svg = this.svg,
          tooltip = svg.append("g"),
          bisect = this.dateBisector(),
          x = this.xScale,
          y = this.yScale,
          show = this.showTooltip;
    svg.on("touchmove mousemove", function (event) {
      const data = bisect(d3.pointer(event, this)[0]);
      tooltip.attr("transform", `translate(${x(data.date)},${y(data.total)})`)
             .call(show, data);
    });
  }

  showTooltip(g, data) {
    g.style("display", null)
     .style("pointer-events", "none")
     .style("font", "10px sans-serif");

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
            `Date: ${formatDate(data.date)}`,
            `Total: ${formatCurrency(data.total)}`
          ])
          .join("tspan")
            .attr("x", 0)
            .attr("y", (d, i) => `${i * 1.1}em`)
            .style("font-weight", (_, i) => i ? null : "bold")
            .text(d => d));
    const {x, y, width: w, height: h} = text.node().getBBox();
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
