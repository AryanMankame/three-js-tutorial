import React, { useEffect, useMemo, useState } from 'react';
import { Float, Html, OrbitControls } from '@react-three/drei';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { div, PI } from 'three/tsl';
import { pageNo } from './App';
import { degToRad, radToDeg } from 'three/src/math/MathUtils.js';
import { useAtom } from 'jotai';
const pagesPosition : Array<any> = [];
const Page = ({pageHeight,pageWidth,pageDepth,widthSegments,heightSegments,key_val,z_position,pageInfo,pageDistance,isFrontcover,isBackcover,...props} : any) => {
    const [pageNumber,setPageNumber] = useAtom(pageNo);
    useEffect(() => {
        for(let i=0;i<pagesPosition.length;i++) {
            if(i <= pageNumber) {
                pagesPosition[i] = 'L';
            }
            else pagesPosition[i] = 'R';
        }
    },[pageNo])
    const pageGeometry = new THREE.BoxGeometry(pageWidth,pageHeight,pageDepth,widthSegments,heightSegments,2);
    const [targetRotation,setrotation] = useState(0);
    console.log("->",targetRotation)
    console.log("pageInfo => ",pageInfo.front,pageInfo.back)
    // const segmentWidth = pageWidth / pageSegments;
    const bonesCount = widthSegments;
    const position = pageGeometry.attributes.position;
    const vector = new THREE.Vector3();
    const skinIndexes : any = [];
    const skinWeights : any = [];
    const bones : any = [];
    const positions = [];
    var pagePosition = "right";
    const frontTexture = new THREE.TextureLoader().load(pageInfo.front)
    const backTexture = new THREE.TextureLoader().load(pageInfo.back)
    console.log(key_val," ==> ",isFrontcover," => ",isBackcover)
    if(isFrontcover) {
        backTexture.colorSpace = THREE.SRGBColorSpace;
    }
    else if(isBackcover) {
        frontTexture.colorSpace = THREE.SRGBColorSpace;
    }
    else {
        frontTexture.colorSpace = backTexture.colorSpace = THREE.SRGBColorSpace;
    }
     const materials = [
        new THREE.MeshStandardMaterial({ color: '#ffffff' }), // right
        new THREE.MeshStandardMaterial({ color: '#ffffff' }), // left
        new THREE.MeshStandardMaterial({ color: '#ffffff' }), // top
        new THREE.MeshStandardMaterial({ color: '#ffffff' }), // bottom
        new THREE.MeshStandardMaterial({ map: frontTexture, roughness : 0.2, envMapIntensity : 0.5}),
        new THREE.MeshStandardMaterial({ map: backTexture, roughness : 0.2, envMapIntensity : 0.5}),  // back   (-Z)
    ]
    const skinnedMesh = new THREE.SkinnedMesh(pageGeometry, materials);
    console.log("skinned mesh =>",skinnedMesh.position)
    for(let i=0; i<position.count; i++) {
        vector.fromBufferAttribute(position, i);
        positions.push([vector.x,vector.y,vector.z]);
    }
    for(let i=0; i<position.count; i++) {
        vector.fromBufferAttribute(position, i);
        // const boneIndex = Math.max(0,Math.floor(vector.x / segmentWidth));
        // const boneWeight = (vector.x % segmentWidth) / segmentWidth;
        const x = vector.x;
        const s = (x + pageWidth / 2) / pageWidth;
        const f = s * (bonesCount - 1);
        const i0 = Math.floor(f);
        const i1 = Math.min(bonesCount - 1, i0 + 1);
        const w1 = f - i0;
        const w0 = 1 - w1;
        // const boneIndex = i;
        // const boneWeight = .60;
        skinIndexes.push(i0, i1, 0, 0);
        skinWeights.push(w0, w1, 0, 0);
    }
    pageGeometry.setAttribute(
    "skinIndex",
    new THREE.Uint16BufferAttribute(skinIndexes, 4)
    );
    pageGeometry.setAttribute(
    "skinWeight",
    new THREE.Float32BufferAttribute(skinWeights, 4)
    );
    useMemo(() => {
        console.log("INSIDE USE MEMO")
        // pageGeometry.translate(pageWidth / 2,0,0);
    },[])
    const spacing = pageWidth / (bonesCount-1);
    console.log(spacing)
    for(let i=0;i<bonesCount;i++) {
        const bone = new THREE.Bone();
        bones.push(bone);
        if(i == 0) bone.position.x = -pageWidth / 2;
        else
        bone.position.x = spacing;
        if(i > 0) {
            bones[i-1].add(bone);
        }
    }
    const skeleton = new THREE.Skeleton(bones);
    // skinnedMesh.translateX(pageWidth/2);
    skinnedMesh.add(bones[0]);
    skinnedMesh.bind(skeleton);
    skinnedMesh.castShadow = true;
    skinnedMesh.receiveShadow = true;
    skinnedMesh.frustumCulled = false;
    const skinnedMeshRef = React.useRef<THREE.SkinnedMesh>(null);
    const skeletonHelperRef = React.useRef<THREE.SkeletonHelper | null>(null);
    const pivotRef = React.useRef<THREE.Group>(null);
    useFrame((_,delta) => {
        // console.log(delta)
        // if (pivotRef.current) {
        //     // console.log(pagePosition," => ",pivotRef.current.rotation.y)
        //     if (pagePosition === "left" && pivotRef.current.rotation.y > -Math.PI) {
        //         pivotRef.current.rotation.y -= (Math.PI) * .01
        //     }
        //     else if(pagePosition === "right" && pivotRef.current.rotation.y < 0) {
        //         pivotRef.current.rotation.y += (Math.PI) * .01
        //     }
        // }
        if(skinnedMeshRef.current && pivotRef.current) {
            if (pagesPosition[key_val] === 'L' && skinnedMeshRef.current.skeleton.bones[0].rotation.y > degToRad(-180)) {
                skinnedMeshRef.current.skeleton.bones[0].rotation.y -= (Math.PI) * .01
                if(pivotRef.current.position.z < -z_position){
                    console.log(key_val," => ",pivotRef.current.position.z," => ",z_position)
                    pivotRef.current.position.z += pageDistance / 10
                }
            }
            else if(pagesPosition[key_val] === 'R' && skinnedMeshRef.current.skeleton.bones[0].rotation.y < 0) {
                skinnedMeshRef.current.skeleton.bones[0].rotation.y += (Math.PI) * .01
                if(pivotRef.current.position.z > z_position) {
                    console.log(pivotRef.current.position.z)
                    pivotRef.current.position.z -= pageDistance / 10
                }

            }
        }
        // if (skinnedMeshRef.current && !skeletonHelperRef.current) {
        //     const skeletonHelper = new THREE.SkeletonHelper(skinnedMeshRef.current);
        //     //   skeletonHelper.material.linewidth = 2;
        //     skinnedMeshRef.current.add(skeletonHelper);
        //     skeletonHelperRef.current = skeletonHelper;
            
        //     // const bone = skinnedMeshRef.current.skeleton.bones;
        //     // bone[0].rotation.y = THREE.MathUtils.lerp(bone[0].rotation.y,targetRotation,0.05);
            
        //     // pivotRef.current.rotation.y = THREE.MathUtils.lerp(
        //     //     pivotRef.current.rotation.y,
        //     //     targetRotation,
        //     //     0.05 // smaller = slower animation
        //     // );
        // }
    });
    return (
        <group ref = {pivotRef}  key = {key_val} position={[0,0,z_position]} receiveShadow>
            <primitive object={skinnedMesh} {...props} key = {key_val} onClick = {(e : any) => {
                console.log('clicked me',pagePosition,key_val,e);
                e.stopPropagation();
                const audio = new Audio("page-flip-01a.mp3");
                audio.play();
                // setrotation(targetRotation === 0 ? Math.PI / 2 : 0)
                if(pagePosition === "left") {
                    if(pivotRef.current) {
                        // setrotation(Math.PI / 4);
                        // if(skinnedMeshRef.current?.skeleton) {
                        //     skinnedMeshRef.current.skeleton.bones[0].rotation.y = 0;
                        // }
                        // console.log("rotation => ",targetRotation)
                        for(let i=key_val;i<pagesPosition.length;i++) {
                            if(pagesPosition[i] === 'L') pagesPosition[i] = 'R';
                        }
                        pagePosition = "right";
                    }
                }
                else if(pagePosition === "right") {
                    if(pivotRef.current) {
                        for(let i=0;i<=key_val;i++) {
                            if(pagesPosition[i] === 'R') pagesPosition[i] = 'L';
                        }
                        pagePosition = "left";
                    }
                }
                
            }} ref = {skinnedMeshRef} />
            <shadowMaterial transparent opacity={0.2} />
        </group>
    )
}


