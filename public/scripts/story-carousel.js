// Initial setup - keep track of whether we've initialized
let carouselInitialized = false;
let initializationInProgress = false;
let lastInitTime = 0;

console.log('story carousel script loaded');

const slideContents = {
    1: {
        practices_title: "RESPONSIBLE FOOD PRACTICES",
        practices_content: "We believe that sustainability starts right from the food source to the table and beyond. This is why we work with catering partners who advocate seasonal and locally harvested produce to reduce food miles and carbon emissions.",
        details_list: [
            "Farm to Table Practices",
            "Close partnerships with F&B Partners",
            "Eco Friendly cutlery and packaging for our F&B Products"
        ],
        mascot_position: "0%", // Starting position
        mascot_animation: "mascot-slide1" // Slide-specific animation class
    },
    2: {
        practices_title: "VERTICAL FARMING ON SITE",
        practices_content: "MICE venues such as EXPO can do more, by contributing to the local food production as well. By partnering with BlueAcres SG, a 2024 Impact Enterprise of the Year SME award winner, we have begun growing local produce right on site. In this way, we hope to be an exemplary example of a Circular Economy.",
        details_list: [
            "Rooftop farming",
            "Indoor farming"
        ],
        mascot_position: "25%", // Move 25% to the right
        mascot_animation: "mascot-slide2" // Slide-specific animation class
    },
    3: {
        practices_title: "AUTOMATED FARMING SYSTEM",
        practices_content: "Beyond employing today's methods of vertical farming, EXPO seeks to be a pioneer of vertical farming methods at MICE venues. We currently work with students from SUTD to develop an automation driven vertical farming system that brings about greater potential to food sustainability, a valuable advancement in modern farming methods.",
        details_list: [
            "Time savings",
            "Reduced labour costs",
            "Ability to scale harvest yield"
        ],
        mascot_position: "50%", // Move 50% to the right
        mascot_animation: "mascot-slide3" // Slide-specific animation class
    },
    4: {
        practices_title: "PLAY YOUR PART",
        practices_content: "We believe every action counts in building a sustainable future. Support food sustainability by choosing locally-sourced catering, reducing food waste, and embracing plant-based options at our events. Together, we can make a difference - one meal at a time. Let's creaete events that nourish both people and the planet.",
        details_list: [
            "Prioritise locally sourced ingredients",
            "Avoid animal-based food as they emit lost of Greenhouse gases (GHG)",
            "Plant-based food emit for lesser GHG",
            "Seafood products carrying the MSC or ASC eco-labels are preferred"
        ],
        mascot_position: "75%", // Move 75% to the right
        mascot_animation: "mascot-slide4" // Slide-specific animation class
    }
};

let slideIndex = 1;
// Animation timers that need to be cleared when switching slides
let animationTimer = null;
let pauseTimer = null;
let isAnimating = false; // Flag to prevent multiple animation cycles
let routerObserver = null;

// Debounce function to prevent multiple rapid calls
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}
//Arrow Functions
function prevSlide() {
    clearAnimationTimers();
    showSlides(slideIndex - 1);
}

function nextSlide() {
    clearAnimationTimers();
    showSlides(slideIndex + 1);
}

