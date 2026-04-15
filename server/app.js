const ticketRoutes = require("./routes/ticketRoutes");

// Add this with your other routes
app.use("/api/tickets", ticketRoutes);
app.use("/api/auth",      require("./routes/authRoutes"));
app.use("/api/complaints",require("./routes/complaintRoutes"));
app.use("/api/contact",   require("./routes/contactRoutes"));
app.use("/api/admin",     require("./routes/adminRoutes"));
app.use("/api/tickets",   require("./routes/ticketRoutes")); // ← ADD THIS