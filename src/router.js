// Router configuration
const router = {
    init: function() {
        // Initial route handling
        this.handleRoute();
        
        // Add click event listeners to all navigation links and buttons
        document.querySelectorAll('.nav-link, .location-button').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const path = link.classList.contains('location-button') 
                    ? link.textContent.toLowerCase().replace(/\s+/g, '-').replace(/@/g, '-at-')
                    : link.getAttribute('href');
                history.pushState(null, '', path);
                this.handleRoute();
            });
        });

        // Handle browser back/forward buttons
        window.addEventListener('popstate', () => this.handleRoute());
    },

    handleRoute: async function() {
        const path = window.location.pathname;
        const routerView = document.getElementById('router-view');

        try {
            let content;
            // Remove leading slash and get the base path
            const cleanPath = path.replace(/^\//, '');
            
            switch(cleanPath) {
                case '':
                    routerView.innerHTML = '';
                    document.querySelector('.info-panel').style.display = 'block';
                    document.querySelector('#threejs-container').style.display = 'block';
                    break;
                    
                case 'about':
                    content = await this.loadPage('/pages/about/index.html');
                    routerView.innerHTML = content;
                    this.hideHomeElements();
                    break;
                    
                case 'ar':
                    content = await this.loadPage('/pages/ar/index.html');
                    routerView.innerHTML = content;
                    this.hideHomeElements();
                    break;
                    
                case 'story':
                    content = await this.loadPage('/pages/story/index.html');
                    routerView.innerHTML = content;
                    this.hideHomeElements();
                    break;

                // New routes for systems
                case 'indoor-farm':
                    content = await this.loadPage('/pages/indoor-farm/index.html');
                    routerView.innerHTML = content;
                    this.hideHomeElements();

                    const { initIndoorFarm } = await import('./indoor-carousel.js');
                    if (typeof initIndoorFarm === 'function') initIndoorFarm();
                    break;

                case 'rooftop-farm':
                    content = await this.loadPage('/pages/rooftop-farm/index.html');
                    routerView.innerHTML = content;
                    this.hideHomeElements();
                    // this bottom line force the bullet carousel js to run, due to router.js properties
                    // this.initRooftopCarousel();
                    break;

                case 'sutd-system':
                    content = await this.loadPage('/pages/sutd-system/index.html');
                    routerView.innerHTML = content;
                    this.hideHomeElements();
                    break;
                    
                default:
                    routerView.innerHTML = '<h1>404 - Page Not Found</h1>';
                    this.hideHomeElements();
            }
            
            // Update active state of navigation links
            this.updateActiveLink(cleanPath || 'home');
            
        } catch (error) {
            console.error('Routing error:', error);
            routerView.innerHTML = '<h1>Error loading page</h1>';
        }
    },

    hideHomeElements: function() {
        document.querySelector('.info-panel').style.display = 'none';
        document.querySelector('#threejs-container').style.display = 'none';
    },

    loadPage: async function(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const content = await response.text();
            return content;
        } catch (error) {
            console.error('Page loading error:', error);
            throw error;
        }
    },

    updateActiveLink: function(currentPath) {
        // Remove active class from all links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            }
        });
    },

    // initRooftopCarousel: function() {
    //     console.log('Initializing rooftop carousel');
    //     const slides = document.querySelectorAll('.slide');
    //     const bullets = document.querySelectorAll('.bullet');

    //     if (!slides.length || !bullets.length) {
    //         console.error('Carousel elements not found');
    //         return;
    //     }

    //     // Handle slide changes
    //     function changeSlide(index) {
    //         slides.forEach(slide => slide.classList.remove('active'));
    //         bullets.forEach(bullet => bullet.classList.remove('active'));
            
    //         slides[index].classList.add('active');
    //         bullets[index].classList.add('active');
    //     }

    //     // Add click handlers to bullets
    //     bullets.forEach((bullet, index) => {
    //         bullet.addEventListener('click', () => changeSlide(index));
    //     });

    //     // Add keyboard navigation
    //     document.addEventListener('keydown', (e) => {
    //         const currentIndex = [...slides].findIndex(slide => 
    //             slide.classList.contains('active')
    //         );
            
    //         if (e.key === 'ArrowLeft' && currentIndex > 0) {
    //             changeSlide(currentIndex - 1);
    //         } else if (e.key === 'ArrowRight' && currentIndex < slides.length - 1) {
    //             changeSlide(currentIndex + 1);
    //         }
    //     });
    // },


};

// Initialize router when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    router.init();
});