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
    return {}
  },
  mounted() {
    this.balancesChart = new BalancesChart({
      el: this.$el.querySelector(".balances-chart")
    })
  }
}

</script>

<style scoped>
/* none yet */
</style>
