"use client";

import React, { useEffect, useRef } from "react";
import { useInView, animate } from "framer-motion";

interface CounterProps {
  to: string;
  className?: string;
}

const Counter: React.FC<CounterProps> = ({ to, className }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true });
  const numericTo = parseInt(to.replace(/[^0-9]/g, ""), 10);
  const suffix = to.replace(String(numericTo), "");

  useEffect(() => {
    if (isInView && nodeRef.current) {
      const node = nodeRef.current;
      const controls = animate(0, numericTo, {
        duration: 2,
        onUpdate(value) {
          node.textContent = String(Math.round(value));
        },
        onComplete() {
          node.textContent += suffix;
        },
      });
      return () => controls.stop();
    }
  }, [isInView, numericTo, suffix]);

  return (
    <span ref={nodeRef} className={className}>
      0
    </span>
  );
};

export default Counter;
