import * as d3 from "d3"

class BalancesChart {
  constructor(options) {
    // required options
    this.d3       = options.d3
    this.balances = options.balance

    this.options = Object.assign(this.defaultOptions(), options)
  }

  defaultOptions() {
    return {

    }
  }
}
