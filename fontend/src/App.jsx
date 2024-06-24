import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Notfound from "./pages/not-found";
import Login from "./pages/signup";
import Signup from "./pages/signup";
import ExplorePage from "./pages/explore";
import BookmarkPage from "./pages/bookmark";
import { Toaster } from "sonner";
// import Map from "./pages/map";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/map"element={<Map />} /> */}
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/explore/:shopid" element={<ExplorePage />} />
          <Route path="/bookmark" element={<BookmarkPage />} />
          <Route path="*" element={<Notfound />} /> {/* 404 catch-all route */}
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
