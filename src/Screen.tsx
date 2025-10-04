import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const Screen = () => {
    const canvas = useRef<HTMLDivElement>(null);
    console.log("Canvas ref:", canvas);
    const clock = new THREE.Clock();
    useEffect(() => {
        console.log("Screen component mounted",document.body);
        if (canvas.current) {
            const renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            canvas.current.appendChild(renderer.domElement);
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);
            const geometry = new THREE.BoxGeometry();
            const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            const cube = new THREE.Mesh(geometry, material);
            const cube1 = new THREE.Mesh(geometry, material);
            const group = new THREE.Group();
            group.add(cube);
            group.add(cube1);
            cube1.position.z = -5;
            cube1.position.x = 4;
            const axesHelper = new THREE.AxesHelper(5);
            group.add(axesHelper);
            scene.add(group);
            camera.position.z = 10;
            const aspectRatio = window.innerWidth / window.innerHeight;
            const orthocamera = new THREE.OrthographicCamera(
                -1 * aspectRatio,
                1 * aspectRatio,
                1,
                -1,
                0.1,
                1000
            );
            
            orthocamera.position.z = 5;
            const controls = new OrbitControls(camera, renderer.domElement);
            window.addEventListener('resize',() => {
                console.log("Window resized", window.innerWidth, window.innerHeight);
                const aspectRatio = window.innerWidth / window.innerHeight;
                renderer.setSize(window.innerWidth, window.innerHeight);
                camera.aspect = aspectRatio;
                camera.updateProjectionMatrix();
            })
            const renderloop = () => {
                cube.rotation.y += THREE.MathUtils.degToRad(1) * clock.getDelta() * 30;
                controls.update();
                renderer.render(scene, camera);
                window.requestAnimationFrame(renderloop);
            }
            renderloop();
        }
    }, []);
    return <>
        <div ref={canvas} id="canvas"></div>
    </>
}
export default Screen;