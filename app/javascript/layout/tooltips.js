import { Tooltip } from 'bootstrap';

if (window.tooltips === undefined) { window.tooltips = [] };

export default {
  activateOnLoad() {
    document.addEventListener("DOMContentLoaded", () => {
      this.activate(document);
    });
  },
  activate(scope) {
    scope.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((el) => {
      tooltips.push(new Tooltip(el));
    });
  }
}
