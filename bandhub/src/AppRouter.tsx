import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import About from "./features/About";
import SheetMusicList from "./features/SheetMusicList";
import SheetMusicDetail from "./features/SheetMusicDetail";
import Header from "./components/Header";
import Metronom from "./features/metronom/Metronom";

function AppRouter() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/sheets" element={<SheetMusicList />} />
        <Route path="/sheets/:id" element={<SheetMusicDetail />} />
        <Route path="/metronome" element={<Metronom />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
