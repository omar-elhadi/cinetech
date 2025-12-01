import { fetchTrending } from "./api.js";
import { renderCards } from "./ui.js";

async function loadHome() {
  const [movies, series] = await Promise.all([
    fetchTrending("movie"),
    fetchTrending("tv"),
  ]);
  renderCards(movies.results, "#trending-movies");
  renderCards(series.results, "#trending-series");
}
document.addEventListener("DOMContentLoaded", loadHome);
