import "./style.css"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import * as dat from "lil-gui"
import testVertexShader from "./shaders/test/vertex.glsl"
import testFragmentShader from "./shaders/test/fragment.glsl"

/**
 * Base
 */
// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector("canvas.webgl")

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
)
camera.position.set(0, 0, 20)
scene.add(camera)

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()
const plane = new THREE.Plane()
const planeNormal = new THREE.Vector3()
const intersectionPoint = new THREE.Vector3()

window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  planeNormal.copy(camera.position).normalize()
  plane.setFromNormalAndCoplanarPoint(planeNormal, scene.position)
  raycaster.setFromCamera(mouse, camera)
  raycaster.ray.intersectPlane(plane, intersectionPoint)
  console.log("intersectionPoint :", intersectionPoint)
})

// Sphere

const renderSphere = ({ x, y, z }) => {
  const sphereGeometry = new THREE.SphereBufferGeometry(1, 100, 100)

  const count = sphereGeometry.attributes.position.count
  const randomsValues = new Float32Array(count).map((e) => Math.random())
  sphereGeometry.setAttribute(
    "aRandom",
    new THREE.BufferAttribute(randomsValues, 1)
  )

  const shaderMaterial = new THREE.RawShaderMaterial({
    vertexShader: testVertexShader,
    fragmentShader: testFragmentShader,
    uniforms: {
      uTime: { value: 0 },
    },
  })
  const sphere = new THREE.Points(sphereGeometry, shaderMaterial)
  sphere.position.set(x, y, z)
  scene.add(sphere)

  const instanceClock = new THREE.Clock()
  const sphereTick = () => {
    const elapsedTime = instanceClock.getElapsedTime()

    // Update material
    shaderMaterial.uniforms.uTime.value = elapsedTime

    // Call tick again on the next frame
    window.requestAnimationFrame(sphereTick)
  }
  sphereTick()
}

window.addEventListener("touchend", (e) => {
  console.log("e :", e)

  // const { x, y, z } = intersectionPoint
  renderSphere({ x: 2, y: 2, z: 2 })
})

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update material
  // shaderMaterial.uniforms.uTime.value = elapsedTime
  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