function BookComponent() {
    const pageGeometry = new THREE.BoxGeometry(5,10,0.3,30,2);
    const position = pageGeometry.attributes.position;
    const vector = new THREE.Vector3();
    const skinIndexes = [];
    const skinWeights = [];
    const x = [];
    console.log(position)
    for(let i=0; i<position.count; i++) {
        vector.fromBufferAttribute(position, i);
        x.push([vector.x,vector.y,vector.z]);
        // console.log(vector.x);
    }
    console.log(x);
    const pages = [
        {
            front : 'frontcover.png',
            back : 'experience-banner.png'
        },
        {
            front: 'experience.png',
            back: 'projects-banner.png'
        },
        {
            front: "projects.png",
            back: "education_banner.png"
        },
        {
            front : 'education.png',
            back : 'skills_banner.png'
        },
        {
            front : "skills_achievement.png",
            back : "backcover.png"
        }
    ];
    pages.forEach(() => pagesPosition.push('R'));
    const pagedistance = 0.025;
    return (
        <Canvas id = "canvas" camera={{ position: [0, 0, 8], fov: 80 }} style={{ height: '100vh', width : '100vw' }}>
            <ambientLight intensity={1} />
            <directionalLight position={[0,0,5]} intensity={.6} />
            <Float speed={1} rotationIntensity={1} floatIntensity={2}>
            {
                pages.map((page,index) => {
                  return <group key={index}><Page pageHeight={10} pageWidth={5} pageDepth={0.03} heightSegments = {12} widthSegments={36} key_val = {index} z_position = {- pagedistance * index} pageInfo = {page} pageDistance = {pagedistance} isFrontcover = {(index === 0) ? true : false} isBackcover = {(index === pages.length-1) ? true : false } /></group>;
                })
            }
            </Float>
            {/* <Float speed={1} rotationIntensity={1} floatIntensity={2}> */}
            {/* <mesh>
                {pages.map((page,index) => {
                    const pagefrontTexture = useLoader(THREE.TextureLoader, page.front);
                    const pagebackTexture = useLoader(THREE.TextureLoader, page.back);
                    return (
                        <>
                            
                            <boxGeometry args={[1.5, 2.5, 0.03]} />
                            {[
                                
                                <meshStandardMaterial attach='material-4' key="front" map={pagefrontTexture} />, // +Z
                                <meshStandardMaterial attach='material-5' key="back" map={
                                  pagebackTexture
                                } roughness={0}/>,   // -Z
                            ]}
                        </>
                    )
                })}
                
            </mesh> */}
            {/* </Float> */}
            <OrbitControls />
        </Canvas>
    )
}

export default BookComponent