// Main initialization function with debounce protection
function initializeCarousel() {
    // Check if initialization was done recently or is in progress
    const now = Date.now();
    if (initializationInProgress || (now - lastInitTime < 1000)) {
        console.log('Initialization recently done or in progress, skipping');
        return;
    }
    
    initializationInProgress = true;
    lastInitTime = now;
    
    console.log('Attempting to initialize carousel');
    
    // Clean up before re-initializing
    clearAnimationTimers();
    
    // Check if we're on the story page by looking for relevant elements
    const storyContainer = document.querySelector('.story-container');
    if (!storyContainer) {
        console.log('Story container not found, carousel not initialized');
        initializationInProgress = false;
        return; // Exit if we're not on the story page
    }
    
    console.log('Initializing story carousel');
    
    // Reset the initialization flag (this is important for proper re-initialization)
    carouselInitialized = false;
    isAnimating = false;
    
    // Set up the event listeners for the dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        // Remove existing listeners to prevent duplicates
        const newDot = dot.cloneNode(true);
        dot.parentNode.replaceChild(newDot, dot);
        // Add new listener
        newDot.addEventListener('click', () => currentSlide(index + 1));
    });
    
    // Initialize the carousel
    showSlides(slideIndex);
    
    // Start the mascot animation with a delay to ensure everything is ready
    setTimeout(() => {
        // Only start if not already animating
        if (!isAnimating) {
            animateMascotCycle(slideIndex);
        }
        initializationInProgress = false;
        carouselInitialized = true;
    }, 500);

    // Add event listeners for arrow navigation
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    
    if (prevArrow) {
        prevArrow.addEventListener('click', prevSlide);
    }
    
    if (nextArrow) {
        nextArrow.addEventListener('click', nextSlide);
    }
    
    // Add keyboard event listener for left/right arrow keys
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
}

function currentSlide(n) {
    // Clear any existing animation timers
    clearAnimationTimers();
    showSlides(slideIndex = n);
}

function clearAnimationTimers() {
    // Clear all existing timers
    if (animationTimer) {
        clearTimeout(animationTimer);
        animationTimer = null;
    }
    if (pauseTimer) {
        clearTimeout(pauseTimer);
        pauseTimer = null;
    }
    
    // Reset the animation flag
    isAnimating = false;
    
    // Reset the mascot animation state
    const mascot = document.querySelector('.mascot-decoration1');
    if (mascot) {
        // Remove all possible animation classes
        mascot.classList.remove('mascot-jumping', 'mascot-slide1', 'mascot-slide2', 'mascot-slide3', 'mascot-slide4');
        
        // Force a reflow to ensure animations are completely stopped
        void mascot.offsetWidth;
    }
}

function animateMascotCycle(slideNumber) {
    // Prevent calling if animation already in progress
    if (isAnimating) {
        console.log('Animation already in progress, skipping');
        return;
    }
    
    const mascot = document.querySelector('.mascot-decoration1');
    if (!mascot) {
        console.log('Mascot element not found in animateMascotCycle');
        return;
    }
    
    const content = slideContents[slideNumber];
    if (!content) {
        console.log('No content found for slide ' + slideNumber);
        return;
    }
    
    // Set the flag to prevent multiple concurrent animations
    isAnimating = true;
    
    console.log('Starting animation for slide ' + slideNumber + ': ' + content.mascot_animation);
    
    // First set the mascot position without animation
    mascot.style.transition = 'none';
    mascot.style.left = content.mascot_position;
    
    // Force a reflow to apply the position immediately
    void mascot.offsetWidth;
    
    // Re-enable transition for future position changes
    mascot.style.transition = 'left 0.5s ease-in-out';
    
    // Wait a moment before adding the animation class
    setTimeout(() => {
        // Add the slide-specific animation class
        mascot.classList.add(content.mascot_animation);
        
        // Different durations based on slide
        let animationDuration;
        switch(slideNumber) {
            case 1: animationDuration = 8000; break; // 8s
            case 2: animationDuration = 6500; break; // 6.5s
            case 3: animationDuration = 4000; break; // 4s
            case 4: animationDuration = 4500; break; // 4.5s
            default: animationDuration = 3000;
        }
        
        // Clear the animation class after animation completes
        animationTimer = setTimeout(() => {
            mascot.classList.remove(content.mascot_animation);
            
            // Wait a bit longer before restarting the cycle
            pauseTimer = setTimeout(() => {
                isAnimating = false; // Reset the flag
                if (document.querySelector('.story-container')) {
                    animateMascotCycle(slideNumber);
                }
            }, 2000);
        }, animationDuration);
    }, 100);
}

