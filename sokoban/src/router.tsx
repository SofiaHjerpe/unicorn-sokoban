import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import App from './App';
import { LevelPage } from './pages/LevelPage';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App />}></Route>
      <Route path="/levels" element={<LevelPage />} index></Route>
    </Route>,
  ),
);
