import { Suspense, useRef, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Center } from '@react-three/drei'
import * as THREE from 'three'
import { useLanguage } from '../context/LanguageContext'
import styles from './Lobo3D.module.css'

/* ─── Constants ────────────────────────────────────────────────── */
const AUTO_ROTATE_SPEED = 0.006   // speed of slow Y-axis rotation
const SNAP_SPEED        = 0.08    // speed to lerp back to starting rotation on release
const SNAP_THRESHOLD    = 0.001   // snap tolerance

/* ─── Real 3D Wolf Model Component ────────────────────────────── */
function WolfModel({ isInteracting }) {
  // Load the GLTF/GLB model from public folder
  const { scene } = useGLTF('/lobo.glb')
  const groupRef = useRef()
  const snapping = useRef(false)

  // Auto-rotation and interactive snap-back logic
  useFrame(() => {
    const group = groupRef.current
    if (!group) return

    if (isInteracting.current) {
      // User is actively dragging, reset snapping to restart on release
      snapping.current = true
      return
    }

    if (snapping.current) {
      // Return smoothly to base rotation using spherical lerp
      group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, 0, SNAP_SPEED)
      group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, 0, SNAP_SPEED)
      group.rotation.z = THREE.MathUtils.lerp(group.rotation.z, 0, SNAP_SPEED)

      const isSnapped =
        Math.abs(group.rotation.x) < SNAP_THRESHOLD &&
        Math.abs(group.rotation.y) < SNAP_THRESHOLD &&
        Math.abs(group.rotation.z) < SNAP_THRESHOLD

      if (isSnapped) {
        group.rotation.set(0, 0, 0)
        snapping.current = false
      }
      return
    }

    // Default slow idle auto-rotation
    group.rotation.y += AUTO_ROTATE_SPEED
  })

  // Ensure the model receives and casts shadows if configured, and has shiny material highlights
  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
      if (child.material) {
        // Equilibrio perfecto: metalness medio para brillo de cromo sin tragarse toda la luz, roughness pulido
        child.material.roughness = 0.28
        child.material.metalness = 0.45
      }
    }
  })

  return (
    <group
      ref={groupRef}
      onPointerOver={() => { document.body.style.cursor = 'grab' }}
      onPointerOut={()  => { document.body.style.cursor = 'auto' }}
      onPointerDown={()  => { document.body.style.cursor = 'grabbing' }}
      onPointerUp={()   => { document.body.style.cursor = 'grab' }}
    >
      <Center>
        <primitive object={scene} scale={1.8} />
      </Center>
    </group>
  )
}

/* ─── Cyberpunk Neon Lighting Setup ───────────────────────────── */
function Scene() {
  const isInteracting  = useRef(false)
  const controlsRef    = useRef()

  const onStart = useCallback(() => { isInteracting.current = true  }, [])
  const onEnd   = useCallback(() => { isInteracting.current = false }, [])

  return (
    <>
      {/* Balanced ambient light for depth contrast without total darkness */}
      <ambientLight intensity={0.55} color="#FFFFFF" />

      {/* Cyberpunk neon color palette lights - angled frontally to paint the metallic mesh */}
      {/* Cyan light from front-left */}
      <directionalLight 
        position={[-2.5, 2, 3.5]} 
        intensity={4.0} 
        color="#00D4FF" 
      />
      {/* Magenta light from front-right */}
      <directionalLight 
        position={[2.5, 2, 3.5]} 
        intensity={4.0} 
        color="#FF2079" 
      />
      {/* Pure white key light directly from front-center to ensure clarity */}
      <directionalLight 
        position={[0, 0, 4]} 
        intensity={1.8} 
        color="#FFFFFF" 
      />
      {/* Rim light from top-back to make edges pop */}
      <pointLight 
        position={[0, 4, -2]} 
        intensity={1.8} 
        color="#FFFFFF" 
      />

      <Suspense fallback={null}>
        <WolfModel isInteracting={isInteracting} />
      </Suspense>

      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableRotate={true}
        enableZoom={true}
        rotateSpeed={0.8}
        minDistance={1.5}
        maxDistance={6.0}
        onStart={onStart}
        onEnd={onEnd}
      />
    </>
  )
}

/* ─── Public Component ──────────────────────────────────────────── */
export default function Lobo3D() {
  const { t } = useLanguage()

  return (
    <div className={styles.wrapper}>
      <div className={styles.badge}>
        <span className={styles.badgeDot} />
        {t('avatar3d.dragToRotate')}
      </div>
      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 45 }}
        dpr={[1, 2]}
        style={{ width: '100%', height: '100%', display: 'block' }}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene />
      </Canvas>
      <div className={styles.baseGlow} />
    </div>
  )
}

