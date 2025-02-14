import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';

const loader = new GLTFLoader();
loader.setMeshoptDecoder(MeshoptDecoder);
loader.load('src/models/model_.glb', function (gltf) {
    
    // Success callback
    const model = gltf.scene;
          
    // Optional: Scale the model if needed
    model.scale.set(0.1, 0.1, 0.1);  // Adjust these values as needed
    
    // Optional: Position the model
    model.position.set(5, 1, 5);  // Adjust these values as needed
    
    // Optional: Rotate the model if needed
    model.rotation.y = Math.PI / 2;  // Rotate 90 degrees if needed
    
    
    scene.add(model);
  },

  function (xhr) {
    // Progress callback
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    // Error callback
    console.error('An error occurred loading the model:', error);
  }
);

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff);
document.getElementById('threejs-container').appendChild(renderer.domElement);

// Add lights
const ambientLight = new THREE.AmbientLight(0x808080, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffccff, 0.8);
directionalLight.position.set(0, 10, 10);
scene.add(directionalLight);

// Create the base platform
const platformGeometry = new THREE.BoxGeometry(20, 0.5, 20);
const platformMaterial = new THREE.MeshPhongMaterial({ color: 0xcccccc });
const platform = new THREE.Mesh(platformGeometry, platformMaterial);
scene.add(platform);

// Create vertical farming structure
const createFarmingStructure = () => {
  const structure = new THREE.Group();
  
  // Main circular structure
  const circleGeometry = new THREE.CylinderGeometry(3, 3, 2, 32);
  const circleMaterial = new THREE.MeshPhongMaterial({ color: 0x666666 });
  const circle = new THREE.Mesh(circleGeometry, circleMaterial);
  circle.position.set(5, 1, 5);
  structure.add(circle);

  // Add vertical panels (blue elements in the image)
  const panelGeometry = new THREE.BoxGeometry(0.2, 2, 1);
  const panelMaterial = new THREE.MeshPhongMaterial({ color: 0x4444ff });
  
  for (let i = 0; i < 4; i++) {
    const panel = new THREE.Mesh(panelGeometry, panelMaterial);
    panel.position.set(3 + i * 0.5, 1, 3);
    structure.add(panel);
  }

  return structure;
};

scene.add(createFarmingStructure());

// Camera position
camera.position.set(15, 15, 15);
camera.lookAt(0, 0, 0);

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

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