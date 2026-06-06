import { useState } from "react";
import {
  AppBar, Toolbar, Typography, IconButton, Box, Avatar,
  Tooltip, Menu, MenuItem, Divider, alpha, Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

function Navbar({ onToggleTheme, isDarkMode, user, onOpenProfile }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const isMenuOpen = Boolean(anchorEl);

  const logout = () => {
    handleMenuClose();
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleProfile = () => {
    handleMenuClose();
    onOpenProfile();
  };

  return (
    <AppBar position="sticky" elevation={0} sx={{
      background: isDarkMode ? alpha("#0f0f1a", 0.85) : alpha("#ffffff", 0.82),
      backdropFilter: "blur(18px)",
      WebkitBackdropFilter: "blur(18px)",
      borderBottom: `1px solid ${isDarkMode ? alpha("#7c6af7", 0.18) : alpha("#7c6af7", 0.12)}`,
      transition: "background 0.4s ease",
    }}>
      <Toolbar sx={{ px: { xs: 2, sm: 3 }, minHeight: { xs: 64, sm: 70 } }}>

        {/* Brand */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer",
          "&:hover .logo-icon": { transform: "rotate(-15deg) scale(1.15)" } }}>
          <Box className="logo-icon" sx={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: 38, height: 38, borderRadius: "10px",
            background: "linear-gradient(135deg, #7c6af7 0%, #f7567c 100%)",
            boxShadow: "0 4px 14px rgba(124,106,247,0.45)",
            transition: "transform 0.3s cubic-bezier(.34,1.56,.64,1)",
          }}>
            <FitnessCenterIcon sx={{ fontSize: 20, color: "#fff" }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{
              fontWeight: 700, fontSize: "1.2rem", letterSpacing: "0.04em", lineHeight: 1,
              background: "linear-gradient(90deg, #7c6af7, #f7567c)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              FitTrack
            </Typography>
            <Typography variant="caption" sx={{
              fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase",
              color: isDarkMode ? alpha("#fff", 0.4) : alpha("#000", 0.4),
              lineHeight: 1, display: "block",
            }}>Pro</Typography>
          </Box>
        </Box>

        {/* Streak chip */}
        <Chip
          icon={<LocalFireDepartmentIcon sx={{ fontSize: "14px !important", color: "#ff6b35 !important" }} />}
          label="7-day streak" size="small"
          sx={{
            ml: 2, display: { xs: "none", md: "flex" }, height: 26,
            fontSize: "0.7rem", fontWeight: 600,
            bgcolor: isDarkMode ? alpha("#ff6b35", 0.12) : alpha("#ff6b35", 0.1),
            color: "#ff6b35", border: `1px solid ${alpha("#ff6b35", 0.25)}`,
            "& .MuiChip-icon": { ml: "6px" },
          }}
        />

        <Box sx={{ flexGrow: 1 }} />

        {/* Notifications */}
        <Tooltip title="Notifications" arrow>
          <IconButton size="small" sx={{
            mr: 0.5,
            color: isDarkMode ? alpha("#fff", 0.6) : alpha("#000", 0.5),
            "&:hover": { color: "#7c6af7", bgcolor: alpha("#7c6af7", 0.1) },
            transition: "all 0.2s",
          }}>
            <NotificationsNoneIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        {/* Theme toggle */}
        <Tooltip title={isDarkMode ? "Light mode" : "Dark mode"} arrow>
          <IconButton onClick={onToggleTheme} size="small" sx={{
            mr: 1.5,
            color: isDarkMode ? "#f7c948" : "#7c6af7",
            bgcolor: isDarkMode ? alpha("#f7c948", 0.1) : alpha("#7c6af7", 0.08),
            "&:hover": {
              bgcolor: isDarkMode ? alpha("#f7c948", 0.18) : alpha("#7c6af7", 0.15),
              transform: "rotate(20deg)",
            },
            transition: "all 0.25s cubic-bezier(.34,1.56,.64,1)",
          }}>
            {isDarkMode ? <Brightness7Icon fontSize="small" /> : <Brightness4Icon fontSize="small" />}
          </IconButton>
        </Tooltip>

        {/* Avatar */}
        <Tooltip title="Account" arrow>
          <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
            <Avatar src={user?.avatar} alt={user?.name} sx={{
              width: 36, height: 36,
              background: "linear-gradient(135deg, #7c6af7, #f7567c)",
              fontSize: "0.85rem", fontWeight: 700,
              border: `2px solid ${isMenuOpen ? "#7c6af7" : "transparent"}`,
              boxShadow: isMenuOpen ? "0 0 0 3px rgba(124,106,247,0.25)" : "none",
              transition: "box-shadow 0.25s, border-color 0.25s",
            }}>
              {user?.name ? user.name[0].toUpperCase() : <AccountCircleIcon />}
            </Avatar>
          </IconButton>
        </Tooltip>

        {/* Dropdown */}
        <Menu
          anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          PaperProps={{
            elevation: 0,
            sx: {
              mt: 1.5, minWidth: 200, borderRadius: "14px",
              background: isDarkMode ? alpha("#1a1a2e", 0.95) : alpha("#fff", 0.96),
              backdropFilter: "blur(20px)",
              border: `1px solid ${isDarkMode ? alpha("#7c6af7", 0.2) : alpha("#7c6af7", 0.15)}`,
              boxShadow: isDarkMode ? "0 20px 60px rgba(0,0,0,0.6)" : "0 20px 60px rgba(124,106,247,0.15)",
              overflow: "visible",
              "&::before": {
                content: '""', display: "block", position: "absolute",
                top: -6, right: 18, width: 12, height: 12,
                background: isDarkMode ? alpha("#1a1a2e", 0.95) : alpha("#fff", 0.96),
                transform: "rotate(45deg)",
                borderTop: `1px solid ${isDarkMode ? alpha("#7c6af7", 0.2) : alpha("#7c6af7", 0.15)}`,
                borderLeft: `1px solid ${isDarkMode ? alpha("#7c6af7", 0.2) : alpha("#7c6af7", 0.15)}`,
              },
            },
          }}
        >
          {/* User info */}
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: isDarkMode ? "#fff" : "#111" }}>
              {user?.name || "Athlete"}
            </Typography>
            <Typography variant="caption" sx={{ color: isDarkMode ? alpha("#fff", 0.45) : alpha("#000", 0.45) }}>
              {user?.email || ""}
            </Typography>
          </Box>

          <Divider sx={{ borderColor: isDarkMode ? alpha("#7c6af7", 0.12) : alpha("#7c6af7", 0.1) }} />

          <MenuItem onClick={handleProfile} sx={{
            mx: 1, mt: 0.5, borderRadius: "8px", fontSize: "0.875rem", gap: 1.5,
            color: isDarkMode ? alpha("#fff", 0.8) : alpha("#000", 0.75),
            "&:hover": { bgcolor: alpha("#7c6af7", 0.1), color: "#7c6af7" },
          }}>
            <AccountCircleIcon fontSize="small" />
            My Profile
          </MenuItem>

          <Divider sx={{ my: 0.5, borderColor: isDarkMode ? alpha("#7c6af7", 0.12) : alpha("#7c6af7", 0.1) }} />

          <MenuItem onClick={logout} sx={{
            mx: 1, mb: 0.5, borderRadius: "8px", fontSize: "0.875rem", gap: 1.5,
            color: "#f7567c",
            "&:hover": { bgcolor: alpha("#f7567c", 0.1) },
          }}>
            <LogoutIcon fontSize="small" />
            Logout
          </MenuItem>
        </Menu>

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
