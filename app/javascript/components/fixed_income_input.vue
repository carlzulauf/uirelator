<template>
  <div class="card mb-3">
    <div class="card-header">Fixed Income #{{index + 1}}</div>
    <div class="card-body">
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
            :value="account.name"/>
        </div>
      </div>
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
              :value="account.monthly_income"/>
          </div>
        </div>
      </div>
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
            :value="account.start_date"/>
        </div>
      </div>
      <div class="row mb-3">
        <label
          class="col-4 col-form-label text-center"
          title="Date this account stops paying account. May not apply."
          data-bs-toggle="tooltip"
          :for="idPrefix + '_stop_date'"
          >Stop Date</label>
        <div class="col-8">
          <input
            class="form-control"
            type="date"
            :id="idPrefix + '_stop_date'"
            :name="paramPrefix + '[stop_date]'"
            :value="account.stop_date"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {},
  props: ['index', 'account'],
  data() {
    return {
      paramPrefix: `simulation[params][fixed_incomes][${this.index}]`,
      idPrefix: `simulation_params_fixed_incomes_${this.index}`,
    };
  }
}

</script>

<style scoped>

</style>
