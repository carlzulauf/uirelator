import { Controller } from "stimulus";
import Vue from 'vue';
import ShowSimulation from "components/show_simulation";

export default class extends Controller {
  static targets = ['chart'];

  connect() {
    this.chartTargets.forEach((el) => {
      new Vue({ el: el, render: (h) => h(ShowSimulation) });
    });
  }
}
