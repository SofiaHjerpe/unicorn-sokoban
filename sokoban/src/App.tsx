import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IntroPage from './pages/IntroPage/IntroPage';
import Game from './pages/Game';
import NotFound from './pages/NotFound';
import { LevelPage } from './pages/LevelPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/game/:id" element={<Game />} />
        <Route path="/levels" element={<LevelPage/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
