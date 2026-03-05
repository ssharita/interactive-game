
import React from 'react';
import { motion } from 'framer-motion';
import ParticleEffect from './ParticleEffect';

const AnimatedBackground = ({ imageUrl, overlayOpacity = 0.8 }) => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-gray-950">
      {/* Base Image with Parallax feel */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      
      {/* Gradient Overlays */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-gray-950/90 via-gray-900/70 to-gray-950/90" 
        style={{ opacity: overlayOpacity }}
      />
      
      {/* Animated Color Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[100px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [0, -50, 0],
          y: [0, 50, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-purple-600/20 rounded-full blur-[120px]"
      />

      {/* Particles and Data Stream */}
      <ParticleEffect count={40} speed={1.5} opacity={0.4} type="dots" />
      <ParticleEffect count={20} speed={0.8} type="data-stream" />
    </div>
  );
};

export default AnimatedBackground;
