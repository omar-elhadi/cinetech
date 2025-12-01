import { getComments, addComment } from "./comments.js";

const params = new URLSearchParams(location.search);
const type = params.get("type");
const id = params.get("id");
const container = document.getElementById("user-comments");

function render() {
  const list = getComments(type, id);
  container.innerHTML = list
    .map(
      (c, idx) => `
    <div class="comment">
      <p>${c.text}<br><small>${new Date(c.date).toLocaleString()}</small></p>
      <button class="reply-btn" data-idx="${idx}">Répondre</button>
      <div class="replies">
        ${c.replies
          .map(
            (r) =>
              `<div class="reply">${r.text} — <small>${new Date(
                r.date
              ).toLocaleString()}</small></div>`
          )
          .join("")}
      </div>
    </div>`
    )
    .join("");

  container.insertAdjacentHTML(
    "beforeend",
    `
    <textarea id="new-top" placeholder="Laisser un commentaire"></textarea>
    <button id="submit-top">Publier</button>`
  );

  document.getElementById("submit-top").onclick = () => {
    const txt = document.getElementById("new-top").value.trim();
    if (!txt) return;
    addComment(type, id, txt);
    render();
  };

  container.querySelectorAll(".reply-btn").forEach((btn) => {
    btn.onclick = () => {
      const idx = +btn.dataset.idx;
      const wrap = document.createElement("div");
      wrap.innerHTML = `<textarea placeholder="Écrire une réponse"></textarea><button>Publier la réponse</button>`;
      btn.disabled = true;
      btn.after(wrap);
      wrap.querySelector("button").onclick = () => {
        const txt = wrap.querySelector("textarea").value.trim();
        if (!txt) return;
        addComment(type, id, txt, idx);
        render();
      };
    };
  });
}
document.addEventListener("DOMContentLoaded", render);
