import { useState, useMemo, useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getTheme } from "./theme";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Decode JWT token without any library
function parseToken(token) {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch {
    return null;
  }
}

function App() {
  const [mode, setMode] = useState("dark");
  const [user, setUser] = useState(null);

  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleTheme = () =>
    setMode((prev) => (prev === "dark" ? "light" : "dark"));

  // Read user from token whenever app loads
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = parseToken(token);
      if (decoded) {
        setUser({
          name: decoded.name || decoded.username || "User",
          email: decoded.email || "",
          avatar: null,
        });
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
        />
        <Routes>
          <Route path="/" element={<Login onLogin={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;