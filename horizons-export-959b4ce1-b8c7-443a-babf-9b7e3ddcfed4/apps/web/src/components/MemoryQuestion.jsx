
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import ChoiceButton from '@/components/ChoiceButton.jsx';
import { useGameContext } from '@/contexts/GameContext.jsx';
import ParticleEffect from './ParticleEffect';

const MemoryQuestion = ({ question, options, correctAnswer, onComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const { updateScore } = useGameContext();

  const handleAnswer = (optionIndex) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(optionIndex);
    setShowFeedback(true);

    const isCorrect = optionIndex === correctAnswer;
    if (isCorrect) {
      updateScore('memory', 2);
    } else {
      updateScore('memory', -1);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }

    setTimeout(() => {
      onComplete(isCorrect);
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-3xl mx-auto relative"
    >
      {showFeedback && selectedAnswer === correctAnswer && (
        <div className="absolute inset-0 z-50 pointer-events-none">
          <ParticleEffect count={50} speed={2} type="dots" />
        </div>
      )}

      <motion.div 
        animate={isShaking ? { x: [-10, 10, -10, 10, -5, 5, 0] } : {}}
        transition={{ duration: 0.4 }}
        className={`bg-gray-900/80 backdrop-blur-xl border rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden ${
          showFeedback 
            ? selectedAnswer === correctAnswer 
              ? 'border-green-500/50 shadow-green-500/20' 
              : 'border-red-500/50 shadow-red-500/20'
            : 'border-cyan-500/30 shadow-cyan-500/10'
        }`}
      >
        {/* Background scanline */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] pointer-events-none opacity-50" />

        <div className="relative z-10">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-wide uppercase">
              Memory Recall Protocol
            </h3>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-xl text-gray-100 mb-10 leading-relaxed font-medium"
          >
            {question}
          </motion.p>

          <div className="space-y-4">
            {options.map((option, index) => (
              <div key={index} className="relative">
                <ChoiceButton
                  text={option}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  index={index}
                />
                <AnimatePresence>
                  {showFeedback && selectedAnswer === index && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0, rotate: -45 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      className="absolute -right-4 md:-right-12 top-1/2 transform -translate-y-1/2 z-20"
                    >
                      {index === correctAnswer ? (
                        <div className="bg-green-500/20 p-2 rounded-full backdrop-blur-sm border border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.5)]">
                          <CheckCircle2 className="w-8 h-8 text-green-400" />
                        </div>
                      ) : (
                        <div className="bg-red-500/20 p-2 rounded-full backdrop-blur-sm border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                          <XCircle className="w-8 h-8 text-red-400" />
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <AnimatePresence>
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                className={`mt-8 p-5 rounded-xl border backdrop-blur-md flex items-center gap-4 ${
                  selectedAnswer === correctAnswer
                    ? 'bg-green-950/40 border-green-500/40 text-green-300'
                    : 'bg-red-950/40 border-red-500/40 text-red-300'
                }`}
              >
                {selectedAnswer === correctAnswer ? (
                  <>
                    <Sparkles className="w-6 h-6 animate-pulse" />
                    <p className="text-lg font-medium">Neural pathway verified. Memory intact. (+2 Memory)</p>
                  </>
                ) : (
                  <>
                    <XCircle className="w-6 h-6" />
                    <p className="text-lg font-medium">Data corruption detected. Memory fragmented. (-1 Memory)</p>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MemoryQuestion;
