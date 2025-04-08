// src/entry.js

// Wait for DOM to be ready before running anything
window.addEventListener('DOMContentLoaded', async () => {
    // Import all required scripts manually
    await import('./router.js');
    await import('./story-carousel.js');
    await import('./test_roof_carousel.js');
    await import('./indoor-carousel.js');
    await import('./sutd-carousel.js');
    await import('./about-us.js');
  });
  