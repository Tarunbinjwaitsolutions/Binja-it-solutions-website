import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const prefersReduced = () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- PARALLAX SCROLL COMPONENT ---------- */
export default function ParallaxSection({ children, offset = 50, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || prefersReduced()) return;

    gsap.to(ref.current, {
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        markers: false,
      },
      y: offset,
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [offset]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
