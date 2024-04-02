import { BrowserRouter as Route, Routes } from "react-router-dom";
import  IntroPage  from "./components/IntroPage";
import LevelPage from "./components/LevelPage";
import  Instruction  from "./components/Instruction";

export function App() {
    return (
      <Routes>
          <Route path="/" element={<IntroPage />} />
          <Route path="levels" element={< LevelPage />} />
          <Route path="instruction" element={<Instruction />} />
        </Routes>

    );
  }