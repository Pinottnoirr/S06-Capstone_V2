
document.addEventListener('DOMContentLoaded', function() {
    console.log('roof scripted check loaded');
    const slides = document.querySelectorAll('.slide');
    const bullets = document.querySelectorAll('.bullet');

    // Handle slide changes
    function changeSlide(index) {
        // Remove active class from all slides and bullets
        slides.forEach(slide => slide.classList.remove('active'));
        bullets.forEach(bullet => bullet.classList.remove('active'));
        
        // Add active class to current slide and bullet
        slides[index].classList.add('active');
        bullets[index].classList.add('active');
    }

    // Add click handlers to bullets
    bullets.forEach((bullet, index) => {
        bullet.addEventListener('click', () => changeSlide(index));
    });

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        const currentIndex = [...slides].findIndex(slide => 
            slide.classList.contains('active')
        );
        
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            changeSlide(currentIndex - 1);
        } else if (e.key === 'ArrowRight' && currentIndex < slides.length - 1) {
            changeSlide(currentIndex + 1);
        }
    });
});