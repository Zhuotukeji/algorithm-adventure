import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import Dashboard from './pages/Dashboard';
import LevelWorkspace from './pages/LevelWorkspace';

function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/level/:levelId" element={<LevelWorkspace />} />
        </Routes>
      </BrowserRouter>
    </GameProvider>
  );
}

export default App;
