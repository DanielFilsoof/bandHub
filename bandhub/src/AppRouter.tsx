import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import About from "./features/About";
import SheetMusicList from "./features/SheetMusicList";
import Calendar from "./features/Calendar";
import SheetMusicDetail from "./features/SheetMusicDetail";
import Login from "./features/login/Login";
import Header from "./components/Header";

function AppRouter() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/hjem" element={<App />} />
        <Route path="/om" element={<About />} />
        <Route path="/noder" element={<SheetMusicList />} />
        <Route path="/noder/:id" element={<SheetMusicDetail />} />
        <Route path="/kalender" element={<Calendar />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
