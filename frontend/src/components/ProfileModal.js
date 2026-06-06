import {
  Dialog, DialogContent, Box, Typography, Avatar,
  IconButton, Divider, Chip, alpha, Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

function ProfileModal({ open, onClose, user }) {
  const joinDate = new Date().toLocaleDateString("en-US", {
    year: "numeric", month: "long",
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        elevation: 0,
        sx: {
          borderRadius: "24px",
          background: "linear-gradient(145deg, #1a1a2e 0%, #0f0f1a 100%)",
          border: `1px solid ${alpha("#7c6af7", 0.2)}`,
          boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
          overflow: "visible",
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>

        {/* Header banner */}
        <Box sx={{
          height: 90,
          borderRadius: "24px 24px 0 0",
          background: "linear-gradient(135deg, #7c6af7 0%, #f7567c 100%)",
          position: "relative",
        }}>
          <IconButton onClick={onClose} size="small" sx={{
            position: "absolute", top: 10, right: 10,
            color: alpha("#fff", 0.8),
            bgcolor: alpha("#000", 0.2),
            "&:hover": { bgcolor: alpha("#000", 0.35) },
          }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Avatar */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: "-40px", mb: 1 }}>
          <Avatar sx={{
            width: 80, height: 80,
            background: "linear-gradient(135deg, #7c6af7, #f7567c)",
            fontSize: "2rem", fontWeight: 800,
            border: "4px solid #1a1a2e",
            boxShadow: "0 8px 24px rgba(124,106,247,0.4)",
          }}>
            {user?.name ? user.name[0].toUpperCase() : "?"}
          </Avatar>
        </Box>

        {/* User name & badge */}
        <Box sx={{ textAlign: "center", px: 3, mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: "#fff", mb: 0.5 }}>
            {user?.name || "Athlete"}
          </Typography>
          <Chip
            icon={<FitnessCenterIcon sx={{ fontSize: "13px !important", color: "#7c6af7 !important" }} />}
            label="Fitness Enthusiast"
            size="small"
            sx={{
              bgcolor: alpha("#7c6af7", 0.12), color: "#7c6af7",
              fontWeight: 600, fontSize: "0.7rem", height: 24,
              border: `1px solid ${alpha("#7c6af7", 0.25)}`,
            }}
          />
        </Box>

        <Divider sx={{ borderColor: alpha("#7c6af7", 0.1), mx: 3 }} />

        {/* Info rows */}
        <Box sx={{ px: 3, py: 2.5, display: "flex", flexDirection: "column", gap: 2 }}>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box sx={{
              width: 34, height: 34, borderRadius: "9px",
              bgcolor: alpha("#7c6af7", 0.1),
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <PersonOutlineIcon sx={{ fontSize: 17, color: "#7c6af7" }} />
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: alpha("#fff", 0.4), display: "block", lineHeight: 1 }}>
                Full Name
              </Typography>
              <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600 }}>
                {user?.name || "—"}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box sx={{
              width: 34, height: 34, borderRadius: "9px",
              bgcolor: alpha("#f7567c", 0.1),
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <EmailOutlinedIcon sx={{ fontSize: 17, color: "#f7567c" }} />
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: alpha("#fff", 0.4), display: "block", lineHeight: 1 }}>
                Email
              </Typography>
              <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600 }}>
                {user?.email || "—"}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box sx={{
              width: 34, height: 34, borderRadius: "9px",
              bgcolor: alpha("#4caf50", 0.1),
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <CalendarTodayIcon sx={{ fontSize: 17, color: "#4caf50" }} />
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: alpha("#fff", 0.4), display: "block", lineHeight: 1 }}>
                Member Since
              </Typography>
              <Typography variant="body2" sx={{ color: "#fff", fontWeight: 600 }}>
                {joinDate}
              </Typography>
            </Box>
          </Box>

        </Box>

        {/* Close button */}
        <Box sx={{ px: 3, pb: 3 }}>
          <Button fullWidth onClick={onClose} sx={{
            py: 1.2, borderRadius: "10px", fontWeight: 700,
            textTransform: "none", color: "#fff",
            background: "linear-gradient(135deg, #7c6af7, #f7567c)",
            "&:hover": { background: "linear-gradient(135deg, #6a58e0, #e0455e)" },
          }}>
            Close
          </Button>
        </Box>

      </DialogContent>
    </Dialog>
  );
}

export default ProfileModal;
