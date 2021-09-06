import { Controller } from "stimulus";
import Vue from 'vue';
import FixedIncomesFormlet from 'components/fixed_incomes_formlet';

export default class extends Controller {
  static targets = ['form', 'fixedIncomes'];

  connect() {
    this.fixedIncomesTargets.forEach((el, i) => {
      new Vue({ el: el, render: (h) => h(FixedIncomesFormlet) });
    });
  }
}
