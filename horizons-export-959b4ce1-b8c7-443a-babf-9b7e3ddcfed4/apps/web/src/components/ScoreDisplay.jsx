
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Zap, Eye } from 'lucide-react';
import { useGameContext } from '@/contexts/GameContext.jsx';

const ScoreDisplay = () => {
  const { memoryScore, riskScore, attentionScore } = useGameContext();
  const [prevScores, setPrevScores] = useState({ memory: 0, risk: 0, attention: 0 });

  useEffect(() => {
    setPrevScores({ memory: memoryScore, risk: riskScore, attention: attentionScore });
  }, [memoryScore, riskScore, attentionScore]);

  const scoreItems = [
    { 
      id: 'memory',
      label: 'Memory', 
      value: memoryScore, 
      prevValue: prevScores.memory,
      icon: Brain, 
      color: 'from-blue-400 to-cyan-400',
      glowColor: 'rgba(56, 189, 248, 0.5)',
      bgColor: 'bg-blue-950/40',
      borderColor: 'border-blue-500/30'
    },
    { 
      id: 'risk',
      label: 'Risk', 
      value: riskScore, 
      prevValue: prevScores.risk,
      icon: Zap, 
      color: 'from-red-400 to-pink-500',
      glowColor: 'rgba(244, 63, 94, 0.5)',
      bgColor: 'bg-red-950/40',
      borderColor: 'border-red-500/30'
    },
    { 
      id: 'attention',
      label: 'Attention', 
      value: attentionScore, 
      prevValue: prevScores.attention,
      icon: Eye, 
      color: 'from-yellow-400 to-amber-500',
      glowColor: 'rgba(250, 204, 21, 0.5)',
      bgColor: 'bg-yellow-950/40',
      borderColor: 'border-yellow-500/30'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-6 right-6 z-50 flex flex-col gap-3"
    >
      {scoreItems.map((item, index) => {
        const hasChanged = item.value !== item.prevValue;
        
        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.5 }}
            className="relative"
          >
            <motion.div
              animate={hasChanged ? {
                scale: [1, 1.1, 1],
                boxShadow: [
                  `0 0 0px ${item.glowColor}`,
                  `0 0 20px ${item.glowColor}`,
                  `0 0 0px ${item.glowColor}`
                ]
              } : {}}
              transition={{ duration: 0.5 }}
              className={`${item.bgColor} ${item.borderColor} backdrop-blur-md border rounded-lg p-3 min-w-[140px] shadow-lg animate-float`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <item.icon className={`w-5 h-5 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`} />
                  <span className="text-sm font-medium text-gray-300">{item.label}</span>
                </div>
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={item.value}
                    initial={{ y: -20, opacity: 0, scale: 0.5 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 20, opacity: 0, scale: 0.5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`text-lg font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent drop-shadow-md`}
                  >
                    {item.value > 0 ? '+' : ''}{item.value}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default ScoreDisplay;
