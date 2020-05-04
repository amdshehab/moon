import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  DirectionalLight,
  DirectionalLightHelper,
  CircleGeometry,
  Mesh,
  MeshPhongMaterial,
  ShaderMaterial,
  Vector2,
  Raycaster,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import "./index.scss";

const meshShader = require("./mesh.vert");
const meshFragShader = require("./mesh.frag");
const start = Date.now();
const scene = new Scene();
const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff);
document.body.appendChild(renderer.domElement);

const keyLight = new DirectionalLight(0xffffff, 2);
keyLight.position.set(70, 200, 500);
scene.add(keyLight);
const helper = new DirectionalLightHelper(keyLight);
// scene.add(helper);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;
controls.update();

camera.position.z = 20;

const circleGeom2 = new CircleGeometry(8, 400);
const circleMat2 = new ShaderMaterial({
  uniforms: {
    u_time: {
      type: "f",
      value: 0.0,
    },
    u_resolution: {
      type: "v2",
      value: new Vector2(window.innerWidth, window.innerHeight),
    },
  },
  vertexShader: meshShader,
  fragmentShader: meshFragShader,
});

const mesh2 = new Mesh(circleGeom2, circleMat2);
scene.add(mesh2);

const circleGeom = new CircleGeometry(5, 400);
const circleMat = new MeshPhongMaterial({ color: "#ffffff" });

const mesh = new Mesh(circleGeom, circleMat);
mesh.position.z += 3;
mesh.position.x += 0.5;
scene.add(mesh);

// mesh.scale.set(2, 2, 2);

mesh.addEventListener("");

const raycaster = new Raycaster();
const mouse = new Vector2(1, 1);
// const intersects = [];

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function animate() {
  raycaster.setFromCamera(mouse, camera);

  // calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObjects(mesh);

  for (const i = 0; i < intersects.length; i++) {
    // console.log("intersecting", Array.fromintersects);
    // mesh.scale.set(3, 3, 3);
    // console.log("helllllooooooooo", intersects[i]);

    intersects[i].object.material.color.set(0xff0000);
  }

  circleMat2.uniforms.u_time.value = 0.00025 * (Date.now() - start);
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

window.addEventListener("mousemove", onMouseMove, false);

animate();
