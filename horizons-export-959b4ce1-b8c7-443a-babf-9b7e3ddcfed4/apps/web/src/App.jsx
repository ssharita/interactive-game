
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { GameProvider } from '@/contexts/GameContext.jsx';
import HomePage from './pages/HomePage';
import StoryGame from '@/components/StoryGame.jsx';

function App() {
  return (
    <Router>
      <GameProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game" element={<StoryGame />} />
        </Routes>
      </GameProvider>
    </Router>
  );
}

export default App;
