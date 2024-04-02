import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IntroPage from './pages/IntroPage/IntroPage';
import Game from './pages/Game';
import NotFound from './pages/NotFound';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/game" element={<Game />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
