import { View } from "./view.js";
import * as tool from "./../tool.js";

export class NotesView extends View {
  _parentElement = document.querySelector(".notes-view");

  _generateMarkup() {
    return this._data.map((note) => `<section id="${note.text.toLowerCase()}">
    <h2>${note.text}</h2>
    <ol>
      ${note.points ? this.#getPoints(note.points) : ''}
    </ol>
    </section>
    <a href='#'>Back to Top</a>
    <hr>`).join("");
  }

  #getPoints(points) {
    return points
      .map(
        (point, i) =>
          `<li>
          <p>${point?.text.join("<br>")}</p>
          ${point?.codes ? this.#getCodes(point?.codes, i) : ''}
         </li>`
      )
      .join("");
  }

  #getCodes(codes, i) {
    return codes?.map(
      (code, j) =>
        `${code.params ? this.#getAside(code.params) : ''}
        ${this.#getButtons(code, i, j)}`
    ).join("<br>");
  }

  #getButtons(code, i, j) {
    return code.format.map((cf, k) => `
        <p class='code' id="code${i + 1}${j + 1}${k + 1}">
          ${this.#getButton(i, j, k)}
          ${code.params ? this.#getCodeText(cf, code.params) : cf}                            
        </p>`).join("<br>");
  }

  #getButton(i, j, k) {
    return `<button class='btn-copy' id="code${i + 1}${j + 1}${k + 1}"></button>`;
  }

  #getAside(params) {
    let j = 1;
    return `<aside>
              <details>
                <summary>details</summary>
                ${params
        ?.map(
          (param, i) => {
            const detail = `<p>
              <mark class="mark-${j}">${param?.desc}</mark>
            </p>`
            j++;
            if (i > 0 && i % 6 === 0) j = 1;
            return detail;
          }
        )
        .join("")}
              </details>
            </aside>`;
  }

  #getCodeText(cformat, params) {
    const p = this.#getParams(params);
    return cformat.format(...p);
  }

  #getParams(params) {
    let j = 1;
    return params.map(
      (param, i) => { 
        const mark = `<mark class="mark-${j}">${param?.name}</mark>`;
        j++;
        if (i > 0 && i % 6 === 0) j = 1;
        return mark;
      }
    );
  }

  addHandlerClick(handler) {
    const elements = document.getElementsByClassName("btn-copy");
    Array.from(elements).forEach((element) =>
      element.addEventListener("click", handler)
    );
  }
}

export default new NotesView();
