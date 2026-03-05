
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Eye, Trophy, RotateCcw, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGameContext } from '@/contexts/GameContext.jsx';
import AnimatedBackground from './AnimatedBackground';

const AnimatedCounter = ({ value, duration = 2 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value, 10);
    if (start === end) return;

    let totalMilSecDur = duration * 1000;
    let incrementTime = (totalMilSecDur / Math.abs(end - start));

    let timer = setInterval(() => {
      start += (end > start ? 1 : -1);
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count > 0 ? '+' : ''}{count}</span>;
};

const TypewriterText = ({ text, delay = 0 }) => {
  const words = text.split(" ");
  
  return (
    <motion.p className="text-lg text-gray-300 leading-relaxed mb-6 font-mono">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.1,
            delay: delay + i * 0.05,
          }}
          className="inline-block mr-1"
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
};

const EndingsDashboard = ({ onPlayAgain }) => {
  const { memoryScore, riskScore, attentionScore } = useGameContext();

  const endings = [
    {
      id: 'secret_ai',
      title: 'The New Overseer',
      condition: memoryScore >= 5 && attentionScore >= 4,
      narrative: 'Your exceptional memory and keen attention to detail revealed the truth: the AI network wasn\'t controlling people—it was protecting them. You\'ve been chosen to become the next AI overseer, guiding humanity from the shadows. The implant wasn\'t a prison; it was an invitation.',
      color: 'from-cyan-500 to-blue-600',
      glow: 'shadow-cyan-500/20',
      icon: '🧠'
    },
    {
      id: 'brave_hacker',
      title: 'The Liberation',
      condition: riskScore >= 6,
      narrative: 'Your bold, risk-taking nature led you to hack the mainframe and destroy the AI network. The city plunges into chaos, but people are free. You\'ve become a legend among the resistance—the one who dared to fight back, no matter the cost.',
      color: 'from-red-500 to-orange-600',
      glow: 'shadow-red-500/20',
      icon: '⚡'
    },
    {
      id: 'safe_survivor',
      title: 'The Messenger',
      condition: riskScore <= -2 && memoryScore >= 3,
      narrative: 'Your cautious approach and sharp memory allowed you to escape the city undetected. You carry the truth with you, warning others about the AI network. You survived by being smart, not reckless. Now you must decide: will you return to fight, or live in hiding?',
      color: 'from-green-500 to-emerald-600',
      glow: 'shadow-green-500/20',
      icon: '🛡️'
    },
    {
      id: 'trapped',
      title: 'The Forgotten',
      condition: memoryScore <= 1 && attentionScore <= 1,
      narrative: 'Your poor memory and lack of attention left you vulnerable. The AI network has fully integrated you into its system. You no longer remember who you were before the implant. You are Subject 7734, and you are content. The truth is lost to you forever.',
      color: 'from-gray-500 to-slate-600',
      glow: 'shadow-gray-500/20',
      icon: '🔒'
    },
    {
      id: 'neutral',
      title: 'The Uncertain Path',
      condition: true,
      narrative: 'You navigate the gray area between resistance and compliance. The truth about the AI network remains unclear, and so does your future. You live in uncertainty, never fully trusting the system, but never fully rejecting it either. Your story is still being written.',
      color: 'from-purple-500 to-indigo-600',
      glow: 'shadow-purple-500/20',
      icon: '❓'
    }
  ];

  const unlockedEnding = endings.find(ending => ending.condition) || endings[endings.length - 1];

  const getCognitiveProfile = () => {
    if (memoryScore >= 5 && attentionScore >= 4) return 'Analytical Mastermind';
    if (riskScore >= 6) return 'Fearless Risk-Taker';
    if (riskScore <= -2 && memoryScore >= 3) return 'Cautious Strategist';
    if (memoryScore <= 1 && attentionScore <= 1) return 'Passive Observer';
    if (attentionScore >= 5) return 'Detail-Oriented Investigator';
    if (memoryScore >= 4) return 'Knowledge Seeker';
    if (riskScore >= 3) return 'Bold Adventurer';
    return 'Balanced Explorer';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.5 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6 overflow-hidden">
      <AnimatedBackground imageUrl="https://images.unsplash.com/photo-1549683685-a3c67d23762a" overlayOpacity={0.9} />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full max-w-4xl relative z-10"
      >
        <motion.div variants={itemVariants} className="text-center mb-10">
          <div className="inline-block relative">
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-xl opacity-30"
            />
            <Terminal className="w-16 h-16 mx-auto mb-4 text-cyan-400 relative z-10" />
          </div>
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-2 tracking-tight glitch-effect" data-text="EVALUATION COMPLETE">
            EVALUATION COMPLETE
          </h1>
          <p className="text-cyan-400 font-mono tracking-widest">SYSTEM DISCONNECTING...</p>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 mb-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-cyan-500 rounded-sm inline-block"></span>
            Final Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { label: 'Memory', score: memoryScore, icon: Brain, color: 'text-cyan-400', bg: 'bg-cyan-950/30', border: 'border-cyan-500/30' },
              { label: 'Risk', score: riskScore, icon: Zap, color: 'text-red-400', bg: 'bg-red-950/30', border: 'border-red-500/30' },
              { label: 'Attention', score: attentionScore, icon: Eye, color: 'text-yellow-400', bg: 'bg-yellow-950/30', border: 'border-yellow-500/30' }
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1 + i * 0.2, type: "spring" }}
                className={`${stat.bg} ${stat.border} border rounded-xl p-6 relative overflow-hidden group`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-3 mb-3">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">{stat.label}</span>
                </div>
                <p className={`text-4xl font-bold ${stat.color} drop-shadow-lg`}>
                  <AnimatedCounter value={stat.score} duration={2} />
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
            className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-500/30 rounded-xl p-6 relative overflow-hidden"
          >
            <div className="absolute right-0 top-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
            <h3 className="text-sm font-semibold text-purple-300 mb-2 uppercase tracking-widest">Cognitive Profile Assigned</h3>
            <p className="text-3xl font-bold text-white tracking-tight">{getCognitiveProfile()}</p>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className={`bg-gradient-to-br ${unlockedEnding.color} p-[1px] rounded-2xl mb-10 shadow-2xl ${unlockedEnding.glow}`}>
          <div className="bg-gray-950/90 backdrop-blur-xl rounded-2xl p-8 md:p-10 h-full">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-5xl filter drop-shadow-lg">{unlockedEnding.icon}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{unlockedEnding.title}</h2>
            </div>
            
            <div className="min-h-[120px]">
              <TypewriterText text={unlockedEnding.narrative} delay={2.5} />
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4 }}
              className="mt-8 bg-black/40 border border-gray-800 rounded-lg p-4 inline-block"
            >
              <h4 className="text-xs font-mono text-gray-500 mb-1 uppercase">Unlock Condition Met</h4>
              <p className="text-sm font-mono text-cyan-400/80">
                {unlockedEnding.id === 'secret_ai' && '> MEMORY >= 5 && ATTENTION >= 4'}
                {unlockedEnding.id === 'brave_hacker' && '> RISK >= 6'}
                {unlockedEnding.id === 'safe_survivor' && '> RISK <= -2 && MEMORY >= 3'}
                {unlockedEnding.id === 'trapped' && '> MEMORY <= 1 && ATTENTION <= 1'}
                {unlockedEnding.id === 'neutral' && '> DEFAULT_PATH_ACCEPTED'}
              </p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="text-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={onPlayAgain}
              className="bg-white text-black hover:bg-gray-200 px-10 py-7 text-lg font-bold shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300 rounded-full"
            >
              <RotateCcw className="w-5 h-5 mr-3" />
              INITIALIZE NEW SESSION
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EndingsDashboard;
