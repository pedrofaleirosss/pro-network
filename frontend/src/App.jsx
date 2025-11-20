import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import ProfessionalsPage from "./pages/ProfessionalsPage";

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
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
