// UI rendering utilities

/**
 * Render movie/series cards into a grid container
 * @param {Array} items - Array of movie/series objects from TMDB API
 * @param {string} selector - CSS selector for container element
 */
export function renderCards(items, selector) {
  const container = document.querySelector(selector);
  // Generate HTML for each card with poster and title
  container.innerHTML = items
    .map(
      (item) => `
    <div class="card" data-id="${item.id}" data-type="${
        item.media_type || "movie"
      }">
      <img loading="lazy" src="https://image.tmdb.org/t/p/w500${
        item.poster_path
      }" alt="${item.title || item.name}">
      <h3>${item.title || item.name}</h3>
    </div>`
    )
    .join("");

  // Add click handler to navigate to detail page
  container.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (card) {
      const { id, type } = card.dataset;
      location.href = `detail.html?id=${id}&type=${type}`;
    }
  });
}
