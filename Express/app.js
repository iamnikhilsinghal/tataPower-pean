const express = require("express");
const cors = require("cors");
const employeeRoutes = require("./routes/employeeRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use("/api/emp", employeeRoutes);
app.use("/api/auth", authRoutes);
app.all("/{*any}", (req, res) => {
  res.status(404).send("404: Page not found");
});
// /api/cart

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
