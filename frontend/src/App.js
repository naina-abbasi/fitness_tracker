import { useState, useMemo, useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getTheme } from "./theme";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProfileModal from "./components/ProfileModal";

function parseToken(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

function App() {
  const [mode, setMode] = useState("dark");
  const [user, setUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleTheme = () =>
    setMode((prev) => (prev === "dark" ? "light" : "dark"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = parseToken(token);
      if (decoded) {
        setUser({ name: decoded.name, email: decoded.email, avatar: null });
      }
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar
          onToggleTheme={toggleTheme}
          isDarkMode={mode === "dark"}
          user={user}
          onOpenProfile={() => setProfileOpen(true)}
        />
        <Routes>
          <Route path="/" element={<Login onLogin={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <ProfileModal
          open={profileOpen}
          onClose={() => setProfileOpen(false)}
          user={user}
        />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
