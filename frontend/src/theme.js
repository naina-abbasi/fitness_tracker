// theme.js  — import this in your App.jsx / index.jsx
import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#7c6af7",
        light: "#a594ff",
        dark: "#5548c8",
        contrastText: "#fff",
      },
      secondary: {
        main: "#f7567c",
        light: "#ff8fa3",
        dark: "#c0254f",
        contrastText: "#fff",
      },
      background: {
        default: mode === "dark" ? "#0b0b18" : "#f4f4fb",
        paper: mode === "dark" ? "#13131f" : "#ffffff",
      },
      text: {
        primary: mode === "dark" ? "#f0efff" : "#111122",
        secondary: mode === "dark" ? "#9490b5" : "#5a5880",
      },
      divider:
        mode === "dark"
          ? "rgba(124,106,247,0.12)"
          : "rgba(124,106,247,0.1)",
    },
    typography: {
      fontFamily: "'Barlow', 'Rajdhani', sans-serif",
      h1: { fontWeight: 800 },
      h2: { fontWeight: 700 },
      h3: { fontWeight: 700 },
      h6: { fontWeight: 700 },
    },
    shape: { borderRadius: 12 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 600,
            borderRadius: "10px",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: "16px",
            backgroundImage: "none",
          },
        },
      },
    },
  });
