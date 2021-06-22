import Vue from 'vue'
import FixedIncomesFormlet from '../components/fixed_incomes_formlet'

const $container = document.querySelector("#fixedIncomesFields")
if (document.querySelector("#fixedIncomesFields")) {
  const app = new Vue({ render: h => h(FixedIncomesFormlet) }).$mount()
  $container.appendChild(app.$el)
}
