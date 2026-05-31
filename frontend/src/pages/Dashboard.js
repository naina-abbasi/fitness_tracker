import { useEffect, useState } from "react";
import API from "../services/api";
import {
  Container, Typography, Grid, Card, CardContent,
  TextField, Button, Box, Tab, Tabs, IconButton,
  Chip, Snackbar, Alert, Divider, alpha, useTheme,
  InputAdornment, CircularProgress,
} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import ScaleIcon from "@mui/icons-material/Scale";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

// ── Shared field style ──────────────────────────────────────────────────────
const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    "&:hover fieldset": { borderColor: "#7c6af7" },
    "&.Mui-focused fieldset": { borderColor: "#7c6af7" },
  },
  "& label.Mui-focused": { color: "#7c6af7" },
};

// ── Submit button ───────────────────────────────────────────────────────────
function SubmitBtn({ label, loading }) {
  return (
    <Button
      type="submit"
      variant="contained"
      fullWidth
      disabled={loading}
      sx={{
        mt: 2, py: 1.3, borderRadius: "10px", fontWeight: 700,
        textTransform: "none", fontSize: "0.9rem",
        background: "linear-gradient(135deg, #7c6af7 0%, #f7567c 100%)",
        boxShadow: "0 4px 20px rgba(124,106,247,0.35)",
        "&:hover": { background: "linear-gradient(135deg, #6a58e0, #e0455e)" },
        "&:disabled": { opacity: 0.6 },
      }}
    >
      {loading ? <CircularProgress size={20} sx={{ color: "#fff" }} /> : label}
    </Button>
  );
}

// ── Section wrapper card ────────────────────────────────────────────────────
function SectionCard({ children }) {
  const theme = useTheme();
  return (
    <Card elevation={0} sx={{
      borderRadius: "18px", height: "100%",
      border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
      background: theme.palette.mode === "dark"
        ? alpha("#1a1a2e", 0.75) : alpha("#fff", 0.9),
    }}>
      {children}
    </Card>
  );
}

// ── Section title ───────────────────────────────────────────────────────────
function SectionTitle({ icon, title, count }) {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
      <Box sx={{
        width: 36, height: 36, borderRadius: "9px", display: "flex",
        alignItems: "center", justifyContent: "center",
        background: "linear-gradient(135deg, #7c6af7, #f7567c)",
        boxShadow: "0 4px 12px rgba(124,106,247,0.3)",
      }}>
        {icon}
      </Box>
      <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "0.95rem", flexGrow: 1 }}>
        {title}
      </Typography>
      {count !== undefined && (
        <Chip label={count} size="small" sx={{
          bgcolor: alpha(theme.palette.primary.main, 0.12),
          color: theme.palette.primary.main, fontWeight: 700, fontSize: "0.72rem",
        }} />
      )}
    </Box>
  );
}

// ── Empty state ─────────────────────────────────────────────────────────────
function EmptyState({ icon, text }) {
  const theme = useTheme();
  return (
    <Box sx={{ textAlign: "center", py: 5, color: alpha(theme.palette.text.primary, 0.3) }}>
      <Box sx={{ fontSize: 44, mb: 1 }}>{icon}</Box>
      <Typography variant="body2">{text}</Typography>
    </Box>
  );
}

