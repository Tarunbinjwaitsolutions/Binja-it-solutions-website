import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const prefersReduced = () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- SCROLL SCALE ANIMATION COMPONENT ---------- */
export default function ScrollScaleBox({ children, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || prefersReduced()) return;

    gsap.to(ref.current, {
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        end: "top 20%",
        scrub: 1.5,
        markers: false,
      },
      scale: 1.08,
      y: -40,
      opacity: 1,
      duration: 0.5,
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={ref} className={className} style={{ opacity: 0.9 }}>
      {children}
    </div>
  );
}
