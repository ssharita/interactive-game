
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Brain, Zap, Eye, Play } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: 'Memory Evaluation',
      description: 'Test your ability to recall critical story details through interactive memory questions',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Zap,
      title: 'Risk Assessment',
      description: 'Your choices determine your risk profile—will you be bold or cautious?',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Eye,
      title: 'Attention Tracking',
      description: 'Observe carefully—hidden details unlock secret endings and deeper truths',
      color: 'from-yellow-500 to-amber-500'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-900">
      <Helmet>
        <title>Memory Evaluation Game - TMU MDM Portfolio Project</title>
        <meta name="description" content="An interactive narrative experience that evaluates your memory, risk-taking, and attention through a sci-fi story about AI implants and hidden truths" />
      </Helmet>

      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1695144244472-a4543101ef35)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-gray-900/80 to-cyan-900/50" />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block mb-6"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 blur-2xl opacity-50 animate-pulse"></div>
                <h1 className="relative text-5xl md:text-7xl font-bold text-white mb-4">
                  Memory Evaluation Game
                </h1>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              An interactive narrative experience that evaluates your cognitive abilities through a gripping sci-fi story about AI implants, hidden truths, and the price of knowledge.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-6 hover:border-gray-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.color} bg-opacity-10 mb-4`}>
                  <feature.icon className={`w-8 h-8 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-4">How It Works</h2>
            <div className="space-y-3 text-gray-300">
              <p className="flex items-start gap-3">
                <span className="text-cyan-400 font-bold">1.</span>
                <span>Make choices that shape your journey through a branching sci-fi narrative</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-purple-400 font-bold">2.</span>
                <span>Answer memory questions that test your recall of story details</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-pink-400 font-bold">3.</span>
                <span>Your decisions affect three core metrics: Memory, Risk, and Attention</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-yellow-400 font-bold">4.</span>
                <span>Unlock one of five unique endings based on your cognitive profile</span>
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="text-center"
          >
            <Button
              onClick={() => navigate('/game')}
              className="bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 hover:from-cyan-700 hover:via-purple-700 hover:to-pink-700 text-white px-12 py-8 text-xl font-semibold shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
            >
              <Play className="w-6 h-6 mr-3" />
              Start Your Journey
            </Button>
            <p className="text-gray-500 text-sm mt-4">
              TMU MDM Portfolio Project • Interactive Narrative Experience
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
