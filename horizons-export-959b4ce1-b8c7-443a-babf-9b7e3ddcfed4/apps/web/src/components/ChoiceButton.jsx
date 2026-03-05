
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Brain, Zap, Eye } from 'lucide-react';

const ChoiceButton = ({ text, onClick, scoreImpacts, disabled, index = 0 }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [ripples, setRipples] = useState([]);
  const buttonRef = useRef(null);

  const hasScoreImpacts = scoreImpacts && (scoreImpacts.memory || scoreImpacts.risk || scoreImpacts.attention);

  // Determine dominant glow color based on impacts
  let glowClass = "hover:shadow-purple-500/30 hover:border-purple-400/60";
  if (hasScoreImpacts) {
    if (scoreImpacts.risk > 0) glowClass = "hover:shadow-red-500/30 hover:border-red-400/60 hover:from-red-900/30 hover:to-purple-900/30";
    else if (scoreImpacts.memory > 0) glowClass = "hover:shadow-cyan-500/30 hover:border-cyan-400/60 hover:from-cyan-900/30 hover:to-purple-900/30";
    else if (scoreImpacts.attention > 0) glowClass = "hover:shadow-yellow-500/30 hover:border-yellow-400/60 hover:from-yellow-900/30 hover:to-purple-900/30";
  }

  const handleClick = (e) => {
    if (disabled) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = { x, y, id: Date.now() };
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);

    onClick();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.15, ease: "easeOut" }}
      className="relative w-full"
    >
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onHoverStart={() => setShowTooltip(true)}
        onHoverEnd={() => setShowTooltip(false)}
        className="w-full"
      >
        <Button
          ref={buttonRef}
          onClick={handleClick}
          disabled={disabled}
          className={`relative overflow-hidden w-full bg-gradient-to-r from-gray-800/60 to-gray-900/60 border border-gray-700/50 text-gray-100 backdrop-blur-md transition-all duration-500 py-6 text-base shadow-lg ${glowClass} group`}
        >
          <span className="relative z-10 group-hover:text-white transition-colors duration-300">{text}</span>
          
          {/* Ripple Effect */}
          {ripples.map(ripple => (
            <span
              key={ripple.id}
              className="absolute bg-white/20 rounded-full pointer-events-none animate-ripple"
              style={{
                left: ripple.x,
                top: ripple.y,
                width: 20,
                height: 20,
                transform: 'translate(-50%, -50%)'
              }}
            />
          ))}
          
          {/* Subtle background scanline effect on hover */}
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </Button>
      </motion.div>

      <AnimatePresence>
        {hasScoreImpacts && showTooltip && !disabled && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-950/95 backdrop-blur-xl border border-gray-700 rounded-lg p-2 shadow-2xl z-20 min-w-[max-content] flex gap-4"
          >
            {scoreImpacts.memory !== 0 && (
              <div className="flex items-center gap-1.5 text-xs font-medium">
                <Brain className="w-3.5 h-3.5 text-cyan-400" />
                <span className={scoreImpacts.memory > 0 ? 'text-cyan-300' : 'text-red-400'}>
                  {scoreImpacts.memory > 0 ? '+' : ''}{scoreImpacts.memory}
                </span>
              </div>
            )}
            {scoreImpacts.risk !== 0 && (
              <div className="flex items-center gap-1.5 text-xs font-medium">
                <Zap className="w-3.5 h-3.5 text-red-400" />
                <span className={scoreImpacts.risk > 0 ? 'text-red-300' : 'text-green-400'}>
                  {scoreImpacts.risk > 0 ? '+' : ''}{scoreImpacts.risk}
                </span>
              </div>
            )}
            {scoreImpacts.attention !== 0 && (
              <div className="flex items-center gap-1.5 text-xs font-medium">
                <Eye className="w-3.5 h-3.5 text-yellow-400" />
                <span className={scoreImpacts.attention > 0 ? 'text-yellow-300' : 'text-red-400'}>
                  {scoreImpacts.attention > 0 ? '+' : ''}{scoreImpacts.attention}
                </span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ChoiceButton;
