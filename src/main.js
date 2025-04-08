import * as THREE from 'three';
import { WebGLRenderer, sRGBEncoding, DirectionalLight } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { LuminosityShader } from 'three/examples/jsm/shaders/LuminosityShader.js';

// Annotation Setup
const annotation = document.querySelector(".annotation");
const canvas = document.getElementById("number");
const ctx = canvas.getContext("2d");

// Function to draw numbers inside annotation circles
function drawAnnotationNumber(canvasId, number) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const x = 32, y = 32, radius = 30;

  // Clear previous drawing
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw Circle
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.stroke();

  // Draw Number
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.font = "32px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(number, x, y);
}

let model

const loader = new GLTFLoader();
loader.setMeshoptDecoder(MeshoptDecoder);
loader.load('src/models/model to be loaded_3.gltf', function (gltf) {
    
    // Success callback
    const model = gltf.scene;

          
    // Optional: Scale the model if needed
    model.scale.set(0.1, 0.1, 0.1);  // Adjust these values as needed
    
    // Optional: Position the model
    model.position.set(10, 0, 0);  // Adjust these values as needed
    
    // Optional: Rotate the model if needed
    model.rotation.y = Math.PI;  // Rotate 90 degrees if needed
    
    model.rotateY(-0.5);
    model.translateY(0);
    model.translateX(-15);

    

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

THREE.ColorManagement.legacyMode = false


// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff);
//renderer.shadowMap.enabled = true;
//renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.ACESFilmicToneMapping
document.getElementById('threejs-container').appendChild(renderer.domElement);



// Add lights
const ambientLight = new THREE.AmbientLight(0x808080, 3);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 5);
directionalLight.castShadow = true
scene.add(directionalLight);


// Create the base platform
const platformGeometry = new THREE.SphereGeometry(1);
const platformMaterial = new THREE.MeshPhongMaterial({ color: 0xcccccc });

const platform1 = new THREE.Mesh(platformGeometry, platformMaterial);
platform1.position.set(28, 2, 5);
scene.add(platform1);
platform1.visible = false; // Invisible reference object

const platform2 = new THREE.Mesh(platformGeometry, platformMaterial);
platform2.position.set(22, 10, 5);
scene.add(platform2);
platform2.visible = false;

const platform3 = new THREE.Mesh(platformGeometry, platformMaterial);
platform3.position.set(-5, 3, 8);
scene.add(platform3);
platform3.visible = false;

let annotationAnchors = [
  new THREE.Object3D(),  // Annotation 1
  new THREE.Object3D(),  // Annotation 2
  new THREE.Object3D()   // Annotation 3
];

// Position the annotation anchors relative to their platforms
annotationAnchors[0].position.set(0, 1, 0); // Above platform1
annotationAnchors[1].position.set(0, 1, 0); // Above platform2
annotationAnchors[2].position.set(0, 1, 0); // Above platform3

// Attach annotation anchors to respective platforms
platform1.add(annotationAnchors[0]);
platform2.add(annotationAnchors[1]);
platform3.add(annotationAnchors[2]);

// Call function to draw numbers on each annotation canvas
drawAnnotationNumber("number-1", "1");
drawAnnotationNumber("number-2", "2");
drawAnnotationNumber("number-3", "3");

// Function to handle annotation clicks
function handleAnnotationClick(annotationId) {
  let url = "";

  if (annotationId === 1) {
      url = "http://localhost:5173/rooftop-farm";
  } else if (annotationId === 2) {
      url = "http://localhost:5173/indoor-farm";

  }

  if (url) {
      window.location.href = url; // Redirects the user to the URL
  }
}

// 🎯 Attach click events to annotations
document.getElementById("annotation-1").addEventListener("click", () => handleAnnotationClick(1));
document.getElementById("annotation-2").addEventListener("click", () => handleAnnotationClick(2));
document.getElementById("annotation-3").addEventListener("click", () => handleAnnotationClick(3));



// Camera position
camera.position.set(75, 75, 70);
camera.lookAt(0, 0, 0);
camera.setFocalLength(50);

THREE.NeutralToneMapping


// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.target.set(0, 0, 0); // Set fixed rotation point (adjust as needed)
controls.maxPolarAngle = Math.PI / 3; // Restrict vertical movement
controls.minDistance = 2;
controls.maxDistance = 120;
controls.update();

// Create EffectComposer (acts as a rendering pipeline)
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));  // Render scene first

// 🎇 Bloom Effect
const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight), 
    10,  // Strength
    1,  // Radius
    0.85  // Threshold
);
composer.addPass(bloomPass);

// 🔥 Outline Effect
const outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
outlinePass.edgeStrength = 5;
outlinePass.edgeGlow = 1.2;
outlinePass.edgeThickness = 1.5;
outlinePass.visibleEdgeColor.set('#ff0000');  // Red outline
composer.addPass(outlinePass);

// 🌑 Grayscale Effect
const grayscalePass = new ShaderPass(LuminosityShader);
composer.addPass(grayscalePass);

function updateAnnotationPositions() {
  const annotations = [
      document.getElementById("annotation-1"),
      document.getElementById("annotation-2"),
      document.getElementById("annotation-3")
  ];

  annotationAnchors.forEach((anchor, index) => {
      const vector = new THREE.Vector3();
      anchor.getWorldPosition(vector);
      vector.project(camera); // Convert to screen coordinates

      const canvas = renderer.domElement;
      const x = (0.5 + vector.x / 2) * canvas.clientWidth;
      const y = (0.5 - vector.y / 2) * canvas.clientHeight;

      annotations[index].style.transform = `translate(${x}px, ${y}px)`;
  });
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();

  // 🎯 Rotate the model slowly
  if (model) { 
    model.rotation.y += 0.002; // Adjust the speed (lower = slower)
}

  renderer.render(scene, camera);
  updateAnnotationPositions(); // Update all annotation positions
}
animate();


// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});