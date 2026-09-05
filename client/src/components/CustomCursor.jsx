import React, { useEffect, useState } from 'react';

const PINK = '#ff1493';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  const ringStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    border: `2px solid ${PINK}`,
    pointerEvents: 'none',
    zIndex: 999999,
    transform: `translate(${pos.x - 16}px, ${pos.y - 16}px)`,
    transition: 'transform 0.12s ease-out',
    willChange: 'transform',
  };

  const dotStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: PINK,
    pointerEvents: 'none',
    zIndex: 999999,
    transform: `translate(${pos.x - 4}px, ${pos.y - 4}px)`,
    willChange: 'transform',
  };

  return (
    <>
      <div style={ringStyle} />
      <div style={dotStyle} />
    </>
  );
}
