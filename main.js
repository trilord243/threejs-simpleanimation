import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "white" });
const cube = new THREE.Mesh(geometry, material);

const geometry2 = new THREE.BoxGeometry(1, 1, 1);
const material2 = new THREE.MeshBasicMaterial({ color: "white" });

const cube2 = new THREE.Mesh(geometry2, material2);
cube2.position.x = 2;
/* scene.add(cube); */
/* scene.add(cube2); */

const light = new THREE.AmbientLight(0xffffff, 1);
const direcionallight = new THREE.DirectionalLight(0xffffff, 1);
direcionallight.position.set(0, 0, 2);
scene.add(light, direcionallight);

const size = {
  width: innerWidth,
  height: innerHeight,
};

const objLoader = new OBJLoader();

const gltfLoader = new GLTFLoader();

let animationMixer;

gltfLoader.load("./animatecube.glb", (gltf) => {
  animationMixer = new THREE.AnimationMixer(gltf.scene);
  const clipAction = animationMixer.clipAction(gltf.animations[0]);
  clipAction.play();
  scene.add(gltf.scene);
  console.log(gltf);
});

//loading

/* objLoader.load("./mono.obj", (objLoader) => {
  objLoader.position.set(0, -1, 0);
  objLoader.rotateZ(Math.PI);
  objLoader.children[0].material = new THREE.MeshNormalMaterial();

    objLoader.children[0].material.color.set(0xff0000);

  scene.add(objLoader);
  console.log(objLoader);
});
 */

/* const raycaster = new THREE.Raycaster();

const pointer = new THREE.Vector2();
const meshes = [cube, cube2];

const oneIntersectMesh = [];
 */
/* window.addEventListener("mousemove", (event) => {
  pointer.x = (event.clientX / size.width) * 2 - 1;
  pointer.y = -(event.clientY / size.height) * 2 + 1;
  //casting ray
  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(meshes);

  if (intersects.length > 0) {
    if (oneIntersectMesh.length < 1) {
      oneIntersectMesh.push(intersects[0].object);
    }
    oneIntersectMesh[0].material.color.set(0xff0000);
  } else if (oneIntersectMesh[0] !== undefined) {
    oneIntersectMesh[0].material.color.set(0xffffff);
    oneIntersectMesh.shift();
  }
});
 */

let previustime = 0;

const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
camera.position.z = 5;
scene.add(camera);
/* animationMixer.update() */
const canvas = document.querySelector(".draw");

const renderer = new THREE.WebGLRenderer({ canvas: canvas });

renderer.setSize(size.width, size.height);
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const clock = new THREE.Clock();

const animate = () => {
  requestAnimationFrame(animate);
  const elapsedTime = clock.getElapsedTime();

  const framteTime = elapsedTime - previustime;
  previustime = elapsedTime;

  if (animationMixer) {
    animationMixer.update(framteTime);
  }

  controls.update();

  renderer.render(scene, camera);
};
animate();