function showSlides(n) {
    const slides = document.getElementsByClassName("carousel-slide");
    const dots = document.getElementsByClassName("dot");
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    
    if (!slides.length || !dots.length) {
        console.log('Slides or dots not found');
        return;
    }
    
    // Make sure slideIndex is within bounds
    if (n > slides.length) {
        slideIndex = 1;
    } else if (n < 1) {
        slideIndex = slides.length;
    } else {
        slideIndex = n;
    }

    // Update arrow states
    if (prevArrow && nextArrow) {
        prevArrow.classList.toggle('disabled', slideIndex === 1);
        nextArrow.classList.toggle('disabled', slideIndex === slides.length);
    }
    
    // Update classes for slides and dots
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
        dots[i].classList.remove("active");
    }
    
    slides[slideIndex-1].classList.add("active");
    dots[slideIndex-1].classList.add("active");
    
    // Get current slide content
    const content = slideContents[slideIndex];
    if (!content) {
        console.log('No content found for slide ' + slideIndex);
        return;
    }
    
    // Update practices section content
    const practicesTitle = document.querySelector('.practices-section h3');
    const practicesContent = document.querySelector('.practices-content p');
    const detailsList = document.querySelector('.details-list');
    
    if (practicesTitle && practicesContent && detailsList) {
        practicesTitle.textContent = content.practices_title;
        practicesContent.textContent = content.practices_content;
        
        detailsList.innerHTML = content.details_list
            .map(item => `<li>${item}</li>`)
            .join('');
    }
    
    // Update mascot position and restart animation
    const mascot = document.querySelector('.mascot-decoration1');
    if (mascot) {
        // Stop any current animations
        clearAnimationTimers();
        // Update the position
        mascot.style.left = content.mascot_position;
        mascot.style.transition = 'left 0.5s ease-in-out';
        
        // Wait for everything to settle before starting new animation
        setTimeout(() => {
            if (!isAnimating) {
                animateMascotCycle(slideIndex);
            }
        }, 500);
    }
}

// Create a debounced version of the initialization function
const debouncedInitialize = debounce(initializeCarousel, 300);

// The standard DOMContentLoaded for when the page first loads
document.addEventListener('DOMContentLoaded', () => {
    console.log("Story carousel DOMContentLoaded event fired");
    debouncedInitialize();
});

// Setup the observer with improved detection and debouncing
function setupObserver() {
    // Disconnect existing observer if it exists
    if (routerObserver) {
        routerObserver.disconnect();
    }
    
    // Create a new observer with improved detection logic
    routerObserver = new MutationObserver((mutations) => {
        let storyPageDetected = false;
        
        for (const mutation of mutations) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                // Check if any added node contains or is the story container
                for (let i = 0; i < mutation.addedNodes.length; i++) {
                    const node = mutation.addedNodes[i];
                    if (node.nodeType === 1) { // Element node
                        if (node.classList && node.classList.contains('story-container') || 
                            node.querySelector && node.querySelector('.story-container')) {
                            storyPageDetected = true;
                            break;
                        }
                    }
                }
                
                if (storyPageDetected) {
                    console.log("Story page detected via MutationObserver");
                    // Use debounced initialization to prevent multiple calls
                    debouncedInitialize();
                    break;
                }
            }
        }
    });
    
    // Start observing the router-view for changes
    const routerView = document.getElementById('router-view');
    if (routerView) {
        routerObserver.observe(routerView, { childList: true, subtree: true });
        console.log("Router observer setup complete");
    } else {
        // Try to observe the body if router-view isn't found
        routerObserver.observe(document.body, { childList: true, subtree: true });
        console.log("Router view not found, observing body instead");
    }
}

// Set up the observer
setupObserver();

// Export the initialization function so it can be called from outside if needed
window.initStoryCarousel = debouncedInitialize;