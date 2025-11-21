import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import ProfessionalsPage from "./pages/ProfessionalsPage";
import Footer from "./components/Footer";
import NotFoundPage from "./pages/NotFoundPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import MessagesPage from "./pages/MessagesPage";

const defaultDark = localStorage.getItem("theme") === "dark";

function App() {
  const [darkMode, setDarkMode] = useState(defaultDark);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleToggleDarkMode = (newValue) => {
    setDarkMode(newValue);
    localStorage.setItem("theme", newValue ? "dark" : "light");
    if (newValue) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
        <Header darkMode={darkMode} setDarkMode={handleToggleDarkMode} />
        <main>
          <Routes>
            <Route path="/" element={<ProfessionalsPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/my-messages" element={<MessagesPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
