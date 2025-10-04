/*
InteractiveBookComponent.jsx

Single-file React + react-three-fiber example that builds a procedural 3D book
(with covers + stacked pages) and a working page-flip animation. This is a
starting point for the "Interactive 3D Book / Codex" portfolio idea.

Dependencies:
  npm install three @react-three/fiber @react-three/drei

How to use:
  1. Save this file as src/InteractiveBookComponent.jsx
  2. In your App.jsx import: import InteractiveBookComponent from './InteractiveBookComponent'
  3. Render <InteractiveBookComponent /> inside your app.

Notes:
  - This example builds the book procedurally in code (no external 3D files).
  - Page content is rendered to HTML canvas and used as a THREE.CanvasTexture.
  - Page pivot is at the left edge (spine) by grouping and offsetting the mesh.
  - The flip animation is handled in React state and useFrame interpolation.

This file is intentionally commented for education and further extension.
*/

import React, { useRef, useState, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, useProgress } from '@react-three/drei'
import * as THREE from 'three'

// ------------------------ Helper: create canvas texture ---------------------
function createPageCanvasTexture({ title = '', body = '', width = 1024, height = 1536 }) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')

  // background
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, width, height)

  // header
  ctx.fillStyle = '#0b1220'
  ctx.font = 'bold 60px serif'
  ctx.fillText(title, 80, 120)

  // divider
  ctx.fillStyle = '#e6e6e6'
  ctx.fillRect(60, 140, width - 120, 6)

  // body text (simple wrapping)
  ctx.fillStyle = '#111'
  ctx.font = '26px serif'
  const words = body.split(' ')
  let line = ''
  let y = 220
  const maxW = width - 160
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' '
    const metrics = ctx.measureText(testLine)
    const testWidth = metrics.width
    if (testWidth > maxW && n > 0) {
      ctx.fillText(line, 80, y)
      line = words[n] + ' '
      y += 36
    } else {
      line = testLine
    }
  }
  ctx.fillText(line, 80, y)

  // subtle paper grain: tiny dots
  for (let i = 0; i < 1200; i++) {
    const rx = Math.random() * width
    const ry = Math.random() * height
    const r = Math.random() * 0.8
    ctx.fillStyle = `rgba(0,0,0,${0.02 + Math.random() * 0.03})`
    ctx.fillRect(rx, ry, r, r)
  }

  const tex = new THREE.CanvasTexture(canvas)
  tex.flipY = false // because plane geometry UVs in R3F expect this
  tex.needsUpdate = true
  return tex
}

// ------------------------ Page mesh ----------------------------------------
function Page({ width = 0.9, height = 1.4, index = 0, texture, rotationY = 0, zOffset = 0, doubleSided = true }) {
  // pivot technique: we put the mesh so its left edge sits at group's origin
  // mesh position.x = width/2 so when the group rotates around Y it pivots at left edge
  return (
    <group position={[0, 0, zOffset]}>
      <mesh position={[width / 2, 0, 0]} rotation={[0, rotationY, 0]} castShadow receiveShadow>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial map={texture} side={doubleSided ? THREE.DoubleSide : THREE.FrontSide} />
      </mesh>
    </group>
  )
}

