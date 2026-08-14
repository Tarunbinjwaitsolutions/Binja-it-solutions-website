"use client";

import React, { useEffect, useRef } from 'react';

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const isTouch = () =>
  typeof window !== 'undefined' &&
  (('ontouchstart' in window) || navigator.maxTouchPoints > 0);

function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced() || isTouch()) return;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };

    const onLeave = () => {
      el.style.transform = 'translate(0,0)';
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [strength]);

  return (
    <span
      ref={ref}
      className={`inline-block ${className}`}
      style={{ transition: 'transform .25s cubic-bezier(.22,1,.36,1)' }}
    >
      {children}
    </span>
  );
}

export default Magnetic;
