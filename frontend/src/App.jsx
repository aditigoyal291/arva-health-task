import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Notfound from "./pages/not-found";
import Map from "./pages/map";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Notfound />} /> //404 catch-all route
          <Route path="/map"element={<Map />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
