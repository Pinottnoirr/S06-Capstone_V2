document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Indoor carousel and Three.js');
    
    function initIndoorCarousel() {
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

        // Carousel logic remains the same...
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
        prevArrow?.addEventListener('click', () => {
            if (currentIndex > 0) {
                changeSlide(currentIndex - 1);
            }
        });

        nextArrow?.addEventListener('click', () => {
            if (currentIndex < slides.length - 1) {
                changeSlide(currentIndex + 1);
            }
        });

        // Initialize arrow states
        updateArrowStates();
        changeSlide(0);
    }

    function initThreeJS() {
        // Check if Three.js container exists
        const container = document.getElementById('threejs-container-indoor');
        if (!container) {
            console.log('Three.js container not found');
            return;
        }

        // Import required Three.js modules
        import('three').then((THREE) => {
            import('three/examples/jsm/controls/OrbitControls.js').then(({ OrbitControls }) => {
                import('three/examples/jsm/loaders/GLTFLoader.js').then(({ GLTFLoader }) => {
                    // Scene setup
                    const scene = new THREE.Scene();
                    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
                    const renderer = new THREE.WebGLRenderer({ antialias: true });
                    
                    renderer.setSize(window.innerWidth, window.innerHeight);
                    renderer.setClearColor(0xFFFFFF);
                    container.appendChild(renderer.domElement);

                    // Lights
                    const ambientLight = new THREE.AmbientLight(0x808080, 1);
                    scene.add(ambientLight);
                    const directionalLight = new THREE.DirectionalLight(0xffccff, 0.8);
                    directionalLight.position.set(0, 10, 10);
                    scene.add(directionalLight);

                    // Load model
                    const loader = new GLTFLoader();
                    loader.load('src/models/growracks.gltf', function (gltf) {
                        const model = gltf.scene;
                        model.scale.set(1, 1, 1);
                        model.position.set(15, -5, 5);
                        model.rotation.y = Math.PI / 2;
                        scene.add(model);
                    });

                    // Camera position
                    camera.position.set(30, 30, 30);
                    camera.lookAt(0, 0, 0);

                    // Controls
                    const controls = new OrbitControls(camera, renderer.domElement);
                    controls.enableDamping = true;
                    controls.dampingFactor = 0.05;
                    controls.target.set(10, 0, 0); // Set fixed rotation point (adjust as needed)
                    controls.maxPolarAngle = Math.PI / 3; // Restrict vertical movement
                    controls.minDistance = 2;
                    controls.maxDistance = 120;
                    controls.update();

                    // Animation loop
                    function animate() {
                        requestAnimationFrame(animate);
                        controls.update();
                        renderer.render(scene, camera);
                    }
                    animate();

                    // Handle window resize
                    window.addEventListener('resize', () => {
                        camera.aspect = window.innerWidth / window.innerHeight;
                        camera.updateProjectionMatrix();
                        renderer.setSize(window.innerWidth, window.innerHeight);
                    });
                });
            });
        });
    }

    // Initialize both carousel and Three.js
    initIndoorCarousel();
    initThreeJS();

    // Add a MutationObserver to handle dynamic content loading
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                if (document.querySelector('.slider-container')) {
                    initIndoorCarousel();
                    initThreeJS();
                    observer.disconnect();
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


