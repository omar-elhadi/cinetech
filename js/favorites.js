export function toggleFavorite(item) {
  const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
  const idx = favs.findIndex((f) => f.id === item.id && f.type === item.type);
  if (idx === -1) favs.push(item);
  else favs.splice(idx, 1);
  localStorage.setItem("favorites", JSON.stringify(favs));
}
export function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites") || "[]");
}
