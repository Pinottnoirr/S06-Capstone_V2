document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing sutd carousel and Three.js');

    function initSUTDCarousel() {
        const slides = document.querySelectorAll('.slide');
        const bullets = document.querySelectorAll('.bullet');
        const prevArrow = document.querySelector('.prev-arrow');
        const nextArrow = document.querySelector('.next-arrow');
        const reasonSection = document.querySelector('.reason-section');
        const bulletNav = document.querySelector('.bullet-nav');

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
        const container = document.getElementById('threejs-container-sutd');
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
                    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
                    const renderer = new THREE.WebGLRenderer({ antialias: true });
                    
                    
                    renderer.setSize(window.innerWidth, window.innerHeight);
                    renderer.setClearColor(0x9bc9c0, 1); // nice soft background
                    renderer.shadowMap.enabled = true;
                    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
                    container.appendChild(renderer.domElement);

                    //env map loader
                    const cubeTextureLoader = new THREE.CubeTextureLoader();
                    const envMap = cubeTextureLoader.setPath('src/textures/').load([
                    'posx.jpg', 'negx.jpg',
                    'posy.jpg', 'negy.jpg',
                    'posz.jpg', 'negz.jpg'
                    ]);

                    scene.environment = envMap;  // Enable reflections
                    //scene.background = envMap; // Optional, sets the skybox

                    

                    // Ambient light for soft overall illumination
                    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
                    scene.add(ambientLight);

                    // Directional light for shadows
                    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
                    directionalLight.position.set(10, 20, 10);
                    directionalLight.castShadow = true;

                    // Shadow quality settings
                    directionalLight.shadow.mapSize.width = 4096;
                    directionalLight.shadow.mapSize.height = 4096;
                    directionalLight.shadow.camera.near = 1;
                    directionalLight.shadow.camera.far = 50;
                    directionalLight.shadow.camera.left = -10;
                    directionalLight.shadow.camera.right = 10;
                    directionalLight.shadow.camera.top = 10;
                    directionalLight.shadow.camera.bottom = -10;

                    scene.add(directionalLight);

                    const planeGeometry = new THREE.PlaneGeometry(200, 200);
                    const planeMaterial = new THREE.MeshStandardMaterial({
                    color: 0xa0dfc7,
                    roughness: 1,
                    metalness: 0
                    });
                    const shadowPlane = new THREE.Mesh(planeGeometry, planeMaterial);
                    shadowPlane.rotation.x = -Math.PI / 2;
                    shadowPlane.position.y = -4.01;
                    shadowPlane.receiveShadow = true;
                    scene.add(shadowPlane);
                    


                    // Create clock for animations
                    const clock = new THREE.Clock();
                    
                    let mixer = null
                    // Load model
                    const loader = new GLTFLoader();
                    loader.load('public/models/engine model_5.1.gltf', (gltf) => {
                        const model = gltf.scene;
                        const animations = gltf.animations;
                        model.castShadow = true;    // Object that casts the shadow
                        model.receiveShadow = true; // Object that receives the shadow
                        model.scale.set(0.3, 0.3, 0.3);
                        model.position.set(0, -4, 0);
                        model.rotation = Math.PI / 2;
                        model.rotation.y = -Math.PI / 2;
                        
                        
                        

                        if (animations && animations.length > 0) {
                            // Create an animation mixer to manage the animations 
                            mixer = new THREE.AnimationMixer(model);
                            
                            // Loop through the animations and add them to the mixer
                            animations.forEach((clip) => {
                                mixer.clipAction(clip).play();
                            });
                        
                            console.log(`Loaded ${animations.length} animations`);
                        } else {
                            console.log('No animations found in the model');
                        }

                        // Traverse to enable shadows for all meshes
                        model.traverse((child) => {
                            if (child.isMesh) {
                                child.castShadow = true;
                                child.receiveShadow = true;
                            }
                        });

                        scene.add(model);
                    });

                   
                    // Camera positions
                    camera.position.set(7, 2, 7);
                    camera.lookAt(0, 4, 0);

                    // Controls
                    const controls = new OrbitControls(camera, renderer.domElement);
                    controls.enableDamping = true;
                    controls.dampingFactor = 0.05;
                    controls.target.set(0, 0, 0); // Set fixed rotation point (adjust as needed)
                    controls.maxPolarAngle = Math.PI / 2; // Restrict vertical movement
                    controls.minDistance = 2;
                    controls.maxDistance = 120;
                    controls.update();

                
                    // Animation loop
                    function animate() {
                        requestAnimationFrame(animate);
                        
                        // Update mixer in the animation loop
                        if (mixer) {
                            const delta = clock.getDelta();
                            mixer.update(delta);
                        }
                        
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
    initSUTDCarousel();
    initThreeJS();


    // Add a MutationObserver to handle dynamic content loading
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                if (document.querySelector('.slider-container')) {
                    initSUTDCarousel();
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


