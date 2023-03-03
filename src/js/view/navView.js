import { View } from "./view.js";

export class NavView extends View {
  _parentElement = document.querySelector(".nav-view");

  _generateMarkup() {
    return this._data
      .map(
        (item) => `<li class="list-point horizontal">
          <a class='nav-link' href="#${item.text.toLowerCase()}">${item.text}</a>
          </li>`
      )
      .join("");
  }
}

export default new NavView();
