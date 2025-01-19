const container = document.getElementById("threejs-container");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);

const blocks = [];
const blockCount = 100;

for (let i = 0; i < blockCount; i++) {
  const size = Math.random() * 1 + 0.3;
  const geometry = new THREE.BoxGeometry(size, size, size);
  const material = new THREE.MeshStandardMaterial({
    color: Math.random() * 0xffffff,
  });

  const cube = new THREE.Mesh(geometry, material);

  cube.position.x = Math.random() * 40 - 20;
  cube.position.y = Math.random() * 40 - 20;
  cube.position.z = Math.random() * 10 - 5;

  scene.add(cube);
  blocks.push({
    mesh: cube,
    speed: Math.random() * 0.02 + 0.01,
  });
}

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('mousemove', onMouseMove, false);

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function animate() {
  requestAnimationFrame(animate);

  blocks.forEach((block) => {
    block.mesh.rotation.x += 0.01;
    block.mesh.rotation.y += 0.01;
    block.mesh.position.y -= block.speed;

    if (block.mesh.position.y < -20) {
      block.mesh.position.y = Math.random() * 20 + 20;
      block.mesh.position.x = Math.random() * 40 - 20;
      block.mesh.position.z = Math.random() * 10 - 5;
    }
  });

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(scene.children);

  for (let i = 0; i < intersects.length; i++) {
    intersects[i].object.material.color.set(0xff6347);
  }

  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
