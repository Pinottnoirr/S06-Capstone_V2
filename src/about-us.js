document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing about-us.js');
    
    // Create a function to handle the image slider
    function initImageSlider() {
        // Get all slides
        const slides = document.querySelectorAll('.circular-image .slide');
        
        if (slides.length === 0) {
            console.log('No slides found');
            return; // Exit if no slides found
        }
        
        console.log('Found ' + slides.length + ' slides');
        let currentSlide = 0;
        
        // Function to show the next slide
        function nextSlide() {
            // Remove active class from current slide
            slides[currentSlide].classList.remove('active');
            
            // Calculate the index of the next slide
            currentSlide = (currentSlide + 1) % slides.length;
            
            // Add active class to the next slide
            slides[currentSlide].classList.add('active');
        }
        
        // Clear any existing intervals to prevent multiple timers
        if (window.slideInterval) {
            clearInterval(window.slideInterval);
        }
        
        // Set interval to automatically change slides every 4 seconds
        window.slideInterval = setInterval(nextSlide, 4000);
        
        console.log('Slider initialized successfully');
    }

    // Initialize the image slider on page load
    initImageSlider();

    // Add a MutationObserver to handle dynamic content loading
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                // Check for either .slider or the entire .circular-image container
                if (document.querySelector('.slider') || document.querySelector('.circular-image')) {
                    console.log('Slider content detected, reinitializing');
                    initImageSlider();
                    // Don't disconnect the observer so it can reinitialize when navigating back
                }
            }
        });
    });

    // Start observing the router-view element
    const routerView = document.getElementById('router-view');
    if (routerView) {
        observer.observe(routerView, { childList: true, subtree: true });
    }

});