// ------------------------ Book component ----------------------------------
function BookModel({ pagesData = [], coverColor = '#2b4752' }) {
  const spineToRight = false // set where the spine is; false => left spine (typical book)

  const bookWidth = 1.0
  const bookHeight = 1.5
  const coverThickness = 0.03
  const pageThickness = 0.002

  // create textures for each page (memoized)
  const pageTextures = useMemo(() => {
    return pagesData.map((p) => createPageCanvasTexture({ title: p.title, body: p.body }))
  }, [pagesData])

  // state for pagination
  const [currentIndex, setCurrentIndex] = useState(0) // index of the top-most unflipped page
  const [flipProgress, setFlipProgress] = useState(0) // 0 -> not flipping, 1 -> flipped fully
  const [isFlipping, setIsFlipping] = useState(false)
  const flipDirectionRef = useRef(1) // 1 = next (right->left), -1 = prev (left->right)

  // triggers a flip
  function flipNext() {
    if (isFlipping) return
    if (currentIndex >= pagesData.length) return
    flipDirectionRef.current = 1
    setIsFlipping(true)
    setFlipProgress(0)
  }
  function flipPrev() {
    if (isFlipping) return
    if (currentIndex <= 0) return
    flipDirectionRef.current = -1
    setIsFlipping(true)
    setFlipProgress(0)
  }

  // animate flipProgress to 1 and then update currentIndex
  useFrame((state, delta) => {
    if (!isFlipping) return
    const speed = 2.2 // change to taste
    setFlipProgress((p) => {
      const next = p + delta * speed
      if (next >= 1) {
        // finish flip
        setIsFlipping(false)
        if (flipDirectionRef.current === 1) {
          setCurrentIndex((i) => Math.min(i + 1, pagesData.length))
        } else {
          setCurrentIndex((i) => Math.max(i - 1, 0))
        }
        return 0
      }
      return next
    })
  })

  // compute rotation for the top page that is currently flipping
  // We'll treat pages in order: 0 (closest to spine) ... N-1 (outermost)

  return (
    <group rotation={[0, 0, 0]}>
      {/* covers */}
      {/* left cover (static) - positioned so its right edge sits at spine */}
      <group position={[-bookWidth / 2 - coverThickness / 2, 0, 0]}>
        <mesh>
          <boxGeometry args={[coverThickness, bookHeight + 0.02, bookWidth + 0.02]} />
          <meshStandardMaterial color={coverColor} />
        </mesh>
      </group>

      {/* right cover (this one can animate open) - pivot at spine */}
      <group position={[bookWidth / 2 + coverThickness / 2, 0, 0]}>
        <mesh rotation={[0, -Math.PI / 2 * 0.05 * flipProgress, 0]}> {/* tiny tilt while flipping */}
          <boxGeometry args={[coverThickness, bookHeight + 0.02, bookWidth + 0.02]} />
          <meshStandardMaterial color={coverColor} />
        </mesh>
      </group>

      {/* pages stack */}
      <group position={[ -0.02, 0, 0 ]}>
        {pageTextures.map((tex, idx) => {
          // compute relative index from top to bottom so draw order is correct
          const isTopPage = idx === currentIndex
          // If flipping next (direction 1), the top unflipped page is currentIndex
          // We animate that page's rotation based on flipProgress
          let rotationY = 0
          if (isFlipping && isTopPage && flipDirectionRef.current === 1) {
            rotationY = -Math.PI * Math.min(flipProgress, 1)
          }
          if (isFlipping && isTopPage && flipDirectionRef.current === -1) {
            // flipping back: rotate from -PI to 0
            rotationY = -Math.PI + Math.PI * Math.min(flipProgress, 1)
          }

          // small z-lift per page so faces don't z-fight
          const zOffset = idx * 0.0008

          return (
            <Page
              key={`page-${idx}`}
              index={idx}
              width={0.9}
              height={1.4}
              texture={tex}
              rotationY={rotationY}
              zOffset={zOffset}
              doubleSided={true}
            />
          )
        })}
      </group>

      {/* simple spine block to hide gaps */}
      <group position={[-0.46, 0, 0]}> {/* spine at left - tweak to align with pages */}
        <mesh>
          <boxGeometry args={[0.03, bookHeight + 0.02, bookWidth + 0.02]} />
          <meshStandardMaterial color={'#111827'} />
        </mesh>
      </group>

      {/* invisible click-catcher (for demo) placed above the right half to flip next */}
      <mesh position={[0.25, 0, 0.01]} onClick={() => flipNext()}>
        <planeGeometry args={[0.6, 1.4]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* left half - flip prev */}
      <mesh position={[-0.25, 0, 0.01]} onClick={() => flipPrev()}>
        <planeGeometry args={[0.5, 1.4]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </group>
  )
}

// ------------------------ Loading HUD -------------------------------------
function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div style={{ color: 'white', fontFamily: 'sans-serif' }}>{Math.floor(progress)}% loading</div>
    </Html>
  )
}

// ------------------------ Main exported component -------------------------
export default function InteractiveBookComponent() {
  // demo pages data - replace these with real content later
  const pages = [
    { title: 'About Me', body: 'Hello — I am a developer who builds interactive 3D experiences. This codex is a representation of my work and journey.' },
    { title: 'Skills', body: 'React, Three.js, GLSL shaders, Node.js, UI Design. I enjoy crafting delightful UI that merge function and motion.' },
    { title: 'Project A', body: 'Project A is an experimental visualizer that maps data to particles. Click to view tech stack and screenshots.' },
    { title: 'Project B', body: 'Project B is a small game prototype where the player explores a floating city. Built with React + R3F.' },
    { title: 'Contact', body: 'Email: youremail@example.com\nLinkedIn: /in/yourname' },
  ]

  return (
    <div style={{ width: '100vw', height: '100vh', background: 'linear-gradient(180deg,#0b1220 0%, #0b1530 100%)' }}>
      <Canvas shadows camera={{ position: [0, 0, 3.2], fov: 40 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.9} />

        <group position={[0, 0, 0]}> 
          <BookModel pagesData={pages} />
        </group>

        <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2.2} minPolarAngle={Math.PI / 2.2} />
        <Loader />
      </Canvas>

      {/* small instructions overlay */}
      <div style={{ position: 'absolute', left: 18, bottom: 18, color: 'white', fontFamily: 'sans-serif' }}>
        <div style={{ opacity: 0.9 }}>Click right side → next page · left side → previous page</div>
      </div>
    </div>
  )
}
