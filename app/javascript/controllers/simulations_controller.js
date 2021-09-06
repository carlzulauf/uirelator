import { Controller } from "stimulus";
import Tooltips from "layout/tooltips";

export default class extends Controller {
  static targets = ['page'];

  connect() {
    Tooltips.activate(document);
  }
}
