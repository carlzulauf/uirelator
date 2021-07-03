<template>
  <div class="card mb-3">
    <div class="card-header">Fixed Income #{{index + 1}}</div>
    <div class="card-body">
      <!-- name -->
      <div class="row mb-3">
        <label
          class="col-4 col-form-label text-center"
          title="Description of fixed income account"
          data-bs-toggle="tooltip"
          :for="idPrefix + '_name'"
          >Description</label>
        <div class="col-8">
          <input
            class="form-control"
            type="text"
            :id="idPrefix + '_name'"
            :name="paramPrefix + '[name]'"
            v-model="account.name"/>
        </div>
      </div>
      <!-- monthly_income -->
      <div class="row mb-3">
        <label
          class="col-4 col-form-label text-center"
          title="Amount account is expected to payout per month, in today's dollars"
          data-bs-toggle="tooltip"
          :for="idPrefix + '_monthly_income'"
          >Monthly Income</label>
        <div class="col-8">
          <div class="input-group">
            <span class="input-group-text">$</span>
            <input
              class="form-control"
              type="text"
              :id="idPrefix + '_monthly_income'"
              :name="paramPrefix + '[monthly_income]'"
              v-model="account.monthly_income"/>
          </div>
        </div>
      </div>
      <!-- start_date -->
      <div class="row mb-3">
        <label
          class="col-4 col-form-label text-center"
          title="Date this account begins to start paying out"
          data-bs-toggle="tooltip"
          :for="idPrefix + '_start_date'"
          >Start Date</label>
        <div class="col-8">
          <input
            class="form-control"
            type="date"
            :id="idPrefix + '_start_date'"
            :name="paramPrefix + '[start_date]'"
            v-model="account.start_date"/>
        </div>
      </div>
      <!-- stop_date -->
      <div class="row mb-3">
        <label
          class="col-4 col-form-label text-center"
          title="Date this account stops paying account. Optional: may not apply."
          data-bs-toggle="tooltip"
          :for="idPrefix + '_stop_date'"
          >Stop Date</label>
        <div class="col-8">
          <input
            class="form-control"
            type="date"
            :id="idPrefix + '_stop_date'"
            :name="paramPrefix + '[stop_date]'"
            v-model="account.stop_date"/>
        </div>
      </div>
      <div class="row justify-content-evenly">
        <div class="col-auto">
          <div class="form-check">
            <input
              type="checkbox"
              class="form-check-input"
              :id="idPrefix + '_indexed'"
              :name="paramPrefix + '[indexed]'"
              v-model="account.indexed"/>
            <label
              class="form-check-label"
              title="Indexed for inflation, starting from start date."
              data-bs-toggle="tooltip"
              :for="idPrefix + '_indexed'"
              >Indexed</label>
          </div>
        </div>
        <div class="col-auto">
          <div class="form-check">
            <input
              type="checkbox"
              class="form-check-input"
              :id="idPrefix + '_taxable'"
              :name="paramPrefix + '[taxable]'"
              v-model="account.taxable"/>
            <label
              class="form-check-label"
              title="Payments from this account are added to taxable income."
              data-bs-toggle="tooltip"
              :for="idPrefix + '_taxable'"
              >Taxable</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Tooltips from "layout/tooltips"

export default {
  components: {},
  props: ['index', 'account'],
  data() {
    return {
      paramPrefix: `simulation[params][fixed_incomes][${this.index}]`,
      idPrefix: `simulation_params_fixed_incomes_${this.index}`,
    };
  },
  mounted() {
    Tooltips.activate(this.$el);
  }
}

</script>

<style scoped>

</style>
