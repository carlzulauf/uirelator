<template>
  <div>
    <div v-for="account in accounts" class="card mb-3">
      <div class="card-body">
        Test
      </div>
    </div>
    <div class="row mb-3 justify-content-center">
      <div class="col-12 col-sm-8 col-md-6 col-lg-4 d-grid">
        <a class="btn btn-secondary" @click="addAccount">
          <div class="row">
            <div class="col-auto"><Icon name="plus-square" class="success"/></div>
            <div class="col text-center">
              <span title="Includes pensions, social security, and defined benefit plans">
                Add Fixed Income
              </span>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from 'components/icon'

export default {
  components: {
    Icon
  },
  data() {
    return {
      accounts: [],
      // icon: "+"
    };
  },
  methods: {
    addAccount() {
      this.accounts.push(this.defaultAccount())
    },
    defaultAccount() {
      return {
        name: 'Fixed Income Account',
        monthly_income: 0,
        indexed: true,
        taxable: true,
      };
    }
  }
}
</script>

<style scoped>
/* none yet */
</style>
