import { searchQuery } from "./api.js";

const input = document.getElementById("search");
const box = document.getElementById("suggestions");

input.addEventListener("input", async () => {
  const q = input.value.trim();
  if (!q) return (box.innerHTML = "");
  const data = await searchQuery(q);
  box.innerHTML = data.results
    .slice(0, 5)
    .map(
      (m) => `
    <div class="suggestion" data-id="${m.id}" data-type="${m.media_type}">
      ${m.title || m.name} <small>(${(m.media_type || "").toUpperCase()})</small>
    </div>`,
    )
    .join("");
});

box.addEventListener("click", (e) => {
  const s = e.target.closest(".suggestion");
  if (s)
    location.href = `detail.html?id=${s.dataset.id}&type=${s.dataset.type}`;
});
