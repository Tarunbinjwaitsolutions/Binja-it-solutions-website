"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from "next/navigation";;
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PhoneCall, Bot, MessageSquare, Globe, ArrowRight } from 'lucide-react';
import Magnetic from '@/components/ui/Magnetic';

gsap.registerPlugin(ScrollTrigger);

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const isTouch = () =>
  typeof window !== 'undefined' &&
  (('ontouchstart' in window) || navigator.maxTouchPoints > 0);

const HERO_SLIDES = [
  {
    title: ["Binj", "AI"],
    desc: "AI-POWERED\\nBUSINESS COMMUNICATION\\n& LEAD AUTOMATION",
    showButtons: true,
  },
  {
    title: ["Business", "Automation"],
    desc: "AI-powered business communication and lead automation for modern enterprises.",
    showButtons: false,
  },
  {
    title: ["Infinite", "Perspectives"],
    desc: "Discover endless viewpoints and insights through our AI-driven platform.",
    showButtons: false,
  },
  {
    title: ["Eternal", "Now"],
    desc: "Experience the present moment with infinite awareness and clarity.",
    showButtons: false,
  },
];

function HeroSection() {
  const router = useRouter();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const cubeGroupRef = useRef(null);
  const cameraRefObj = useRef(null);
  const slideRefs = useRef([]);
  const scrollTLRef = useRef(null);
  const uniformsRef = useRef(null);

  // Autoplay and interaction tracking refs
  const autoplayTimerRef = useRef(null);
  const autoplayTweenRef = useRef(null);
  const lastUserInteractionTimeRef = useRef(0);
  const currentSlideIndexRef = useRef(0);

  // Keep ref version of slide index updated to prevent stale closures
  useEffect(() => {
    currentSlideIndexRef.current = currentSlideIndex;
  }, [currentSlideIndex]);

  const clearAutoplay = () => {
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  };

  const startAutoplay = () => {
    clearAutoplay();
    autoplayTimerRef.current = setTimeout(() => {
      const timeSinceLastInteraction = Date.now() - lastUserInteractionTimeRef.current;
      if (timeSinceLastInteraction < 2000) {
        // User interacted recently, check again in 3.5 seconds
        startAutoplay();
        return;
      }

      const totalScroll = heroRef.current ? (heroRef.current.offsetHeight - window.innerHeight) : 0;
      if (window.scrollY > totalScroll + 50) {
        // User scrolled past hero section, check again in 3.5 seconds
        startAutoplay();
        return;
      }

      const nextIndex = (currentSlideIndexRef.current + 1) % HERO_SLIDES.length;
      scrollToSlide(nextIndex);
    }, 2000); // 3.5 seconds slide interval (original code was using 2000ms delay in setTimeout which resolves to ~3.5s cycle with transition)
  };

  const scrollToSlide = (index) => {
    if (autoplayTweenRef.current) {
      autoplayTweenRef.current.kill();
    }

    let targetProgress;
    if (index === 0) {
      targetProgress = 0.0;
    } else if (index === HERO_SLIDES.length - 1) {
      targetProgress = 1.0;
    } else {
      targetProgress = (index + 0.5) / HERO_SLIDES.length;
    }

    setCurrentSlideIndex(index);

    const animObj = {
      progress: scrollTLRef.current ? scrollTLRef.current.progress() : 0,
      uniformVal: uniformsRef.current ? uniformsRef.current.scrollProgress.value : 0
    };

    autoplayTweenRef.current = gsap.to(animObj, {
      progress: targetProgress,
      uniformVal: targetProgress,
      duration: 0.75,
      ease: "power3.out",
      onUpdate: () => {
        if (scrollTLRef.current) {
          scrollTLRef.current.progress(animObj.progress);
        }
        if (uniformsRef.current) {
          uniformsRef.current.scrollProgress.value = animObj.uniformVal;
        }
      },
      onComplete: () => {
        startAutoplay();
      }
    });
  };

  const handleUserInteraction = () => {
    lastUserInteractionTimeRef.current = Date.now();
    if (autoplayTweenRef.current) {
      autoplayTweenRef.current.kill();
    }
  };

  const handleDotClick = (index) => {
    handleUserInteraction();
    scrollToSlide(index);
  };

  const go = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push('/#' + id);
    }
  };

  useEffect(() => {
    const events = ['wheel', 'touchmove', 'pointerdown', 'keydown'];
    const handler = () => handleUserInteraction();

    events.forEach(event => {
      window.addEventListener(event, handler, { passive: true });
    });

    startAutoplay();

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handler);
      });
      clearAutoplay();
      if (autoplayTweenRef.current) {
        autoplayTweenRef.current.kill();
      }
    };
  }, []);

  // ─── Three.js hero setup ───────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = heroRef.current;
    if (!canvas || !container) return;

    const scene = new THREE.Scene();
    scene.background = null;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);
    cameraRefObj.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    function createStarTexture() {
      const canvasTex = document.createElement("canvas");
      canvasTex.width = 64;
      canvasTex.height = 64;
      const ctx = canvasTex.getContext("2d");
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.1, "rgba(255, 255, 255, 0.95)");
      gradient.addColorStop(0.3, "rgba(200, 200, 255, 0.7)");
      gradient.addColorStop(0.6, "rgba(140, 140, 230, 0.4)");
      gradient.addColorStop(1, "rgba(40, 40, 120, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
      ctx.globalCompositeOperation = "lighten";
      const linearGradient = ctx.createLinearGradient(32, 0, 32, 64);
      linearGradient.addColorStop(0, "rgba(100, 100, 230, 0)");
      linearGradient.addColorStop(0.5, "rgba(250, 250, 255, 0.7)");
      linearGradient.addColorStop(1, "rgba(100, 100, 230, 0)");
      ctx.fillStyle = linearGradient;
      ctx.fillRect(28, 0, 8, 64);
      const horizontalGradient = ctx.createLinearGradient(0, 32, 64, 32);
      horizontalGradient.addColorStop(0, "rgba(100, 100, 230, 0)");
      horizontalGradient.addColorStop(0.5, "rgba(250, 250, 255, 0.7)");
      horizontalGradient.addColorStop(1, "rgba(100, 100, 230, 0)");
      ctx.fillStyle = horizontalGradient;
      ctx.fillRect(0, 28, 64, 8);
      const texture = new THREE.Texture(canvasTex);
      texture.needsUpdate = true;
      return texture;
    }

    const cubeGroup = new THREE.Group();
    scene.add(cubeGroup);
    cubeGroupRef.current = cubeGroup;

    const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5, 4, 4, 4);

    const vertexShader = `
      varying vec2 vUv;
      varying vec3 vPosition;
      varying vec3 vNormal;
      void main() {
        vUv = uv;
        vPosition = position;
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2(512, 512) },
      scrollProgress: { value: 0.0 }
    };
    uniformsRef.current = uniforms;

    const fragmentShader = `
      uniform float iTime;
      uniform vec2 iResolution;
      uniform float scrollProgress;
      varying vec2 vUv;
      varying vec3 vPosition;
      varying vec3 vNormal;

      vec4 my_tanh(vec4 x) {
          vec4 ex = exp(clamp(x, -20.0, 20.0));
          vec4 emx = exp(clamp(-x, -20.0, 20.0));
          return (ex - emx) / (ex + emx);
      }
      
      void mainImage(out vec4 O, vec2 I) {
          vec2 r = iResolution.xy;
          vec2 z = vec2(0.0);
          vec2 I_norm = (I + I - r) / r.y;
          float factor = 4.0 - 4.0 * abs(0.7 - dot(I_norm, I_norm));
          z += factor;
          vec2 f = I_norm * z;
          float timeOffset = sin(iTime * 0.2) * 0.1;
          f.x += timeOffset;
          f.y -= timeOffset;
          float iterations = mix(8.0, 12.0, scrollProgress);
          O = vec4(0.0);
          vec2 i = vec2(0.0);
          for (int j = 0; j < 12; j++) {
              float y = float(j) + 1.0;
              if (y > iterations) break;
              i.y = y;
              vec2 cosArg = f.yx * i.y + i + vec2(iTime);
              f += cos(cosArg) / i.y + vec2(0.7);
              O += (sin(f) + vec2(1.0)).xyyx * abs(f.x - f.y);
          }
          vec4 expArg = vec4(z.x - 4.0) - I_norm.y * vec4(-1.0, 1.0, 2.0, 0.0);
          O = my_tanh(7.0 * exp(expArg) / (O + vec4(0.0001)));
          float pulse = 1.0 + 0.2 * sin(iTime * 0.5);
          O.rgb *= pulse;
          float nebula = sin(I_norm.x * 0.01 + iTime * 0.3) * sin(I_norm.y * 0.01 - iTime * 0.2);
          nebula = abs(nebula) * 0.5;
          vec3 color1 = mix(vec3(0.1, 0.2, 0.8), vec3(0.8, 0.1, 0.5), scrollProgress);
          vec3 color2 = mix(vec3(0.8, 0.2, 0.7), vec3(0.2, 0.8, 0.7), scrollProgress);
          vec3 colorMix = mix(color1, color2, sin(iTime * 0.2) * 0.5 + 0.5);
          O.rgb = mix(O.rgb, colorMix, nebula * (1.0 - length(O.rgb)));
      }
      
      void main() {
          vec2 cubeUV = vUv * iResolution;
          vec4 fragColor;
          mainImage(fragColor, cubeUV);
          float depthFactor = abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
          fragColor.rgb *= 0.7 + 0.3 * depthFactor;
          float edge = 1.0 - max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)) * 2.0;
          edge = pow(edge, 4.0);
          fragColor.rgb += edge * vec3(0.1, 0.2, 0.8) * (0.6 + scrollProgress * 0.4);
          fragColor.rgb *= 2.0;
          float alpha = max(fragColor.r, max(fragColor.g, fragColor.b));
          alpha = clamp(alpha, 0.0, 1.0);
          gl_FragColor = vec4(fragColor.rgb, alpha);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      opacity: 1.0,
      side: THREE.DoubleSide
    });

    const cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true;
    cube.receiveShadow = true;
    cubeGroup.add(cube);

    const wireframe = new THREE.LineSegments(
      new THREE.EdgesGeometry(geometry, 10),
      new THREE.LineBasicMaterial({ color: 0x4488ff, linewidth: 1.5, transparent: true, opacity: 0.1 })
    );
    wireframe.scale.setScalar(1.001);
    cubeGroup.add(wireframe);

    function lerp(start, end, amt) { return start * (1 - amt) + end * amt; }

    function createEnhancedParticles() {
      const particleSettings = {
        PARTICLE_COUNT: 2000,
        PARTICLE_MOUSE_INFLUENCE: 0.0001,
        PARTICLE_REPULSION_RADIUS: 0.8,
        PARTICLE_REPULSION_STRENGTH: 0.00008,
        PARTICLE_CONNECTION_DISTANCE: 0.5,
        PARTICLE_DEPTH_RANGE: 12
      };

      const particles = new THREE.BufferGeometry();
      const particleCount = particleSettings.PARTICLE_COUNT;
      const positions = new Float32Array(particleCount * 3);
      const originalPositions = new Float32Array(particleCount * 3);
      const velocities = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);
      const colors = new Float32Array(particleCount * 3);
      const depths = new Float32Array(particleCount);

      for (let i = 0; i < particleCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const radius = 3 + Math.random() * 3;
        const depthExtension = Math.random() * particleSettings.PARTICLE_DEPTH_RANGE - particleSettings.PARTICLE_DEPTH_RANGE / 2;

        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi) + depthExtension;

        originalPositions[i * 3] = positions[i * 3];
        originalPositions[i * 3 + 1] = positions[i * 3 + 1];
        originalPositions[i * 3 + 2] = positions[i * 3 + 2];

        depths[i] = positions[i * 3 + 2];

        velocities[i * 3] = (Math.random() - 0.5) * 0.0004;
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.0004;
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.0002;

        const z = positions[i * 3 + 2];
        const normalizedDepth = (z + particleSettings.PARTICLE_DEPTH_RANGE / 2) / particleSettings.PARTICLE_DEPTH_RANGE;
        sizes[i] = 0.008 + 0.03 * (1 - normalizedDepth);

        const brightness = 0.5 + 0.5 * (1 - normalizedDepth);
        colors[i * 3] = 0.4 + 0.3 * brightness;
        colors[i * 3 + 1] = 0.4 + 0.3 * brightness;
        colors[i * 3 + 2] = 0.7 + 0.3 * brightness;
      }

      particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      particles.setAttribute("originalPosition", new THREE.BufferAttribute(originalPositions, 3));
      particles.setAttribute("velocity", new THREE.BufferAttribute(velocities, 3));
      particles.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
      particles.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      particles.setAttribute("depth", new THREE.BufferAttribute(depths, 1));

      const particleTexture = createStarTexture();
      const particleMaterial = new THREE.PointsMaterial({
        size: 0.03, map: particleTexture, transparent: true, vertexColors: true,
        opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true
      });

      const particleSystem = new THREE.Points(particles, particleMaterial);
      scene.add(particleSystem);

      const constellationMaterial = new THREE.LineBasicMaterial({
        color: 0x3366ff, transparent: true, opacity: 0.08, blending: THREE.AdditiveBlending
      });
      const constellationGeometry = new THREE.BufferGeometry();
      const constellationSystem = new THREE.LineSegments(constellationGeometry, constellationMaterial);
      scene.add(constellationSystem);

      return { particleSystem, constellationSystem, settings: particleSettings };
    }

    const enhancedParticles = createEnhancedParticles();

    function updateParticleZoom(scrollProgress) {
      if (!enhancedParticles?.particleSystem) return;
      const particleSystem = enhancedParticles.particleSystem;
      const positions = particleSystem.geometry.attributes.position.array;
      const originalPositions = particleSystem.geometry.attributes.originalPosition.array;
      const sizes = particleSystem.geometry.attributes.size.array;
      const colors = particleSystem.geometry.attributes.color.array;
      const particleCount = positions.length / 3;

      let zoomCurve;
      if (scrollProgress < 0.5) {
        zoomCurve = gsap.utils.clamp(0, 1, scrollProgress * 2);
      } else {
        zoomCurve = gsap.utils.clamp(0, 1, 2 - scrollProgress * 2);
      }
      zoomCurve = gsap.parseEase("power2.inOut")(zoomCurve);

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const zPosition = originalPositions[i3 + 2];
        const pushFactor = 1 + zoomCurve * 1.5;
        positions[i3] = originalPositions[i3] * pushFactor;
        positions[i3 + 1] = originalPositions[i3 + 1] * pushFactor;

        let targetZ = zPosition;
        if (Math.abs(zPosition) > 1) {
          targetZ = zPosition * (1 - zoomCurve * 0.5);
        } else {
          targetZ = zPosition - zoomCurve * Math.sign(zPosition) * 2;
        }
        positions[i3 + 2] = lerp(positions[i3 + 2], targetZ, 0.1);

        const distFromCamera = Math.abs(positions[i3 + 2]);
        const closenessFactor = Math.max(0, 1 - distFromCamera / 5);
        const sizeBoost = 1 + zoomCurve * 4.0;
        sizes[i] = (0.008 + 0.03 * closenessFactor) * sizeBoost;

        const brightnessBoost = zoomCurve * 0.3;
        const baseBrightness = 0.5 + closenessFactor * 0.5;
        const brightness = baseBrightness + brightnessBoost;
        colors[i3] = 0.4 + 0.3 * brightness;
        colors[i3 + 1] = 0.4 + 0.3 * brightness;
        colors[i3 + 2] = 0.7 + 0.3 * brightness;
      }

      particleSystem.geometry.attributes.position.needsUpdate = true;
      particleSystem.geometry.attributes.size.needsUpdate = true;
      particleSystem.geometry.attributes.color.needsUpdate = true;
    }

    function createParticleEffects() {
      let activeRAF = null;
      return {
        emitFromCube: function (count = 15) {
          if (!enhancedParticles?.particleSystem) return;
          const ps = enhancedParticles.particleSystem;
          const positions = ps.geometry.attributes.position.array;
          const velocities = ps.geometry.attributes.velocity.array;
          const sizes = ps.geometry.attributes.size.array;
          const colors = ps.geometry.attributes.color.array;
          const particleCount = positions.length / 3;
          const cubeVertices = [];
          const posAttr = cube.geometry.attributes.position;
          for (let i = 0; i < posAttr.count; i++) {
            cubeVertices.push(new THREE.Vector3(posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i)));
          }
          for (let i = 0; i < count; i++) {
            const pi = Math.floor(Math.random() * particleCount);
            const i3 = pi * 3;
            const vertex = cubeVertices[Math.floor(Math.random() * cubeVertices.length)].clone();
            vertex.applyMatrix4(cube.matrixWorld);
            positions[i3] = vertex.x; positions[i3 + 1] = vertex.y; positions[i3 + 2] = vertex.z;
            const speed = 0.02 + Math.random() * 0.04;
            velocities[i3] = (Math.random() - 0.5) * speed;
            velocities[i3 + 1] = (Math.random() - 0.5) * speed;
            velocities[i3 + 2] = (Math.random() - 0.5) * speed;
            sizes[pi] = 0.03 + Math.random() * 0.03;
            colors[i3] = 0.8 + Math.random() * 0.2;
            colors[i3 + 1] = 0.8 + Math.random() * 0.2;
            colors[i3 + 2] = 1.0;
          }
          ps.geometry.attributes.position.needsUpdate = true;
          ps.geometry.attributes.velocity.needsUpdate = true;
          ps.geometry.attributes.size.needsUpdate = true;
          ps.geometry.attributes.color.needsUpdate = true;
        },
        createWhirlpool: function (duration = 2.0) {
          if (!enhancedParticles?.particleSystem) return;
          const ps = enhancedParticles.particleSystem;
          const positions = ps.geometry.attributes.position.array;
          const velocities = ps.geometry.attributes.velocity.array;
          const particleCount = positions.length / 3;
          const originalVelocities = new Float32Array(velocities);
          const startTime = performance.now();
          function animateWhirlpool() {
            const elapsed = (performance.now() - startTime) / 1000;
            const progress = Math.min(elapsed / duration, 1.0);
            if (progress < 1.0) {
              for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;
                const dx = positions[i3] - cubeGroup.position.x;
                const dy = positions[i3 + 1] - cubeGroup.position.y;
                const dz = positions[i3 + 2] - cubeGroup.position.z;
                const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
                if (distance < 8) {
                  const strength = (1 - Math.min(distance / 8, 1)) * 0.001;
                  velocities[i3] = originalVelocities[i3] + (-dy * strength);
                  velocities[i3 + 1] = originalVelocities[i3 + 1] + (dx * strength);
                  velocities[i3 + 2] = originalVelocities[i3 + 2] + (-0.0002 * distance);
                }
              }
              ps.geometry.attributes.velocity.needsUpdate = true;
              activeRAF = requestAnimationFrame(animateWhirlpool);
            } else {
              for (let i = 0; i < velocities.length; i++) velocities[i] = originalVelocities[i];
              ps.geometry.attributes.velocity.needsUpdate = true;
            }
          }
          animateWhirlpool();
        },
        emitPulseWave: function () {
          if (!enhancedParticles?.particleSystem) return;
          const ps = enhancedParticles.particleSystem;
          const positions = ps.geometry.attributes.position.array;
          const sizes = ps.geometry.attributes.size.array;
          const colors = ps.geometry.attributes.color.array;
          const particleCount = positions.length / 3;
          const originalSizes = new Float32Array(sizes);
          const originalColors = new Float32Array(colors);
          const waveSpeed = 3, waveDuration = 2.5, waveWidth = 1.0;
          const startTime = performance.now();
          function animatePulseWave() {
            const elapsed = (performance.now() - startTime) / 1000;
            const waveDistance = elapsed * waveSpeed;
            if (elapsed < waveDuration) {
              for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;
                const dx = positions[i3] - cubeGroup.position.x;
                const dy = positions[i3 + 1] - cubeGroup.position.y;
                const dz = positions[i3 + 2] - cubeGroup.position.z;
                const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
                const distFromWave = Math.abs(distance - waveDistance);
                if (distFromWave < waveWidth) {
                  const wi = 1 - distFromWave / waveWidth;
                  sizes[i] = originalSizes[i] * (1 + wi * 2);
                  colors[i3] = originalColors[i3] + wi * 0.4;
                  colors[i3 + 1] = originalColors[i3 + 1] + wi * 0.2;
                  colors[i3 + 2] = originalColors[i3 + 2] + wi * 0.7;
                } else {
                  sizes[i] = originalSizes[i];
                  colors[i3] = originalColors[i3];
                  colors[i3 + 1] = originalColors[i3 + 1];
                  colors[i3 + 2] = originalColors[i3 + 2];
                }
              }
              ps.geometry.attributes.size.needsUpdate = true;
              ps.geometry.attributes.color.needsUpdate = true;
              activeRAF = requestAnimationFrame(animatePulseWave);
            } else {
              for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;
                sizes[i] = originalSizes[i];
                colors[i3] = originalColors[i3];
                colors[i3 + 1] = originalColors[i3 + 1];
                colors[i3 + 2] = originalColors[i3 + 2];
              }
              ps.geometry.attributes.size.needsUpdate = true;
              ps.geometry.attributes.color.needsUpdate = true;
            }
          }
          animatePulseWave();
        },
        cancelActiveEffects: function () { if (activeRAF) cancelAnimationFrame(activeRAF); }
      };
    }

    const particleEffects = createParticleEffects();

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    const pointLight = new THREE.PointLight(0x3366ff, 1.5, 20);
    pointLight.position.set(-3, 2, 5);
    scene.add(pointLight);

    const mouse = new THREE.Vector2(0, 0);

    const onMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.x = x; mouse.y = y;
      if (!ScrollTrigger.isScrolling()) {
        gsap.to(cubeGroup.rotation, {
          x: "+=" + (y * 0.03 - cubeGroup.rotation.x * 0.02),
          y: "+=" + (x * 0.03 - cubeGroup.rotation.y * 0.02),
          duration: 1, ease: "power2.out", overwrite: "auto"
        });
      }
    };

    const onClick = () => {
      gsap.to(cubeGroup.rotation, {
        x: cubeGroup.rotation.x + Math.PI * 0.25 * (Math.random() - 0.5),
        y: cubeGroup.rotation.y + Math.PI * 0.25 * (Math.random() - 0.5),
        z: cubeGroup.rotation.z + Math.PI * 0.25 * (Math.random() - 0.5),
        duration: 1, ease: "back.out(1.5)"
      });
      const effectChoice = Math.floor(Math.random() * 3);
      if (effectChoice === 0) particleEffects.emitFromCube();
      else if (effectChoice === 1) particleEffects.createWhirlpool();
      else particleEffects.emitPulseWave();
    };

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("mousemove", onMouseMove);
    container.addEventListener("click", onClick);
    window.addEventListener("resize", onResize);

    // ─── SCROLL-DRIVEN SLIDE TRANSITIONS ──────────────────────────────────────
    const scrollTL = gsap.timeline({ paused: true });

    ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.5,
      markers: false,
      onUpdate: (self) => {
        const p = self.progress;
        uniforms.scrollProgress.value = p;
        scrollTL.progress(p);

        const newIdx = Math.min(3, Math.floor(p * 4));
        setCurrentSlideIndex(newIdx);
      }
    });

    scrollTL.to(cubeGroup.rotation, {
      x: Math.PI * 1.5,
      y: Math.PI * 2.5,
      z: Math.PI * 0.5,
      ease: "none"
    }, 0);

    scrollTL.to(camera.position, {
      z: 1.2, y: 0.1, x: 0,
      ease: "power1.inOut"
    }, 0);

    scrollTL.to(ambientLight, { intensity: 1.2, ease: "power1.inOut" }, 0);

    scrollTLRef.current = scrollTL;

    let animationFrameId;
    function animate(timestamp) {
      animationFrameId = requestAnimationFrame(animate);
      const timeSeconds = timestamp * 0.001;
      uniforms.iTime.value = timeSeconds;

      if (!ScrollTrigger.isScrolling()) {
        cubeGroup.rotation.x += 0.0005;
        cubeGroup.rotation.y += 0.0008;
      }

      // Automatic scale breathing animation for the cube
      const breatheScale = 1.0 + Math.sin(timeSeconds * 1.8) * 0.18;
      cubeGroup.scale.setScalar(breatheScale);

      if (enhancedParticles?.particleSystem) {
        const ps = enhancedParticles.particleSystem;
        const cs = enhancedParticles.constellationSystem;
        const settings = enhancedParticles.settings;
        const positions = ps.geometry.attributes.position.array;
        const velocities = ps.geometry.attributes.velocity.array;
        const particleCount = positions.length / 3;
        const scrollProgress = uniforms.scrollProgress.value;

        updateParticleZoom(scrollProgress);

        const connectedPoints = [];
        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          positions[i3] += velocities[i3];
          positions[i3 + 1] += velocities[i3 + 1];
          positions[i3 + 2] += velocities[i3 + 2];
          positions[i3] += (mouse.x * 3 - positions[i3]) * settings.PARTICLE_MOUSE_INFLUENCE;
          positions[i3 + 1] += (mouse.y * 3 - positions[i3 + 1]) * settings.PARTICLE_MOUSE_INFLUENCE;

          const distFromCenter = Math.sqrt(positions[i3] ** 2 + positions[i3 + 1] ** 2 + positions[i3 + 2] ** 2);
          if (distFromCenter > 10) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const radius = 5 + Math.random() * 2;
            positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = radius * Math.cos(phi) * (1 - scrollProgress * 0.3);
            velocities[i3] = (Math.random() - 0.5) * 0.0004;
            velocities[i3 + 1] = (Math.random() - 0.5) * 0.0004;
            velocities[i3 + 2] = (Math.random() - 0.5) * 0.0002;
          }

          if (i % 50 === 0 && scrollProgress > 0.6) {
            for (let j = i + 1; j < Math.min(i + 100, particleCount); j += 10) {
              const j3 = j * 3;
              const dx = positions[i3] - positions[j3];
              const dy = positions[i3 + 1] - positions[j3 + 1];
              const dz = positions[i3 + 2] - positions[j3 + 2];
              const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
              if (distance < 0.5 && positions[i3 + 2] < 3 && positions[j3 + 2] < 3) {
                connectedPoints.push(positions[i3], positions[i3 + 1], positions[i3 + 2],
                  positions[j3], positions[j3 + 1], positions[j3 + 2]);
              }
            }
          }
        }

        const cg = cs.geometry;
        cg.setAttribute("position", new THREE.Float32BufferAttribute(connectedPoints, 3));
        cg.attributes.position.needsUpdate = true;
        cs.material.opacity = Math.max(0, scrollProgress - 0.6) * 0.15;

        ps.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    }

    animate(0);

    return () => {
      cancelAnimationFrame(animationFrameId);
      particleEffects.cancelActiveEffects();
      window.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
      if (scrollTL?.scrollTrigger) scrollTL.scrollTrigger.kill();
      scrollTL.kill();
      scene.remove(cubeGroup);
      scene.remove(enhancedParticles.particleSystem);
      scene.remove(enhancedParticles.constellationSystem);
      geometry.dispose();
      material.dispose();
      wireframe.geometry.dispose();
      wireframe.material.dispose();
      enhancedParticles.particleSystem.geometry.dispose();
      enhancedParticles.particleSystem.material.dispose();
      enhancedParticles.constellationSystem.geometry.dispose();
      enhancedParticles.constellationSystem.material.dispose();
      if (enhancedParticles.particleSystem.material.map) {
        enhancedParticles.particleSystem.material.map.dispose();
      }
      renderer.dispose();
    };
  }, []);

  // ─── Animate slides whenever currentSlideIndex changes ───
  useEffect(() => {
    slideRefs.current.forEach((slide, index) => {
      if (!slide) return;
      if (index === currentSlideIndex) {
        gsap.fromTo(slide,
          { opacity: 0, y: 45 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power3.out",
            overwrite: true
          }
        );
      } else {
        gsap.to(slide, {
          opacity: 0,
          y: -45,
          duration: 0.35,
          ease: "power3.inOut",
          overwrite: true
        });
      }
    });
  }, [currentSlideIndex]);

  return (
    <div ref={heroRef} className="hero-scroll-container">
      <style>{`
        .hero-scroll-container {
          --font-display: "Boldonse", serif;
          --font-primary: "Inter", sans-serif;
          --text-mega: clamp(3rem, 7vw, 5.5rem);
          --panel-padding: 5%;
          position: relative;
          background-color: var(--bg-primary, #0a0a0a);
          color: var(--text-primary, #f5f5f5);
        }

        .hero-sticky-viewport {
          position: sticky;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          overflow: hidden;
        }

        .hero-canvas-wrapper {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
        }

        .hero-canvas-wrapper canvas {
          width: 100%;
          height: 100%;
          display: block;
        }

        .hero-slides-container {
          position: relative;
          width: 100%;
          height: 100%;
          z-index: 2;
          pointer-events: none;
        }

        .hero-slide {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          pointer-events: none;
          opacity: 0;
          transform: translateY(45px);
          will-change: opacity, transform;
        }

        .hero-slide:first-child {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-scroll-section-inner {
          width: 100%;
          padding: 0 var(--panel-padding);
          max-width: 1600px;
          margin: 0 auto;
          pointer-events: auto;
        }

        .hero-scroll-title {
          font-family: var(--font-display);
          font-size: var(--text-mega);
          line-height: 1.1;
          margin-bottom: 1.5rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--text-primary, #f5f5f5);
          letter-spacing: -0.02em;
        }

        .hero-scroll-description {
          font-family: var(--font-primary);
          font-size: clamp(1rem, 2vw, 1.4rem);
          max-width: 580px;
          margin-bottom: 2.5rem;
          color: var(--text-secondary, rgba(245,245,245,0.7));
          font-weight: 300;
          white-space: pre-line;
          line-height: 1.6;
        }

        .slide-dots {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.5rem;
          z-index: 10;
        }

        .slide-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--border-color, rgba(255,255,255,0.3));
          transition: background 0.3s, transform 0.3s;
          border: none;
          padding: 0;
          cursor: pointer;
        }

        .slide-dot.active {
          background: var(--accent, #F37321);
          transform: scale(1.4);
        }

        @keyframes bounceY {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }

        .scroll-hint {
          position: absolute;
          bottom: 3.5rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          z-index: 10;
          animation: bounceY 1.8s ease-in-out infinite;
          color: var(--text-muted, rgba(255,255,255,0.5));
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          pointer-events: none;
        }

        .scroll-hint-line {
          width: 1px;
          height: 36px;
          background: linear-gradient(to bottom, var(--accent, #F37321), transparent);
        }
      `}</style>
      <div className="hero-sticky-viewport">
        {/* Three.js canvas */}
        <div className="hero-canvas-wrapper">
          <canvas ref={canvasRef} />
        </div>

        {/* Slides */}
        <div className="hero-slides-container">
          {HERO_SLIDES.map((slide, index) => (
            <div
              key={index}
              className="hero-slide"
              ref={el => slideRefs.current[index] = el}
            >
              <div className="hero-scroll-section-inner theme-text">
                <h1 className="hero-scroll-title">
                  {slide.title[0]}<br />{slide.title[1]}
                </h1>
                <p className="hero-scroll-description">{slide.desc}</p>

                {slide.showButtons && (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Magnetic>
                      <button
                        onClick={() => router.push('/contact')}
                        className="shine text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105"
                        style={{ background: 'var(--accent, #F37321)', boxShadow: '0 18px 40px rgba(243,115,33,.35)' }}
                      >
                        Start Automating Now
                      </button>
                    </Magnetic>
                    <button
                      onClick={() => go('plans-section')}
                      className="border px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 hover:theme-bg-alt theme-text flex items-center justify-center focus:outline-none"
                      style={{ borderColor: 'var(--border-color, rgba(255,255,255,.2))' }}
                    >
                      View Plans
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Slide progress dots */}
        <div className="slide-dots">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className={`slide-dot ${i === currentSlideIndex ? 'active' : ''}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Scroll hint arrow */}
        <div className="scroll-hint">
          <span>Scroll</span>
          <div className="scroll-hint-line" />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
