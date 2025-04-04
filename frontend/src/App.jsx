import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import MyRecipes from "./pages/MyRecipes";
import Favorites from "./pages/Favorites";
import RecipePage from "./components/RecipePage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthForm } from "./pages/AuthForm";
import Unauthorized from "./components/Unauthorized";
import AddRecipe from "./pages/AddRecipe";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };

  return (
    <>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar onLogout={handleLogout} isLoggedIn={isLoggedIn} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe/:id" element={<RecipePage />} />
            <Route
              path="/myrecipes"
              element={
                isLoggedIn ? <MyRecipes /> : <Navigate to="/unauthorized" />
              }
            />
            <Route
              path="/favorites"
              element={
                isLoggedIn ? <Favorites /> : <Navigate to="/unauthorized" />
              }
            />
            <Route path="/unauthorized" element={<Unauthorized />} />{" "}
            <Route path="/login" element={<AuthForm onLogin={handleLogin} />} />
            <Route
              path="/addrecipe"
              element={isLoggedIn ? <AddRecipe /> : <Navigate to="/login" />}
            />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}
