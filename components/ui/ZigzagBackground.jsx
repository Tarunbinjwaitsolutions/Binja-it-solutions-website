"use client";

// import React, { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// function ZigzagBackground() {
//   const canvasRef = useRef(null);
//   const progressRef = useRef(0);

//   useEffect(() => {
//     const trigger = ScrollTrigger.create({
//       trigger: document.documentElement,
//       start: "top top",
//       end: "bottom bottom",
//       scrub: true,
//       onUpdate: (self) => {
//         progressRef.current = self.progress;
//       }
//     });

//     return () => {
//       if (trigger) trigger.kill();
//     };
//   }, []);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     let animationFrameId;
//     let time = 0;

//     const resizeCanvas = () => {
//       const dpr = window.devicePixelRatio || 1;
//       const rect = canvas.getBoundingClientRect();
//       canvas.width = rect.width * dpr;
//       canvas.height = rect.height * dpr;
//       ctx.scale(dpr, dpr);
//     };

//     resizeCanvas();
//     window.addEventListener("resize", resizeCanvas);

//     const render = () => {
//       const w = canvas.clientWidth;
//       const h = canvas.clientHeight;
//       if (w === 0 || h === 0) return;

//       ctx.clearRect(0, 0, w, h);

//       const midX = w / 2;
//       const startY = window.innerHeight;
//       const endY = h - 150;

//       const progress = progressRef.current;
//       const currentMaxY = startY + (endY - startY) * progress;

//       // Draw waves
//       const numWaves = 3;
//       const dotsPerWave = 480;
//       const stepY = (endY - startY) / dotsPerWave;

//       for (let waveIdx = 0; waveIdx < numWaves; waveIdx++) {
//         const phaseOffset = waveIdx * (Math.PI / 3) + time * 0.015;
//         const amplitude = Math.min(w * 0.28, 380) * (0.85 + waveIdx * 0.1);
//         const wavelength = 900 + waveIdx * 80;

//         // Use richer, more solid colors for visibility on both light and dark backgrounds
//         ctx.fillStyle = waveIdx === 0 ? "rgba(6, 182, 212, 0.95)" : (waveIdx === 1 ? "rgba(217, 70, 239, 0.85)" : "rgba(243, 115, 33, 0.9)");

//         for (let i = 0; i <= dotsPerWave; i++) {
//           const y = startY + i * stepY;
//           if (y > currentMaxY) break;

//           const angle = (y - startY) * ((2 * Math.PI) / wavelength) + phaseOffset;
//           const x = midX + Math.sin(angle) * amplitude;

//           ctx.beginPath();
//           const r = waveIdx === 0 ? 2.4 : 1.7;
//           const radius = r;
//           ctx.arc(x, y, radius, 0, Math.PI * 2);
//           ctx.fill();

//           if (i % 6 === 0) {
//             ctx.shadowColor = waveIdx === 0 ? "#00F0FF" : (waveIdx === 1 ? "#D946EF" : "#F37321");
//             ctx.shadowBlur = 6;
//             ctx.beginPath();
//             ctx.arc(x, y, r * 1.3, 0, Math.PI * 2);
//             ctx.fill();
//             ctx.shadowBlur = 0;
//           }
//         }
//       }

//       // Draw leading glowing head at currentMaxY
//       if (progress > 0.01 && progress < 0.99) {
//         const angle = (currentMaxY - startY) * ((2 * Math.PI) / 900) + time * 0.015;
//         const headX = midX + Math.sin(angle) * (Math.min(w * 0.28, 380) * 0.85);

//         ctx.shadowColor = "#00F0FF";
//         ctx.shadowBlur = 15;
//         ctx.fillStyle = "#ffffff";
//         ctx.beginPath();
//         ctx.arc(headX, currentMaxY, 7, 0, Math.PI * 2);
//         ctx.fill();
//         ctx.shadowBlur = 0;
//       }

//       time += 0.8;
//       animationFrameId = requestAnimationFrame(render);
//     };

//     render();

//     return () => {
//       window.removeEventListener("resize", resizeCanvas);
//       cancelAnimationFrame(animationFrameId);
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       className="absolute inset-0 w-full h-full pointer-events-none z-[2]"
//       style={{ opacity: 0.95 }}
//     />
//   );
// }

// export default ZigzagBackground;
