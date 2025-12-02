import { API_KEY } from "./config.js";

const BASE = "https://api.themoviedb.org/3";

// Fetch trending movies or TV shows for the current week
export const fetchTrending = (t = "movie") =>
  fetch(`${BASE}/trending/${t}/week?api_key=${API_KEY}`).then((r) => r.json());

// Fetch paginated list of movies or TV shows
export const fetchList = (t = "movie", p = 1) =>
  fetch(`${BASE}/discover/${t}?api_key=${API_KEY}&page=${p}`).then((r) =>
    r.json()
  );

// Fetch detailed info including credits, reviews, and similar content
export const fetchDetails = (t, id) =>
  fetch(
    `${BASE}/${t}/${id}?api_key=${API_KEY}&append_to_response=credits,reviews,similar`
  ).then((r) => r.json());

// Search across movies, TV shows, and people
export const searchQuery = (q) =>
  fetch(
    `${BASE}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(q)}`
  ).then((r) => r.json());
