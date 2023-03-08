import navView from "../../view/generate/navView.js";
import metaView from "../../view/generate/metaView.js";
import notesView from "../../view/template/notesView.js";
import summaryView from "../../view/generate/summaryView.js";

class NoteRenderer {

  render(data, emptyView) {
    this.#setTitle(data.title);
    navView.render(data.nav);
    metaView.render(data.sections);
    emptyView.enableStyle("style");
    notesView.generateTemplate(data.notes);
    notesView.addHandlerClick(this.#copy);
    summaryView.render(data.summary);
    DEBUG && notesView._scrollToBottom();
  }

  #setTitle(title) {
    const titleEl = document.querySelector(".title");
    titleEl.innerText = title;
    titleEl.classList.remove("hide");
  }

  #copy(ev) {
    const id = ev.srcElement.id;
    const copyText = document.querySelectorAll(`#${id}`)[1];
    navigator.clipboard.writeText(copyText.innerText);
  }
}

export default new NoteRenderer();