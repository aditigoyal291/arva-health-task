import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Notfound from "./pages/not-found";
import Login from "./pages/login";
import Signup from "./pages/signup";
import ExplorePage from "./pages/explore";
import BookmarkPage from "./pages/bookmark";
import { Toaster } from "sonner";
import Navbar from "./components/navbar";
import ExploreShopPage from "./pages/explore-shop";
import UserProvider from "./context/auth-context";
import TestPage from "./pages/test";

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/explore/:shopid" element={<ExploreShopPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/bookmarks" element={<BookmarkPage />} />
          <Route path="/test123" element={<TestPage />} />
          <Route path="*" element={<Notfound />} />{" "}
        </Routes>
      </Router>
      <Toaster />
    </UserProvider>
  );
}

export default App;
