import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const SolarSystem = () => {
    const canvas = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (canvas.current) {
            const renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            canvas.current.appendChild(renderer.domElement);
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);
            const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
            const sunTexture = new THREE.TextureLoader().load('2k_sun.jpg');
            sunMaterial.map = sunTexture;
            const planetGeometry = new THREE.SphereGeometry(1, 64, 64);
            const sunMesh = new THREE.Mesh(planetGeometry, sunMaterial);
            const backgroundTexture = new THREE.TextureLoader().load('2k_stars_milky_way.jpg');
            scene.background = backgroundTexture;
            sunMesh.scale.setScalar(6);
            const planets = [
                {
                    name: 'Mercury',
                    distance: 8,
                    size: 0.5,
                    speed : 0.08,
                    moons : [],
                    material : new THREE.MeshStandardMaterial({ map : new THREE.TextureLoader().load('2k_mercury.jpg')})
                }, 
                {
                    name: 'Venus',
                    distance: 12,
                    size: 1.5,
                    speed : 0.06,
                    moons : [],
                    material : new THREE.MeshStandardMaterial({ map : new THREE.TextureLoader().load('2k_venus_surface.jpg')})
                },
                {
                    name: 'Earth',
                    distance: 18,
                    size: 1.6,
                    speed: 0.05,
                    moons: [
                        {
                            name: 'Moon',
                            distance: 2,
                            size: 0.1,
                            speed: 0.1,
                            z: 1,
                            material: new THREE.MeshStandardMaterial({ map: new THREE.TextureLoader().load('2k_moon.jpg') })
                        }
                    ],
                    material: new THREE.MeshStandardMaterial({ map: new THREE.TextureLoader().load('2k_earth_daymap.jpg') })
                },
                {
                    name: 'Mars',
                    distance: 24,
                    size: 0.8,
                    speed: 0.04,
                    moons: [
                        {
                            name: 'Phobos',
                            distance: 1.5,
                            size: 0.2,
                            speed: 0.13,
                            z : 0,
                            material: new THREE.MeshStandardMaterial({ map: new THREE.TextureLoader().load('2k_moon.jpg') })
                        },
                        {
                            name: 'Deimos',
                            distance: 2.5,
                            size: 0.3,
                            speed: 0.09,
                            z: 1,
                            material: new THREE.MeshStandardMaterial({ map: new THREE.TextureLoader().load('2k_moon.jpg') })
                        }
                    ],
                    material: new THREE.MeshStandardMaterial({ map: new THREE.TextureLoader().load('2k_mars.jpg') })
                },
                {
                    name: 'Jupyter',
                    distance: 38,
                    size: 3,
                    speed: 0.02,
                    moons: [
                        {
                            name: 'Io',
                            distance: 1.5,
                            size: 0.15,
                            speed: 0.12,
                            z: 0,
                            material: new THREE.MeshStandardMaterial({ color: 0xffcc99 })
                        },
                        {
                            name: 'Europa',
                            distance: 1.7,
                            size: 0.13,
                            speed: 0.10,
                            z: .5,
                            material: new THREE.MeshStandardMaterial({ color: 0xffffff })
                        },
                        {
                            name: 'Ganymede',
                            distance: 1.9,
                            size: 0.18,
                            speed: 0.08,
                            z: 1,
                            material: new THREE.MeshStandardMaterial({ color: 0xcccccc })
                        },
                        {
                            name: 'Callisto',
                            distance: 2.1,
                            size: 0.17,
                            speed: 0.07,
                            z: 1.5,
                            material: new THREE.MeshStandardMaterial({ color: 0x999999 })
                        }
                    ],
                    
                    material: new THREE.MeshStandardMaterial({ map: new THREE.TextureLoader().load('2k_jupiter.jpg') })
                },
                {
                    name: 'Saturn',
                    distance: 56,
                    size: 2.8,
                    speed: 0.016,
                    moons: [
                        {
                            name: 'Titan',
                            distance: 1.5,
                            size: 0.3,
                            speed: 0.09,
                            z: 0,
                            material: new THREE.MeshStandardMaterial({ color: 0xffe0a3 })
                        },
                        {
                            name: 'Enceladus',
                            distance: 2,
                            size: 0.15,
                            speed: 0.13,
                            z: 0.5,
                            material: new THREE.MeshStandardMaterial({ color: 0xe0e0e0 })
                        }
                    ],
                    material: new THREE.MeshStandardMaterial({ map: new THREE.TextureLoader().load('2k_saturn.jpg') })
                },
                {
                    name: 'Uranus',
                    distance: 75,
                    size: 2,
                    speed: 0.011,
                    moons: [
                        {
                            name: 'Titania',
                            distance: 1.5,
                            size: 0.3,
                            speed: 0.11,
                            material: new THREE.MeshStandardMaterial({ color: 0xb0b0b0 })
                        },
                        {
                            name: 'Oberon',
                            distance: 2.5,
                            size: 0.25,
                            speed: 0.09,
                            material: new THREE.MeshStandardMaterial({ color: 0xcccccc })
                        }
                    ],
                    material: new THREE.MeshStandardMaterial({ map: new THREE.TextureLoader().load('2k_uranus.jpg') })
                },
                {
                    name: 'Neptune',
                    distance: 90,
                    size: 2,
                    speed: 0.009,
                    moons: [
                        {
                            name: 'Triton',
                            distance: 1.5,
                            size: 0.3,
                            speed: 0.10,
                            material: new THREE.MeshStandardMaterial({ color: 0xc0c0ff })
                        }
                    ],
                    material: new THREE.MeshStandardMaterial({ map: new THREE.TextureLoader().load('2k_neptune.jpg') })
                }
            ]
            const planetGroup = new THREE.Group();
            const planetMesh = planets.map(planet => {
                // console.log(planet);
                const mesh = new THREE.Mesh(planetGeometry, planet.material);
                mesh.scale.setScalar(planet.size);
                mesh.position.x = planet.distance;
                console.log(scene," => ",mesh);
                if (planet.name === 'Saturn') {
                    const ringGeometry = new THREE.RingGeometry(planet.size + 0.1, planet.size + 0.3, 64);
                    const ringMaterial = new THREE.MeshBasicMaterial({ 
                        map: new THREE.TextureLoader().load('2k_saturn_ring_alpha.png'), 
                        side: THREE.DoubleSide, 
                        transparent: true 
                    });
                    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
                    ringMesh.rotation.x = Math.PI / 2;
                    mesh.add(ringMesh);
                    console.log("saturn => ",mesh);
                }
                planet.moons.forEach(moon => {
                    const moonMesh = new THREE.Mesh(planetGeometry, moon.material);
                    moonMesh.scale.setScalar(moon.size);
                    moonMesh.position.x = moon.distance;
                    moonMesh.position.z = moon.z || 0;
                    mesh.add(moonMesh);
                })
                planetGroup.add(mesh);
                // planetGroup.add(mesh);
                return [planet, mesh];
                // return planet;
            })
            // console.log(planetMesh);
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
            scene.add(ambientLight);
            scene.add(sunMesh);
            scene.add(planetGroup);
            console.log(" => ",planetGroup)
            // console.log(scene,sunMesh);
            camera.position.z = 50;
            const controls = new OrbitControls(camera, renderer.domElement);    
            window.addEventListener('resize',() => {
                const aspectRatio = window.innerWidth / window.innerHeight;
                renderer.setSize(window.innerWidth, window.innerHeight);
                camera.aspect = aspectRatio;
                camera.updateProjectionMatrix();
            })
            window.addEventListener('keydown', (e) => {
            const moveAmount = 1;
                switch (e.key) {
                    case 'ArrowLeft':
                        camera.position.x -= moveAmount;
                        break;
                    case 'ArrowRight':
                        camera.position.x += moveAmount;
                        break;
                    case 'ArrowUp':
                        camera.position.y += moveAmount;
                        break;
                    case 'ArrowDown':
                        camera.position.y -= moveAmount;
                        break;
                    default:
                        break;
                }
            });
            const renderloop = () => {
                sunMesh.rotation.y += THREE.MathUtils.degToRad(.5);
                planetMesh.forEach(planetinfo => {
                    const [planet, mesh] = planetinfo;
                    mesh.rotation.y += THREE.MathUtils.degToRad(1);
                    mesh.position.x = planet.distance * Math.cos(mesh.rotation.y * planet.speed);
                    mesh.position.z = planet.distance * Math.sin(mesh.rotation.y * planet.speed);
                })
                controls.update();
                renderer.render(scene, camera);
                window.requestAnimationFrame(renderloop);
            }
            renderloop();
        }
    },[]);
    return (
        <div>
            <div ref={canvas} id="canvas"></div>
        </div>
    );
}
export default SolarSystem;