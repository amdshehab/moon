import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  AmbientLight,
  DirectionalLight,
  Color,
} from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import "./index.scss";

const scene = new Scene();
const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setClearColor(0xffffff);
document.body.appendChild(renderer.domElement);

const keyLight = new DirectionalLight(new Color("hsl(30, 100%, 75%)"), 1.0);
keyLight.position.set(-100, 0, 100);

const fillLight = new DirectionalLight(new Color("hsl(240, 100%, 75%)"), 0.75);
fillLight.position.set(100, 0, 100);

const backLight = new DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();

scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;
controls.update();

camera.position.z = 200;

const mtlLoader = new MTLLoader();

mtlLoader.load("/assets/moon.mtl", (materials) => {
  console.log("hello :)", materials);

  materials.preload();
  const loader = new OBJLoader();
  loader.setMaterials(materials);
  loader.load(
    // resource URL
    "/assets/moon.obj",
    // called when resource is loaded
    function (object) {
      scene.add(object);
    },
    // called when loading is in progresses
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    // called when loading has errors
    function (error) {
      console.log("An error happened");
    }
  );
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
