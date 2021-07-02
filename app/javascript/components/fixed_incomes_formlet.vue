<template>
  <div>
    <FixedIncomeInput v-for="(account, index) in accounts" :account="account" :index="index"/>
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
import Icon from 'components/icon';
import FixedIncomeInput from 'components/fixed_income_input';

export default {
  components: {
    Icon,
    FixedIncomeInput
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
      let time = new Date();
      let date = [
        time.getFullYear(),
        (time.getMonth() + 1).toString().padStart(2, '0'),
        time.getDate().toString().padStart(2, '0')
      ].join("-");
      return {
        name: 'Fixed Income Account',
        monthly_income: 0,
        indexed: true,
        taxable: true,
        start_date: date,
        stop_date: null,
      };
    }
  }
}
</script>

<style scoped>
/* none yet */
</style>
