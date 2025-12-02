// Comment section rendering and interaction for detail page
import { getComments, addComment } from "./comments.js";

// Get content ID from URL parameters
const params = new URLSearchParams(location.search);
const type = params.get("type");
const id = params.get("id");
const container = document.getElementById("user-comments");

// Render comment section with replies and input forms
function render() {
  const list = getComments(type, id);
  // Build comment HTML with nested replies
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

  // Add main comment input form
  container.insertAdjacentHTML(
    "beforeend",
    `
    <textarea id="new-top" placeholder="Laisser un commentaire"></textarea>
    <button id="submit-top">Publier</button>`
  );

  // Handle new top-level comment submission
  document.getElementById("submit-top").onclick = () => {
    const txt = document.getElementById("new-top").value.trim();
    if (!txt) return; // Ignore empty comments
    addComment(type, id, txt);
    render(); // Re-render to show new comment
  };

  // Handle reply button clicks
  container.querySelectorAll(".reply-btn").forEach((btn) => {
    btn.onclick = () => {
      const idx = +btn.dataset.idx;
      // Create reply input form
      const wrap = document.createElement("div");
      wrap.innerHTML = `<textarea placeholder="Écrire une réponse"></textarea><button>Publier la réponse</button>`;
      btn.disabled = true; // Disable button to prevent multiple reply forms
      btn.after(wrap);

      // Handle reply submission
      wrap.querySelector("button").onclick = () => {
        const txt = wrap.querySelector("textarea").value.trim();
        if (!txt) return; // Ignore empty replies
        addComment(type, id, txt, idx); // Add as reply to parent comment
        render(); // Re-render to show new reply
      };
    };
  });
}

// Initialize comment section when DOM is ready
document.addEventListener("DOMContentLoaded", render);
