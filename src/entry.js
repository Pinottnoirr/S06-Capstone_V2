// src/entry.js
window.addEventListener('DOMContentLoaded', async () => {
  await import('./router.js'); // ⬅️ Only load the router
});
