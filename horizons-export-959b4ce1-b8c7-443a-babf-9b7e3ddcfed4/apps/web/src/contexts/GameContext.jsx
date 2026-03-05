
import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within GameProvider');
  }
  return context;
};

export const GameProvider = ({ children }) => {
  const [memoryScore, setMemoryScore] = useState(0);
  const [riskScore, setRiskScore] = useState(0);
  const [attentionScore, setAttentionScore] = useState(0);
  const [currentScene, setCurrentScene] = useState(1);
  const [choicesHistory, setChoicesHistory] = useState([]);
  const [gameProgress, setGameProgress] = useState({
    started: false,
    completed: false,
    ending: null
  });

  const updateScore = (scoreType, value) => {
    switch (scoreType) {
      case 'memory':
        setMemoryScore(prev => prev + value);
        break;
      case 'risk':
        setRiskScore(prev => prev + value);
        break;
      case 'attention':
        setAttentionScore(prev => prev + value);
        break;
      default:
        break;
    }
  };

  const addChoice = (sceneId, choiceText, scoreImpacts) => {
    setChoicesHistory(prev => [...prev, { sceneId, choiceText, scoreImpacts, timestamp: Date.now() }]);
  };

  const resetGame = () => {
    setMemoryScore(0);
    setRiskScore(0);
    setAttentionScore(0);
    setCurrentScene(1);
    setChoicesHistory([]);
    setGameProgress({
      started: false,
      completed: false,
      ending: null
    });
  };

  const value = {
    memoryScore,
    riskScore,
    attentionScore,
    currentScene,
    choicesHistory,
    gameProgress,
    setCurrentScene,
    updateScore,
    addChoice,
    setGameProgress,
    resetGame
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
