<template>
  <div class="show-simulation">
    <div class="balances-chart"></div>
  </div>
</template>

<script>

import BalancesChart from 'components/balances_chart'

export default {
  components: {},

  data() {
    return {};
  },

  mounted() {
    this.drawChart();
    window.addEventListener("resize", () => this.drawChart());
  },

  methods: {
    drawChart () {
      if (this.balancesChart) this.balancesChart.svg.remove();
      // use true width for better text rendering
      const width = this.$el.clientWidth;
      // maintain 16:10 aspect ratio
      const height = Math.ceil((width / 16) * 10);
      this.balancesChart = new BalancesChart({
        el: this.$el.querySelector(".balances-chart"),
        width: width,
        height: height
      });
    }
  }
}

</script>

<style scoped>
/* none yet */
</style>
