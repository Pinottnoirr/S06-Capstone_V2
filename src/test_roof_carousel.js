// Wrap the entire carousel logic in a DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing rooftop carousel');
    
    function initRooftopCarousel() {
        const slides = document.querySelectorAll('.slide');
        const bullets = document.querySelectorAll('.bullet');
        const prevArrow = document.querySelector('.prev-arrow');
        const nextArrow = document.querySelector('.next-arrow');

        const button = document.getElementById("dropdownButton");
        const dropdown = document.getElementById("dropdownContent");
        const container = document.getElementById("dropdownContainer");
        
        const button2 = document.getElementById("dropdownButton2");
        const dropdown2 = document.getElementById("dropdownContent2");
        const container2 = document.getElementById("dropdownContainer2");
        



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

        //Drop Down Button1
        button.addEventListener("mouseenter", () => {
            dropdown.style.opacity = "1";
            dropdown.style.transform = "translateY(0)";
        });

        button.addEventListener("mouseleave", () => {
            dropdown.style.opacity = "0";
            dropdown.style.transform = "translateY(-10px)";
        });

        function setButtonPosition(x, y) {
            container.style.left = x + "px";
            container.style.top = y + "px";
        }

        function setDropdownHeight(height) {
            dropdown.style.height = height + "px";
        }

        function setDropdownWidth(width) {
            dropdown.style.width = width + "px";
        }
        
        function setButtonSize(height, width){
            button.style.height = height + "px";
            button.style.width = width + "px";
        }

        function setImagePosition(imageId, x, y) {
            const image = document.getElementById(imageId);
            image.style.position = "relative";
            image.style.left = x + "px";
            image.style.top = y + "px";
        }

        function setTextPosition(textId, x, y) {
            const text = document.getElementById(textId);
            text.style.position = "relative";
            text.style.left = x + "px";
            text.style.top = y + "px";
        }

        //Drop Down Button2
        button2.addEventListener("mouseenter", () => {
            dropdown2.style.opacity = "1";
            dropdown2.style.transform = "translateY(0)";
        });

        button2.addEventListener("mouseleave", () => {
            dropdown2.style.opacity = "0";
            dropdown2.style.transform = "translateY(-10px)";
        });

        function setButton2Position(x, y) {
            container2.style.left = x + "px";
            container2.style.top = y + "px";
        }

        function setDropdown2Height(height) {
            dropdown2.style.height = height + "px";
        }

        function setDropdown2Width(width) {
            dropdown2.style.width = width + "px";
        }
        
        function setButton2Size(height, width){
            button2.style.height = height + "px";
            button2.style.width = width + "px";
        }



        //Set button 1 properties
        // Example usage: Move the button to (50px, 200px)
        setButtonPosition(0, 400);
        //Set Button Properties(height, width, text_position_x)
        setButtonSize(50, 290);
        // Example usage: Set dropdown height to 100px
        setDropdownHeight(200);
        setDropdownWidth(290);
        // Example usage: Move image1 to (10px, 20px)
        setImagePosition("image1", 86, 0);
        // setImagePosition("image2", 50, -20);
        // Example usage: Move text1 to (-10px, 30px)
        setTextPosition("text1", 0, -5);
        setTextPosition("text2", 0, 0);

        // Set button 2 properties
        // Example usage: Move the button to (50px, 200px)
        setButton2Position(300, 400);
        //Set Button Properties(height, width, text_position_x)
        setButton2Size(50, 290);
        // Example usage: Set dropdown height to 100px
        setDropdown2Height(200);
        setDropdown2Width(290);
        // Example usage: Move image1 to (10px, 20px)
        setImagePosition("image12", 47, 0);
        // setImagePosition("image22", 50, 10);
        // Example usage: Move text1 to (-10px, 30px)
        setTextPosition("text12", 0, -5);
        setTextPosition("text22", 0, 0);

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



