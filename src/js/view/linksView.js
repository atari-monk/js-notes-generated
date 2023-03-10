import { View } from "./view.js";

export class LinksView extends View {
  _parentElement = document.querySelector(".links-view");

  _generateMarkup() {
    return this._data
      .map(
        (section) => `<article id="${section.text.toLowerCase()}">
        <h3>${section.text}</h3>
        <section class="list-point">
          <ol>
            <ul>
              ${section.links
            .map(
              (link) =>
                `<li class="list-point">
                  <a class='nav-link' href="${link.link}">${link.text}</a>
                 </li>`
            )
            .join("")}
            </ul>
          </ol>
        </section>
        </article>`
      )
      .join("");
  }
}

export default new LinksView();
