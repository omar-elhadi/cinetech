// Live search functionality with autocomplete dropdown
import { searchQuery } from "./api.js";

const input = document.getElementById("search");
const box = document.getElementById("suggestions");

// Trigger search as user types
input.addEventListener("input", async () => {
  const q = input.value.trim();
  if (!q) return (box.innerHTML = ""); // Clear suggestions if input is empty

  const data = await searchQuery(q);
  // Display top 5 results with media type indicator
  box.innerHTML = data.results
    .slice(0, 5)
    .map(
      (m) => `
    <div class="suggestion" data-id="${m.id}" data-type="${m.media_type}">
      ${m.title || m.name} <small>(${(
        m.media_type || ""
      ).toUpperCase()})</small>
    </div>`
    )
    .join("");
});

// Navigate to detail page when suggestion is clicked
box.addEventListener("click", (e) => {
  const s = e.target.closest(".suggestion");
  if (s)
    location.href = `detail.html?id=${s.dataset.id}&type=${s.dataset.type}`;
});
