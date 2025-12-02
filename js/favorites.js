// Favorites management using localStorage

/**
 * Toggle favorite status for a movie/series
 * @param {Object} item - Item to favorite (must have id, type, title, poster)
 */
export function toggleFavorite(item) {
  const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
  // Check if item already exists in favorites
  const idx = favs.findIndex((f) => f.id === item.id && f.type === item.type);
  if (idx === -1) favs.push(item); // Add to favorites
  else favs.splice(idx, 1); // Remove from favorites
  localStorage.setItem("favorites", JSON.stringify(favs));
}

/**
 * Get all favorited items from localStorage
 * @returns {Array} Array of favorite items
 */
export function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites") || "[]");
}
