const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Test Route
app.get("/", (req, res) => {
  res.send("API Running Successfully");
});

// Server Start
const PORT = process.env.PORT || 5000;
app.use("/api/users", require("./routes/userRoutes"));

app.use("/api/workouts", require("./routes/workoutRoutes"));

app.use("/api/nutrition", require("./routes/nutritionRoutes"));

app.use("/api/progress", require("./routes/progressRoutes"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});