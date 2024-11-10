import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import About from "./features/About";
import SheetMusic from "./features/SheetMusic";
import Calendar from "./features/Calendar";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/hjem" element={<App />} />
        <Route path="/om" element={<About />} />
        <Route path="/noder" element={<SheetMusic />} />
        <Route path="/kalender" element={<Calendar />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
