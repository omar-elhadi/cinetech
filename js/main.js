// Home page initialization
import { fetchTrending } from "./api.js";
import { renderCards } from "./ui.js";

// Load and display trending content on home page
async function loadHome() {
  // Fetch both movies and series simultaneously for better performance
  const [movies, series] = await Promise.all([
    fetchTrending("movie"),
    fetchTrending("tv"),
  ]);
  // Render results to respective grid containers
  renderCards(movies.results, "#trending-movies");
  renderCards(series.results, "#trending-series");
}

// Wait for DOM to be ready before initializing
document.addEventListener("DOMContentLoaded", loadHome);
