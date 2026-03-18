"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function WebGLScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0A0A0A, 1);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.8;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0A0A0A, 0.025);

    // Camera
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.set(0, 8, 20);
    camera.lookAt(0, 2, 0);

    // ---- Lighting ----
    const ambientLight = new THREE.AmbientLight(0x1a1a2e, 2);
    scene.add(ambientLight);

    const moonLight = new THREE.DirectionalLight(0x4A6FA5, 2.5);
    moonLight.position.set(-15, 20, 10);
    moonLight.castShadow = true;
    moonLight.shadow.mapSize.set(2048, 2048);
    moonLight.shadow.camera.near = 0.5;
    moonLight.shadow.camera.far = 80;
    moonLight.shadow.camera.left = -30;
    moonLight.shadow.camera.right = 30;
    moonLight.shadow.camera.top = 30;
    moonLight.shadow.camera.bottom = -30;
    scene.add(moonLight);

    const warmAccent = new THREE.PointLight(0x8B6F47, 1.5, 30);
    warmAccent.position.set(8, 5, 5);
    scene.add(warmAccent);

    const coolAccent = new THREE.PointLight(0x4A6FA5, 1, 20);
    coolAccent.position.set(-8, 10, -5);
    scene.add(coolAccent);

    // ---- Materials ----
    const concretemat = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      roughness: 0.9,
      metalness: 0.1,
    });
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x4A6FA5,
      roughness: 0.0,
      metalness: 0.9,
      transparent: true,
      opacity: 0.3,
    });
    const darkConcrete = new THREE.MeshStandardMaterial({
      color: 0x0f0f0f,
      roughness: 0.95,
      metalness: 0.05,
    });
    const steelMat = new THREE.MeshStandardMaterial({
      color: 0x2a3a4a,
      roughness: 0.3,
      metalness: 0.8,
    });
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x080808,
      roughness: 1.0,
      metalness: 0.0,
    });

    // ---- Ground plane ----
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(200, 200, 50, 50), groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Grid lines on ground
    const gridHelper = new THREE.GridHelper(60, 30, 0x1a2a3a, 0x111111);
    gridHelper.position.y = 0.01;
    scene.add(gridHelper);

    // ---- Helper: box building ----
    function createBuilding(
      w: number, h: number, d: number,
      x: number, z: number,
      mat: THREE.Material,
      hasGlass = false
    ) {
      const group = new THREE.Group();

      const geo = new THREE.BoxGeometry(w, h, d);
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, h / 2, z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);

      if (hasGlass) {
        // Glass facade panels
        const panelW = w * 0.85;
        const panelH = h * 0.85;
        const glassGeo = new THREE.PlaneGeometry(panelW, panelH, 1, 1);
        const frontGlass = new THREE.Mesh(glassGeo, glassMat);
        frontGlass.position.set(x, h / 2, z + d / 2 + 0.02);
        group.add(frontGlass);
      }

      scene.add(group);
      return mesh;
    }

    // ---- Main tower — brutalist form ----
    // Base podium
    createBuilding(8, 1.5, 6, 0, 0, concretemat);
    // Main tower
    createBuilding(5, 18, 4, 0, 0, darkConcrete, true);
    // Setback top
    createBuilding(3.5, 6, 3, 0, 0.5, concretemat);
    // Cantilevered slab
    const cantileverGeo = new THREE.BoxGeometry(7, 0.4, 2);
    const cantilever = new THREE.Mesh(cantileverGeo, steelMat);
    cantilever.position.set(0, 12, -1);
    cantilever.castShadow = true;
    scene.add(cantilever);

    // Structural fins
    for (let i = -2; i <= 2; i++) {
      const fin = new THREE.Mesh(new THREE.BoxGeometry(0.15, 18, 0.4), steelMat);
      fin.position.set(i * 1.1, 9, 2.1);
      fin.castShadow = true;
      scene.add(fin);
    }

    // ---- Side buildings ----
    createBuilding(3.5, 8, 3.5, -7, 2, concretemat, true);
    createBuilding(2.5, 12, 2.5, -7, 1, darkConcrete);
    createBuilding(4, 6, 4, 7, -1, concretemat, true);
    createBuilding(2, 9, 3, 9, 1, darkConcrete);
    createBuilding(3, 5, 3, -11, -2, concretemat);
    createBuilding(2, 14, 2, 11, 3, darkConcrete, true);

    // Low pavilion structures
    createBuilding(10, 1.8, 3, -2, -5, concretemat);
    createBuilding(6, 0.4, 8, 3, -7, darkConcrete);

    // ---- Blueprint overlay particles ----
    const particleCount = 300;
    const positions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = Math.random() * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
      const blueish = Math.random() > 0.7;
      particleColors[i * 3] = blueish ? 0.29 : 0.5;
      particleColors[i * 3 + 1] = blueish ? 0.43 : 0.5;
      particleColors[i * 3 + 2] = blueish ? 0.64 : 0.5;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ---- Emissive window strips ----
    for (let floor = 0; floor < 8; floor++) {
      const y = 2 + floor * 2;
      const randomOn = Math.random() > 0.4;
      if (randomOn) {
        const winGeo = new THREE.PlaneGeometry(0.8, 0.4);
        const winMat = new THREE.MeshStandardMaterial({
          color: 0x8B6F47,
          emissive: 0x8B6F47,
          emissiveIntensity: 0.8,
          transparent: true,
          opacity: 0.9,
        });
        for (let col = -1; col <= 1; col++) {
          const win = new THREE.Mesh(winGeo, winMat);
          win.position.set(col * 1.2, y, 2.02);
          scene.add(win);
        }
      }
    }

    // ---- Animation ----
    let time = 0;
    const mouseX = { value: 0 };
    const mouseY = { value: 0 };
    const targetCamX = { value: 0 };
    const targetCamY = { value: 8 };

    const onMouseMove = (e: MouseEvent) => {
      mouseX.value = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY.value = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      time += 0.005;

      // Gentle camera drift
      targetCamX.value += (mouseX.value * 3 - targetCamX.value) * 0.03;
      targetCamY.value += (8 + mouseY.value * -1 - targetCamY.value) * 0.03;

      camera.position.x = targetCamX.value;
      camera.position.y = targetCamY.value;
      camera.lookAt(0, 5, 0);

      // Particle drift
      particles.rotation.y = time * 0.05;

      // Warm light flicker
      warmAccent.intensity = 1.5 + Math.sin(time * 3.7) * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="webgl-canvas"
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
