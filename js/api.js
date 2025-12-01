const API_KEY = "ef4e8fb5f92b3746a5b002bdffed70d3";
const BASE = "https://api.themoviedb.org/3";

export const fetchTrending = (t = "movie") =>
  fetch(`${BASE}/trending/${t}/week?api_key=${API_KEY}`).then((r) => r.json());
export const fetchList = (t = "movie", p = 1) =>
  fetch(`${BASE}/discover/${t}?api_key=${API_KEY}&page=${p}`).then((r) =>
    r.json(),
  );
export const fetchDetails = (t, id) =>
  fetch(
    `${BASE}/${t}/${id}?api_key=${API_KEY}&append_to_response=credits,reviews,similar`,
  ).then((r) => r.json());
export const searchQuery = (q) =>
  fetch(
    `${BASE}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(q)}`,
  ).then((r) => r.json());
