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
  DirectionalLightHelper,
} from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
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

const keyLight = new DirectionalLight(0xff560b, 5);
keyLight.position.set(70, 10, 100);

const secondaryLight = new DirectionalLight(0xffffff, 1.5);
secondaryLight.position.set(0, -100, 40);

scene.add(keyLight);

const helper = new DirectionalLightHelper(keyLight);
// const secondaryHelper = new DirectionalLightHelper(secondaryLight);
scene.add(helper);
// scene.add(secondaryHelper);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;
controls.update();

camera.position.z = 150;

const mtlLoader = new MTLLoader();
const loader = new OBJLoader();
loader.setPath("/assets/");
mtlLoader.setPath("/assets/");

let moon;
mtlLoader.load("moon.mtl", (materials) => {
  materials.preload();

  loader.setMaterials(materials);
  loader.load("moon.obj", (object) => {
    moon = object;
    moon.rotateY(180);
    moon.rotateX(-0.3);
    scene.add(object);
  });
});

// let tree;
// mtlLoader.load("/assets/Tree1/Tree1.mtl", (materials) => {
//   materials.preload();
//   const loader = new OBJLoader();
//   loader.setMaterials(materials);
//   loader.load(
//     "/assets/Tree1/Tree1.obj",
//     function (object) {
//       keyLight.target = object;
//       tree = object;
//       // keyLight.target = tree;
//       // moon = object;
//       // moon.rotateY(180);
//       // moon.rotateX(-0.3);
//       // keyLight.target = moon;
//       // object.scale.set(1, 1);
//       // mesh.scale.set(2, 2, 2);
//       tree.position.z += 80;
//       // tree.position.y -= 50;
//       // tree.position.x += 20;
//       scene.add(object);
//     },
//     // called when loading is in progresses
//     function (xhr) {
//       console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
//     },
//     // called when loading has errors
//     function (error) {
//       console.log("An error happened");
//     }
//   );
// });

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  helper.update();
  // secondaryHelper.update();
  if (moon) {
    moon.rotation.y += 0.0005;
  }
  // moon.rotation.x -= 0.001;
  // moon.rotation.z += 0.003;
  // tree.scale.set(10, 10, 5);
}
animate();
