// =====================================================
// SOLEVAULT 3D MODEL VIEWER
// =====================================================

let scene;
let camera;
let renderer;
let model;
let loader;
let controls;
let animationId = null;

// Base distance the camera sits at once a model is auto-scaled to fit.
// zoom is now a *multiplier* on top of the auto-fit distance, not an
// absolute world-space number, so zoom in/out feels consistent
// regardless of a model's original real-world scale.
let zoomFactor = 1;
let baseDistance = 3;

const viewer = document.getElementById("modelViewer");
const canvas = document.getElementById("threeCanvas");

// ---------- One-time renderer setup ----------
// Creating a new WebGLRenderer on every open() leaks GL contexts
// (renderer.dispose() does not free the context) until the browser's
// context limit is hit and getContext() starts returning null.
// So we create it once and reuse it for every product.
function initRenderer() {
    if (renderer) return;

    renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
}

function clearScene() {
    if (!scene) return;

    // Dispose geometries/materials/textures from the previous model
    // so memory doesn't grow every time a product is opened.
    scene.traverse((obj) => {
        if (obj.isMesh) {
            obj.geometry?.dispose();
            if (Array.isArray(obj.material)) {
                obj.material.forEach((m) => m.dispose());
            } else {
                obj.material?.dispose();
            }
        }
    });

    while (scene.children.length) {
        scene.remove(scene.children[0]);
    }
}

function open3D(modelPath) {

    viewer.classList.remove("hidden");

    initRenderer();

    // Stop any previous render loop before starting a new one so loops
    // don't stack up across multiple opens.
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }

    model = null;
    zoomFactor = 1;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8f8f8);

    const width = canvas.clientWidth || 800;
    const height = canvas.clientHeight || 600;

    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

    renderer.setSize(width, height);

    const ambient = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(3, 5, 4);
    scene.add(light);

    // ---------- Orbit controls: drag to rotate, scroll to zoom ----------
    // Dispose the previous controls instance (if any) before creating a
    // new one, since each open() call gets a fresh camera.
    if (controls) {
        controls.dispose();
    }

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;      // smooth, inertia-like drag feel
    controls.dampingFactor = 0.08;
    controls.enablePan = false;         // keep the model centered, no dragging it off-screen
    controls.minDistance = 0.5;
    controls.maxDistance = 20;
    controls.target.set(0, 0, 0);

    loader = new THREE.GLTFLoader();

    loader.load(
        modelPath,
        function (gltf) {
            model = gltf.scene;
            scene.add(model);
            frameModel(model, width, height);
        },
        undefined, // onProgress
        function (error) {
            console.error("Failed to load 3D model:", modelPath, error);
            showLoadError();
        }
    );

    animate();
}

// ---------- Auto-fit camera & model regardless of source scale ----------
function frameModel(object, width, height) {

    object.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    const maxDimension = Math.max(size.x, size.y, size.z) || 1;

    // Normalize every model to roughly the same visual size,
    // no matter what units it was exported in.
    const targetSize = 2;
    const scaleFactor = targetSize / maxDimension;
    object.scale.setScalar(scaleFactor);

    // Re-center the model at the origin. IMPORTANT: position is an
    // unscaled translation, but `center` was measured in the object's
    // original (pre-scale) units, so it must be scaled by the same
    // scaleFactor before being used to cancel out the offset — otherwise
    // models whose scaleFactor is far from 1 end up positioned way off
    // from the origin instead of centered.
    object.position.set(
        -center.x * scaleFactor,
        -center.y * scaleFactor,
        -center.z * scaleFactor
    );

    // Position the camera far enough back to fit the (now normalized) model
    const fitHeightDistance = targetSize / (2 * Math.tan((Math.PI * camera.fov) / 360));
    baseDistance = fitHeightDistance * 1.6; // small padding

    camera.position.set(0, targetSize * 0.25, baseDistance);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();

    if (controls) {
        controls.target.set(0, 0, 0);
        controls.update();
    }
}

function showLoadError() {
    const box = document.querySelector(".model-box");
    if (!box) return;
    const msg = document.createElement("div");
    msg.className = "model-load-error";
    msg.style.cssText =
        "position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:#666;font-weight:600;text-align:center;padding:20px;";
    msg.textContent = "3D model could not be loaded.";
    box.appendChild(msg);
}

function clearLoadError() {
    document.querySelectorAll(".model-load-error").forEach((el) => el.remove());
}

function animate() {
    animationId = requestAnimationFrame(animate);

    // Model no longer auto-rotates — OrbitControls handles rotation
    // based on the user's mouse/touch drag instead.
    if (controls) {
        controls.update();
    }

    if (renderer && scene && camera) {
        renderer.render(scene, camera);
    }
}

// ===================================
// CLOSE
// ===================================

document.getElementById("close3D").onclick = function () {
    viewer.classList.add("hidden");

    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }

    clearScene();
    clearLoadError();
};

// ===================================
// ZOOM
// ===================================

document.getElementById("zoomIn").onclick = function () {
    zoomFactor -= 0.15;
    if (zoomFactor < 0.4) zoomFactor = 0.4;
    if (camera && controls) {
        const dir = new THREE.Vector3().subVectors(camera.position, controls.target).normalize();
        camera.position.copy(controls.target).addScaledVector(dir, baseDistance * zoomFactor);
    }
};

document.getElementById("zoomOut").onclick = function () {
    zoomFactor += 0.15;
    if (zoomFactor > 2) zoomFactor = 2;
    if (camera && controls) {
        const dir = new THREE.Vector3().subVectors(camera.position, controls.target).normalize();
        camera.position.copy(controls.target).addScaledVector(dir, baseDistance * zoomFactor);
    }
};