// ── Main Dashboard ──────────────────────────────────────────────────────────
function Dashboard() {
  const theme = useTheme();
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });

  const [workouts, setWorkouts] = useState([]);
  const [formData, setFormData] = useState({ exerciseName: "", sets: "", reps: "", weight: "", notes: "" });

  const [nutrition, setNutrition] = useState([]);
  const [nutritionData, setNutritionData] = useState({ mealType: "", foodName: "", calories: "" });

  const [progress, setProgress] = useState([]);
  const [progressData, setProgressData] = useState({ weight: "", bodyFat: "" });

  const showSnack = (message, severity = "success") =>
    setSnack({ open: true, message, severity });

  useEffect(() => {
    if (!localStorage.getItem("token")) window.location.href = "/";
    fetchWorkouts(); fetchNutrition(); fetchProgress();
  }, []);

  const fetchWorkouts  = async () => { try { const r = await API.get("/workouts");  setWorkouts(r.data);  } catch (e) { console.log(e); } };
  const fetchNutrition = async () => { try { const r = await API.get("/nutrition"); setNutrition(r.data); } catch (e) { console.log(e); } };
  const fetchProgress  = async () => { try { const r = await API.get("/progress");  setProgress(r.data);  } catch (e) { console.log(e); } };

  const addWorkout = async (e) => {
    e.preventDefault(); setLoading(true);
    try { await API.post("/workouts", formData); fetchWorkouts(); setFormData({ exerciseName: "", sets: "", reps: "", weight: "", notes: "" }); showSnack("Workout added! 💪"); }
    catch { showSnack("Failed to add workout", "error"); }
    setLoading(false);
  };

  const deleteWorkout = async (id) => {
    try { await API.delete(`/workouts/${id}`); fetchWorkouts(); showSnack("Workout deleted", "info"); }
    catch { showSnack("Failed to delete", "error"); }
  };

  const addNutrition = async (e) => {
    e.preventDefault(); setLoading(true);
    try { await API.post("/nutrition", nutritionData); fetchNutrition(); setNutritionData({ mealType: "", foodName: "", calories: "" }); showSnack("Meal logged! 🥗"); }
    catch { showSnack("Failed to log meal", "error"); }
    setLoading(false);
  };

  const addProgress = async (e) => {
    e.preventDefault(); setLoading(true);
    try { await API.post("/progress", progressData); fetchProgress(); setProgressData({ weight: "", bodyFat: "" }); showSnack("Progress saved! 📈"); }
    catch { showSnack("Failed to save progress", "error"); }
    setLoading(false);
  };

  const totalCalories = nutrition.reduce((s, i) => s + (Number(i.calories) || 0), 0);

  const tabIcon = (icon) => ({ fontSize: "15px !important" });

  return (
    <Box sx={{
      minHeight: "100vh", pb: 6,
      background: theme.palette.mode === "dark"
        ? "radial-gradient(ellipse at top, #1a0e3a 0%, #0b0b18 60%)"
        : "radial-gradient(ellipse at top, #ede9fe 0%, #f4f4fb 60%)",
    }}>
      <Container maxWidth="xl" sx={{ pt: 4 }}>

        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" sx={{
            fontWeight: 800,
            background: "linear-gradient(90deg, #7c6af7, #f7567c)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            My Dashboard
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.5, mt: 0.5 }}>
            Track workouts, nutrition & progress in one place.
          </Typography>
        </Box>

        {/* Summary chips */}
        <Box sx={{ display: "flex", gap: 1.5, mb: 3, flexWrap: "wrap" }}>
          {[
            { label: `${workouts.length} Workouts`, color: "#7c6af7" },
            { label: `${nutrition.length} Meals`, color: "#f7567c" },
            { label: `${totalCalories} kcal`, color: "#ff6b35" },
            { label: `${progress.length} Entries`, color: "#4caf50" },
          ].map((s) => (
            <Chip key={s.label} label={s.label} sx={{
              fontWeight: 700, fontSize: "0.78rem",
              bgcolor: alpha(s.color, 0.1), color: s.color,
              border: `1px solid ${alpha(s.color, 0.25)}`,
            }} />
          ))}
        </Box>

        {/* Tabs */}
        <Tabs
          value={tab} onChange={(_, v) => setTab(v)}
          TabIndicatorProps={{ style: { display: "none" } }}
          sx={{
            mb: 3, minHeight: 40,
            "& .MuiTab-root": {
              minHeight: 40, textTransform: "none", fontWeight: 600,
              fontSize: "0.85rem", borderRadius: "10px", px: 2,
              color: alpha(theme.palette.text.primary, 0.5),
            },
            "& .Mui-selected": {
              color: "#fff !important",
              background: "linear-gradient(135deg, #7c6af7, #f7567c)",
            },
          }}
        >
          <Tab icon={<FitnessCenterIcon sx={tabIcon()} />} iconPosition="start" label="Workouts" />
          <Tab icon={<RestaurantIcon sx={tabIcon()} />} iconPosition="start" label="Nutrition" />
          <Tab icon={<TrendingUpIcon sx={tabIcon()} />} iconPosition="start" label="Progress" />
        </Tabs>

        {/* ── TAB 0: WORKOUTS ── */}
        {tab === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <SectionCard>
                <CardContent sx={{ p: 3 }}>
                  <SectionTitle icon={<FitnessCenterIcon sx={{ color: "#fff", fontSize: 18 }} />} title="Log Workout" />
                  <Box component="form" onSubmit={addWorkout}>
                    <TextField fullWidth margin="normal" label="Exercise Name" value={formData.exerciseName} sx={fieldSx}
                      onChange={(e) => setFormData({ ...formData, exerciseName: e.target.value })} />
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <TextField fullWidth margin="normal" label="Sets" type="number" value={formData.sets} sx={fieldSx}
                          onChange={(e) => setFormData({ ...formData, sets: e.target.value })} />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField fullWidth margin="normal" label="Reps" type="number" value={formData.reps} sx={fieldSx}
                          onChange={(e) => setFormData({ ...formData, reps: e.target.value })} />
                      </Grid>
                    </Grid>
                    <TextField fullWidth margin="normal" label="Weight (kg)" type="number" value={formData.weight} sx={fieldSx}
                      InputProps={{ endAdornment: <InputAdornment position="end"><ScaleIcon fontSize="small" sx={{ opacity: 0.4 }} /></InputAdornment> }}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })} />
                    <SubmitBtn label="Add Workout 💪" loading={loading} />
                  </Box>
                </CardContent>
              </SectionCard>
            </Grid>

            <Grid item xs={12} md={8}>
              <SectionCard>
                <CardContent sx={{ p: 3 }}>
                  <SectionTitle icon={<FitnessCenterIcon sx={{ color: "#fff", fontSize: 18 }} />} title="Your Workouts" count={workouts.length} />
                  {workouts.length === 0 ? (
                    <EmptyState icon={<FitnessCenterIcon sx={{ fontSize: 44 }} />} text="No workouts yet. Add your first one!" />
                  ) : workouts.map((w) => (
                    <Box key={w._id} sx={{
                      display: "flex", alignItems: "center", gap: 2, py: 1.5,
                      borderBottom: `1px solid ${alpha(theme.palette.text.primary, 0.06)}`,
                      "&:last-child": { borderBottom: "none" },
                    }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>{w.exerciseName}</Typography>
                        <Typography variant="caption" sx={{ opacity: 0.55 }}>
                          {w.sets} sets · {w.reps} reps · {w.weight} kg
                        </Typography>
                      </Box>
                      <IconButton size="small" onClick={() => deleteWorkout(w._id)}
                        sx={{ color: "#f7567c", "&:hover": { bgcolor: alpha("#f7567c", 0.1) } }}>
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ))}
                </CardContent>
              </SectionCard>
            </Grid>
          </Grid>
        )}

        {/* ── TAB 1: NUTRITION ── */}
        {tab === 1 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={5}>
              <SectionCard>
                <CardContent sx={{ p: 3 }}>
                  <SectionTitle icon={<RestaurantIcon sx={{ color: "#fff", fontSize: 18 }} />} title="Log Meal" />
                  <Box component="form" onSubmit={addNutrition}>
                    <TextField fullWidth margin="normal" label="Meal Type" placeholder="Breakfast, Lunch…" value={nutritionData.mealType} sx={fieldSx}
                      onChange={(e) => setNutritionData({ ...nutritionData, mealType: e.target.value })} />
                    <TextField fullWidth margin="normal" label="Food Name" value={nutritionData.foodName} sx={fieldSx}
                      onChange={(e) => setNutritionData({ ...nutritionData, foodName: e.target.value })} />
                    <TextField fullWidth margin="normal" label="Calories" type="number" value={nutritionData.calories} sx={fieldSx}
                      InputProps={{ endAdornment: <InputAdornment position="end"><LocalFireDepartmentIcon fontSize="small" sx={{ color: "#ff6b35", opacity: 0.7 }} /></InputAdornment> }}
                      onChange={(e) => setNutritionData({ ...nutritionData, calories: e.target.value })} />
                    <SubmitBtn label="Log Meal 🥗" loading={loading} />
                  </Box>
                </CardContent>
              </SectionCard>
            </Grid>

            <Grid item xs={12} md={7}>
              <SectionCard>
                <CardContent sx={{ p: 3 }}>
                  <SectionTitle icon={<RestaurantIcon sx={{ color: "#fff", fontSize: 18 }} />} title="Today's Meals" count={nutrition.length} />
                  {nutrition.length > 0 && (
                    <Box sx={{ mb: 2, p: 1.5, borderRadius: "10px", bgcolor: alpha("#ff6b35", 0.08), border: `1px solid ${alpha("#ff6b35", 0.2)}`, display: "flex", alignItems: "center", gap: 1 }}>
                      <LocalFireDepartmentIcon sx={{ color: "#ff6b35", fontSize: 18 }} />
                      <Typography variant="body2" sx={{ fontWeight: 700, color: "#ff6b35" }}>{totalCalories} kcal total</Typography>
                    </Box>
                  )}
                  {nutrition.length === 0 ? (
                    <EmptyState icon={<RestaurantIcon sx={{ fontSize: 44 }} />} text="No meals logged yet." />
                  ) : nutrition.map((item, i) => (
                    <Box key={i}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2, py: 1.5 }}>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>{item.foodName}</Typography>
                          <Typography variant="caption" sx={{ opacity: 0.55, textTransform: "capitalize" }}>{item.mealType}</Typography>
                        </Box>
                        <Chip label={`${item.calories} kcal`} size="small" sx={{ bgcolor: alpha("#ff6b35", 0.1), color: "#ff6b35", fontWeight: 700, fontSize: "0.7rem", height: 24 }} />
                      </Box>
                      {i < nutrition.length - 1 && <Divider sx={{ borderColor: alpha(theme.palette.text.primary, 0.06) }} />}
                    </Box>
                  ))}
                </CardContent>
              </SectionCard>
            </Grid>
          </Grid>
        )}

        {/* ── TAB 2: PROGRESS ── */}
        {tab === 2 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <SectionCard>
                <CardContent sx={{ p: 3 }}>
                  <SectionTitle icon={<TrendingUpIcon sx={{ color: "#fff", fontSize: 18 }} />} title="Record Progress" />
                  <Box component="form" onSubmit={addProgress}>
                    <TextField fullWidth margin="normal" label="Weight (kg)" type="number" value={progressData.weight} sx={fieldSx}
                      InputProps={{ endAdornment: <InputAdornment position="end"><ScaleIcon fontSize="small" sx={{ opacity: 0.4 }} /></InputAdornment> }}
                      onChange={(e) => setProgressData({ ...progressData, weight: e.target.value })} />
                    <TextField fullWidth margin="normal" label="Body Fat %" type="number" value={progressData.bodyFat} sx={fieldSx}
                      InputProps={{ endAdornment: <InputAdornment position="end"><Typography variant="caption" sx={{ opacity: 0.5 }}>%</Typography></InputAdornment> }}
                      onChange={(e) => setProgressData({ ...progressData, bodyFat: e.target.value })} />
                    <SubmitBtn label="Save Progress 📈" loading={loading} />
                  </Box>
                </CardContent>
              </SectionCard>
            </Grid>

            <Grid item xs={12} md={8}>
              <SectionCard>
                <CardContent sx={{ p: 3 }}>
                  <SectionTitle icon={<TrendingUpIcon sx={{ color: "#fff", fontSize: 18 }} />} title="Progress History" count={progress.length} />
                  {progress.length === 0 ? (
                    <EmptyState icon={<TrendingUpIcon sx={{ fontSize: 44 }} />} text="No progress entries yet." />
                  ) : progress.map((entry, i) => (
                    <Box key={i}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2, py: 1.5 }}>
                        <Box sx={{
                          width: 34, height: 34, borderRadius: "9px", fontWeight: 800,
                          bgcolor: alpha("#4caf50", 0.1), color: "#4caf50",
                          display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.78rem",
                        }}>#{i + 1}</Box>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>{entry.weight} kg</Typography>
                          <Typography variant="caption" sx={{ opacity: 0.55 }}>Body fat: {entry.bodyFat}%</Typography>
                        </Box>
                        <Chip label={`Entry ${i + 1}`} size="small" sx={{ bgcolor: alpha("#4caf50", 0.1), color: "#4caf50", fontWeight: 700, fontSize: "0.7rem", height: 24 }} />
                      </Box>
                      {i < progress.length - 1 && <Divider sx={{ borderColor: alpha(theme.palette.text.primary, 0.06) }} />}
                    </Box>
                  ))}
                </CardContent>
              </SectionCard>
            </Grid>
          </Grid>
        )}

      </Container>

      <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack({ ...snack, open: false })} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Alert onClose={() => setSnack({ ...snack, open: false })} severity={snack.severity} variant="filled" sx={{ borderRadius: "12px", fontWeight: 600 }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Dashboard;
