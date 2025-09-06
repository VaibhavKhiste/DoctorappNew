const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Temporary in-memory storage (later can be replaced with DB)
let doctors = [];

// ✅ POST API - Doctor Registration
app.post("/api/Doctor/Registration", (req, res) => {
  const { fullName, email, gender, months, years } = req.body;

  if (!fullName || !email || !gender) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newDoctor = {
    id: doctors.length + 1,
    fullName,
    email,
    gender,
    months,
    years,
  };

  doctors.push(newDoctor);
  res.status(201).json({ message: "Doctor registered successfully", doctor: newDoctor });
});

// ✅ GET API - Fetch all registered doctors
app.get("/api/Doctor/List", (req, res) => {
  res.json(doctors);
});

// Root route
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on http://0.0.0.0:${PORT}`);
});

