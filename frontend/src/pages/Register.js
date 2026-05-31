import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import {
  Box, Card, CardContent, TextField, Button,
  Typography, Alert, CircularProgress, alpha, InputAdornment, IconButton,
} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await API.post("/users/register", formData);
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    }
    setLoading(false);
  };

  const fieldSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      "&:hover fieldset": { borderColor: "#7c6af7" },
      "&.Mui-focused fieldset": { borderColor: "#7c6af7" },
    },
    "& label.Mui-focused": { color: "#7c6af7" },
  };

  return (
    <Box sx={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "radial-gradient(ellipse at top right, #1a0e3a 0%, #0b0b18 60%)",
      px: 2,
    }}>
      <Card elevation={0} sx={{
        width: "100%", maxWidth: 420, borderRadius: "24px",
        background: alpha("#1a1a2e", 0.85),
        border: `1px solid ${alpha("#7c6af7", 0.2)}`,
        backdropFilter: "blur(20px)",
        boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
      }}>
        <CardContent sx={{ p: 4 }}>

          {/* Logo */}
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Box sx={{
              width: 56, height: 56, borderRadius: "16px", mx: "auto", mb: 1.5,
              background: "linear-gradient(135deg, #f7567c, #7c6af7)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 8px 24px rgba(247,86,124,0.45)",
            }}>
              <FitnessCenterIcon sx={{ color: "#fff", fontSize: 28 }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: "#fff" }}>
              Create Account
            </Typography>
            <Typography variant="body2" sx={{ color: alpha("#fff", 0.45), mt: 0.5 }}>
              Start your fitness journey today
            </Typography>
          </Box>

          {/* Alerts */}
          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: "10px" }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2, borderRadius: "10px" }}>
              {success}
            </Alert>
          )}

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth margin="normal" label="Full Name" name="name"
              value={formData.name} sx={fieldSx} onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon fontSize="small" sx={{ color: alpha("#fff", 0.35) }} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth margin="normal" label="Email" name="email"
              type="email" value={formData.email} sx={fieldSx} onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon fontSize="small" sx={{ color: alpha("#fff", 0.35) }} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth margin="normal" label="Password" name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password} sx={fieldSx} onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon fontSize="small" sx={{ color: alpha("#fff", 0.35) }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setShowPassword(!showPassword)}
                      sx={{ color: alpha("#fff", 0.35) }}>
                      {showPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit" fullWidth disabled={loading}
              sx={{
                mt: 3, py: 1.4, borderRadius: "10px", fontWeight: 700,
                fontSize: "0.95rem", textTransform: "none", color: "#fff",
                background: "linear-gradient(135deg, #f7567c, #7c6af7)",
                boxShadow: "0 4px 20px rgba(247,86,124,0.4)",
                "&:hover": { background: "linear-gradient(135deg, #e0455e, #6a58e0)" },
                "&:disabled": { opacity: 0.6 },
              }}
            >
              {loading ? <CircularProgress size={22} sx={{ color: "#fff" }} /> : "Create Account"}
            </Button>
          </Box>

          {/* Login link */}
          <Typography variant="body2" sx={{ textAlign: "center", mt: 3, color: alpha("#fff", 0.45) }}>
            Already have an account?{" "}
            <Link to="/" style={{ color: "#7c6af7", fontWeight: 700, textDecoration: "none" }}>
              Login
            </Link>
          </Typography>

        </CardContent>
      </Card>
    </Box>
  );
}

export default Register;
