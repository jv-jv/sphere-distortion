import "./style.css"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import * as dat from "lil-gui"
import vertexShader from "./shaders/test/vertex.glsl"
import fragmentShader from "./shaders/test/fragment.glsl"

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
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      // uColors: { value: { r: 0.5, g: 0.2, b: 0.7 } },
      uColors: {
        value: {
          r: Math.random() * 0.5,
          g: Math.random() * 0.5,
          b: Math.random() * 0.5,
        },
      },

      // uR: { value: Math.random() },
      // uG: { value: Math.random() },
      // uB: { value: Math.random() },
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

window.addEventListener("touchend", () => {
  renderSphere({ x: 0, y: 0, z: 0 })
})

window.addEventListener("click", () => {
  renderSphere({ x: 0, y: 0, z: 0 })
})

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false

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

const tick = () => {
  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
