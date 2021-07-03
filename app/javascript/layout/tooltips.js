import { Tooltip } from 'bootstrap';

export default {
  activateOnLoad() {
    document.addEventListener("DOMContentLoaded", () => {
      window.tooltips = this.activate(document);
    });
  },
  activate(scope) {
    let tooltips = [];
    scope.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((el) => {
      tooltips.push(new Tooltip(el));
    });
    return tooltips;
  }
}
