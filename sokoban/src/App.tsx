import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IntroPage from './pages/IntroPage/IntroPage';
import Game from './pages/Game';
import NotFound from './pages/NotFound';
import { LevelPage } from './pages/LevelPage';
import {
  GetMoveTrackersLocalStorage,
  GetPushTrackersLocalStorage,
  GetTimerLocalStorage,
} from './GameLogic/TrackersLocalStorage';

export function App() {
  //setting timer storage for the 1.th level:
  GetTimerLocalStorage(1);
  GetMoveTrackersLocalStorage(1);
  GetPushTrackersLocalStorage(1);
  localStorage.setItem('winningStorage', 'false');
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/game/:id" element={<Game />} />
        <Route path="/levels" element={<LevelPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
