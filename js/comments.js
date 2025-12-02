// Comment system using localStorage
// Each movie/series has its own comment storage identified by type and ID

// Generate unique storage key for each movie/series
const key = (type, id) => `comments-${type}-${id}`;

/**
 * Add a new comment or reply
 * @param {string} type - 'movie' or 'tv'
 * @param {string} id - TMDB ID of the content
 * @param {string} text - Comment text
 * @param {number|null} parentIndex - Index of parent comment for replies, null for top-level
 */
export function addComment(type, id, text, parentIndex = null) {
  const comments = JSON.parse(localStorage.getItem(key(type, id)) || "[]");
  const entry = { text, date: new Date().toISOString(), replies: [] };
  if (parentIndex === null) comments.push(entry); // Top-level comment
  else comments[parentIndex].replies.push(entry); // Reply to existing comment
  localStorage.setItem(key(type, id), JSON.stringify(comments));
}

/**
 * Retrieve all comments for a specific movie/series
 * @param {string} type - 'movie' or 'tv'
 * @param {string} id - TMDB ID of the content
 * @returns {Array} Array of comment objects with nested replies
 */
export function getComments(type, id) {
  return JSON.parse(localStorage.getItem(key(type, id)) || "[]");
}
