// import React, { useRef, useMemo, useEffect } from "react";
// import * as THREE from "three";
// import { Canvas, useFrame, useLoader } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";

// function Page({
//   pageWidth = 5,
//   pageHeight = 10,
//   pageDepth = 0.03,
//   widthSegments = 36,
//   heightSegments = 12,
//   frontUrl = "/frontcover.png",
//   backUrl = "/backcover.png",
// }) {
//   const skinnedMeshRef = useRef<THREE.SkinnedMesh>(null);
//   const bonesRef = useRef([]);
//   const pivotRef = useRef(null);

//   // create geometry + skin attributes once
//   const { geometry, materials } = useMemo(() => {
//     const geo = new THREE.BoxGeometry(
//       pageWidth,
//       pageHeight,
//       pageDepth,
//       widthSegments,
//       heightSegments,
//       1
//     );

//     // SHIFT geometry so origin is at the LEFT EDGE.
//     // Default box center is at 0: left edge = -pageWidth/2.
//     // Translating by +pageWidth/2 moves left edge to x=0 (mesh origin).
//     geo.translate(pageWidth / 2, 0, 0);

//     // compute skinIndex/skinWeight using new positions (x in [0 .. pageWidth])
//     const pos = geo.attributes.position;
//     const vertexCount = pos.count;
//     const bonesCount = widthSegments; // you can choose a different bones count
//     const skinIndex = new Uint16Array(vertexCount * 4);
//     const skinWeight = new Float32Array(vertexCount * 4);

//     for (let i = 0; i < vertexCount; i++) {
//       const x = pos.getX(i); // now ranges from 0..pageWidth
//       const s = x / pageWidth; // normalized [0..1]
//       const f = s * (bonesCount - 1);
//       const i0 = Math.floor(f);
//       const i1 = Math.min(bonesCount - 1, i0 + 1);
//       const w1 = f - i0;
//       const w0 = 1 - w1;
//       skinIndex[i * 4 + 0] = i0;
//       skinIndex[i * 4 + 1] = i1;
//       skinWeight[i * 4 + 0] = w0;
//       skinWeight[i * 4 + 1] = w1;
//     }

//     geo.setAttribute("skinIndex", new THREE.Uint16BufferAttribute(skinIndex, 4));
//     geo.setAttribute("skinWeight", new THREE.Float32BufferAttribute(skinWeight, 4));
//     geo.computeVertexNormals();

//     // materials: must enable skinning: true on each material
//     const loader = new THREE.TextureLoader();
//     const frontTx = loader.load(frontUrl);
//     const backTx = loader.load(backUrl);

//     const mats = [
//       new THREE.MeshStandardMaterial({ color: "#fff", skinning: true }), // +X right
//       new THREE.MeshStandardMaterial({ color: "#fff", skinning: true }), // -X left
//       new THREE.MeshStandardMaterial({ color: "#fff", skinning: true }), // +Y top
//       new THREE.MeshStandardMaterial({ color: "#fff", skinning: true }), // -Y bottom
//       new THREE.MeshStandardMaterial({ map: frontTx, skinning: true }),   // +Z front
//       new THREE.MeshStandardMaterial({ map: backTx, skinning: true }),    // -Z back
//     ];

//     return { geometry: geo, materials: mats };
//   }, [pageWidth, pageHeight, pageDepth, widthSegments, heightSegments, frontUrl, backUrl]);

//   // create bones and bind once
//   useEffect(() => {
//     if (!skinnedMeshRef.current || !geometry) return;

//     // bones along x from 0 .. pageWidth
//     const bones = [];
//     const bonesCount = widthSegments;
//     const spacing = pageWidth / (bonesCount - 1);

//     const root = new THREE.Bone();
//     root.name = "bone_0";
//     root.position.set(0, 0, 0); // LEFT EDGE (origin after translate)
//     bones.push(root);

//     let parent = root;
//     for (let i = 1; i < bonesCount; i++) {
//       const b = new THREE.Bone();
//       b.name = `bone_${i}`;
//       b.position.set(spacing, 0, 0); // local offset from parent
//       parent.add(b);
//       bones.push(b);
//       parent = b;
//     }

//     bonesRef.current = bones;

//     const skeleton = new THREE.Skeleton(bones);

//     // ensure mesh has identity transform for clean bind (mesh at origin)
//     // (we translated geometry instead of moving mesh)
//     skinnedMeshRef.current.add(root);
//     // IMPORTANT: update world matrices to ensure bone.matrixWorld is correct before bind
//     skinnedMeshRef.current.updateMatrixWorld(true);
//     bones.forEach((b) => b.updateMatrixWorld(true));
//     // bind (captures inverse bind matrices)
//     skinnedMeshRef.current.bind(skeleton);

//     // debug helper
//     const helper = new THREE.SkeletonHelper(skinnedMeshRef.current);
//     helper.visible = true;
//     skinnedMeshRef.current.add(helper);

//     return () => {
//       // cleanup (if unmounting)
//       try {
//         skinnedMeshRef.current.remove(helper);
//       } catch {}
//       bonesRef.current = [];
//     };
//   }, [geometry, widthSegments, pageWidth]);

//   // example animation: bend using bones (you can drive this from click/UI)
//   useFrame((state) => {
//     const bones = bonesRef.current;
//     if (!bones || bones.length === 0) return;
//     const t = state.clock.getElapsedTime();
//     const maxAngle = 0.9; // radians for example
//     for (let i = 0; i < bones.length; i++) {
//       const u = i / (bones.length - 1);
//       // Use envelope so root stays fixed and free edge bends:
//       const envelope = Math.sin((u * Math.PI) / 2);
//       bones[i].rotation.z = -maxAngle * envelope * Math.sin(t * 0.5 + u * 1.2);
//     }
//   });

//   // place mesh in world via group if you want and rotate group to flip around left edge
//   return (
//     <group ref={pivotRef} position={[0, 0, 0]}>
//       <skinnedMesh
//         ref={skinnedMeshRef}
//         geometry={geometry}
//         material={materials}
//         castShadow
//         receiveShadow
//       />
//     </group>
//   );
// }

// /** Example scene */
// export default function BookExample() {
//   return (
//     <Canvas camera={{ position: [6, 2, 12], fov: 45 }}>
//       <ambientLight intensity={0.6} />
//       <directionalLight position={[10, 10, 5]} intensity={1} />
//       <Page />
//       <OrbitControls />
//     </Canvas>
//   );
// }
