const key = (type, id) => `comments-${type}-${id}`;
export function addComment(type, id, text, parentIndex = null) {
  const comments = JSON.parse(localStorage.getItem(key(type, id)) || "[]");
  const entry = { text, date: new Date().toISOString(), replies: [] };
  if (parentIndex === null) comments.push(entry);
  else comments[parentIndex].replies.push(entry);
  localStorage.setItem(key(type, id), JSON.stringify(comments));
}
export function getComments(type, id) {
  return JSON.parse(localStorage.getItem(key(type, id)) || "[]");
}
