// Wrap the entire carousel logic in a DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing rooftop carousel');
    
    function initRooftopCarousel() {
        const slides = document.querySelectorAll('.slide');
        const bullets = document.querySelectorAll('.bullet');
        const prevArrow = document.querySelector('.prev-arrow');
        const nextArrow = document.querySelector('.next-arrow');

        // Check if we're on the correct page by looking for carousel elements
        if (!slides.length || !bullets.length) {
            console.log('Carousel elements not found - might be on a different page');
            return;
        }

        let currentIndex = 0;

        function updateArrowStates() {
            prevArrow.classList.toggle('disabled', currentIndex === 0);
            nextArrow.classList.toggle('disabled', currentIndex === slides.length - 1);
        }

        function changeSlide(index) {
            if (index < 0 || index >= slides.length) return;
            
            currentIndex = index;
            slides.forEach(slide => slide.classList.remove('active'));
            bullets.forEach(bullet => bullet.classList.remove('active'));
            
            slides[index].classList.add('active');
            bullets[index].classList.add('active');
            
            updateArrowStates();
        }

        // Add click handlers to bullets
        bullets.forEach((bullet, index) => {
            bullet.addEventListener('click', () => changeSlide(index));
        });

        // Add click handlers to arrows
        prevArrow.addEventListener('click', () => {
            if (currentIndex > 0) {
                changeSlide(currentIndex - 1);
            }
        });

        nextArrow.addEventListener('click', () => {
            if (currentIndex < slides.length - 1) {
                changeSlide(currentIndex + 1);
            }
        });

        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' && currentIndex > 0) {
                changeSlide(currentIndex - 1);
            } else if (e.key === 'ArrowRight' && currentIndex < slides.length - 1) {
                changeSlide(currentIndex + 1);
            }
        });

        // Initialize arrow states
        updateArrowStates();
        changeSlide(0); // Start at first slide
    }

    // Add a MutationObserver to handle dynamic content loading
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                // Check if we're on the rooftop page by looking for specific elements
                if (document.querySelector('.slider-container')) {
                    initRooftopCarousel();
                    observer.disconnect(); // Stop observing once initialized
                }
            }
        });
    });

    // Start observing the router-view element
    const routerView = document.getElementById('router-view');
    if (routerView) {
        observer.observe(routerView, { childList: true, subtree: true });
    }

    // Also try to initialize immediately in case we're already on the correct page
    initRooftopCarousel();
});



