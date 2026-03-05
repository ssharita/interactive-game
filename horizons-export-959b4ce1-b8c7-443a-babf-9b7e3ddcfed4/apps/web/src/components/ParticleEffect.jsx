
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const ParticleEffect = ({ count = 30, speed = 1, opacity = 0.5, type = 'dots' }) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: (Math.random() * 10 + 10) / speed,
      delay: Math.random() * 5,
      char: String.fromCharCode(0x30A0 + Math.random() * 96) // Katakana characters for data stream
    }));
  }, [count, speed]);

  if (type === 'data-stream') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-30">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute text-cyan-500/40 font-mono text-xs animate-data-stream"
            style={{
              left: `${p.x}%`,
              top: `-5%`,
              animationDuration: `${p.duration * 0.5}s`,
              animationDelay: `${p.delay}s`,
              fontSize: `${p.size * 4}px`
            }}
          >
            {p.char}
            <br/>{String.fromCharCode(0x30A0 + Math.random() * 96)}
            <br/>{String.fromCharCode(0x30A0 + Math.random() * 96)}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-cyan-400"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: opacity * (Math.random() * 0.5 + 0.5)
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, opacity, 0]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

export default ParticleEffect;
