<template>
  <div class="card mb-3">
    <div class="card-header">
      <div class="row">
        <div class="col">
          Fixed Income #{{index + 1}}
        </div>
        <div class="col text-end">
          <a
            title="Remove Fixed Income Account"
            data-bs-toggle="tooltip"
            class="remove-account"
            @click="removeAccount">
            <Icon name="window-close" class="danger"/>
          </a>
        </div>
      </div>
    </div>
    <div class="card-body">
      <!-- name -->
      <div class="row mb-3">
        <label
          class="col-4 col-form-label text-center"
          title="Description/name of fixed income account."
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
          title="Amount account is expected to payout per month, in today's dollars."
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
          title="Date this account begins to start paying out."
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
          title="Date this account stops paying out. If left blank then account will pay until simulated death."
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
      <div class="row mb-3">
        <label
          class="col-4 col-form-label text-center"
          title="Indexed for inflation, starting from start date."
          data-bs-toggle="tooltip"
          :for="idPrefix + '_indexed'"
          >Indexed</label>
        <div class="col-8 align-bottom">
          <div class="form-check form-switch pt-2">
            <input
              type="checkbox"
              class="form-check-input"
              :id="idPrefix + '_indexed'"
              :name="paramPrefix + '[indexed]'"
              v-model="account.indexed"/>
          </div>
        </div>
      </div>
      <div class="row">
        <label
          class="col-4 col-form-label text-center"
          title="Payments from this account are added to taxable income."
          data-bs-toggle="tooltip"
          :for="idPrefix + '_taxable'"
          >Taxable</label>
        <div class="col-8">
          <div class="form-check form-switch pt-2">
            <input
              type="checkbox"
              class="form-check-input"
              :id="idPrefix + '_taxable'"
              :name="paramPrefix + '[taxable]'"
              v-model="account.taxable"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Icon from 'components/icon';
import Tooltips from "layout/tooltips";

export default {
  components: { Icon },
  props: ['index', 'account'],
  data() {
    return {
      paramPrefix: `simulation[params][fixed_incomes][${this.index}]`,
      idPrefix: `simulation_params_fixed_incomes_${this.index}`,
    };
  },
  mounted() {
    this.tooltips = Tooltips.activate(this.$el);
  },
  beforeDestroy() {
    this.tooltips.forEach((tooltip) => tooltip.dispose());
  },
  methods: {
    removeAccount() {
      this.$emit('remove-account', this.index)
    }
  }
}

</script>

<style scoped>
  .remove-account { cursor: pointer; }
</style>
