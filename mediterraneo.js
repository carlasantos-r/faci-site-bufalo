// THREE.js 
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// CAMERA
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// GLTF LOADER
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// variáveis 
let scene, camera, renderer, controls, object;

// inicializando elementos básicos do projeto
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(30, window.innerWidth/window.innerHeight, 1, 30000);
camera.position.set(-2000, -200, 2000);

renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
document.getElementById("mediterraneo3d").appendChild(renderer.domElement);


// controles

controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 0;
controls.maxDistance = 125;

// skybox
let materialArray = [];
let texture_ft = new THREE.TextureLoader().load('env/nx.png');
let texture_bk = new THREE.TextureLoader().load('env/px.png'); 
let texture_up = new THREE.TextureLoader().load('env/py.png'); 
let texture_dn = new THREE.TextureLoader().load('env/ny.png'); 
let texture_rt = new THREE.TextureLoader().load('env/nz.png'); 
let texture_lf = new THREE.TextureLoader().load('env/pz.png'); 
  
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));

// loop de inversão
for (let i = 0; i < 6; i++)
  materialArray[i].side = THREE.BackSide;

let skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
let skybox = new THREE.Mesh(skyboxGeo, materialArray);
scene.add(skybox);

//3D

const loader = new GLTFLoader();
loader.load(
  `models/dino/mediterraneo.glb`,
  function (gltf) {
    //Se o arquivo estiver carregado, adiciona à cena
    object = gltf.scene;
    scene.add(object);
  },
  function (xhr) {
    //Enquanto estiver carregando, registra o progresso
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    //Se houver algum erro, registre
    console.error(error);
  }
);

//LUZ
const topLight = new THREE.DirectionalLight(0xffffff, 3); // (cor, intensidade)
topLight.position.set(0, 500, 500) 
topLight.castShadow = true;
scene.add(topLight);

const leftLight = new THREE.DirectionalLight(0xffffff, 2); // (cor, intensidade)
leftLight.position.set(-500, 500, 500) 
leftLight.castShadow = true;
scene.add(leftLight);

const rightLight = new THREE.DirectionalLight(0xffffff, 2); // (cor, intensidade)
rightLight.position.set(500, 500, 500) 
rightLight.castShadow = true;
scene.add(rightLight);

const underLight = new THREE.DirectionalLight(0xffffff, 3); // (cor, intensidade)
underLight.position.set(0, -500, 0) 
underLight.castShadow = true;
scene.add(underLight);

const ambientLight = new THREE.AmbientLight(0x333333, 2)
scene.add(ambientLight);

// adiciona um listener à janela, para que possamos redimensionar a janela e a câmera
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();