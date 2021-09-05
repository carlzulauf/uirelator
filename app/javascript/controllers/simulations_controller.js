import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [];

  connect() {
    console.log("in that sweet stimus controller")
  }

  show() {
    console.log("i guess actions work better than docs say")
  }
}
