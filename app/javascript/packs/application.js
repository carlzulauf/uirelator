// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

// require("@popperjs/core")
// require("bootstrap")
// import { Tooltip, Toast, Popover } from 'bootstrap';

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import Vue from 'vue'
// import * as ActiveStorage from "@rails/activestorage"
import "channels"
import "layout/tooltips"

import FixedIncomesFormlet from 'components/fixed_incomes_formlet'

Rails.start()
Turbolinks.start()
// ActiveStorage.start()

// Vue.component('fixed-incomes-fields', FixedIncomesFormlet);
// document.addEventListener("DOMContentLoaded", () => {
//   new Vue({ el: '#app' });
// });
// start vue components
window.vueses = []
document.addEventListener("DOMContentLoaded", () => {
  const selectorToComponent = [
    ["#fixedIncomesFields", FixedIncomesFormlet],
  ];
  selectorToComponent.forEach((row) => {
    if (document.querySelector(row[0])) {
      window.vueses.push(
        new Vue({ el: row[0], render: (h) => h(row[1]) })
      );
    }
  })
})
