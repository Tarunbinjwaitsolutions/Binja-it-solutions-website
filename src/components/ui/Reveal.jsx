import React from 'react';
import useInView from '@/lib/hooks/useInView';

export default function Reveal({ children, delay = 0, className = '', ...rest }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={`reveal ${inView ? 'reveal-in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }} {...rest}>
      {children}
    </div>
  );
}
