import { Tooltip } from 'bootstrap';

window.tooltips = []
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((toolEl) => {
    tooltips.push(new Tooltip(toolEl))
  })
})
