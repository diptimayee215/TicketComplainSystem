const express   = require("express");
const dotenv    = require("dotenv");
const cors      = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// ── Middleware ────────────────────────────────────────────
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ── Routes ────────────────────────────────────────────────
app.use("/api/auth",       require("./route/authRoute"));
app.use("/api/complaints", require("./route/complaintRoute"));
app.use("/api/contact",    require("./route/contactRoute"));
app.use("/api/tickets",    require("./route/ticketRoute"));   // ← WAS MISSING!
app.use("/api/admin",      require("./route/adminRoute"));

// ── Health check ──────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ message: "TicketSys API running ✅" });
});

// ── 404 handler ───────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// ── Global error handler ──────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || "Server Error" });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});