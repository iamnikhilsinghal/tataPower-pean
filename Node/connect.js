const express = require("express"); // import express module(function) into a const
const { Pool } = require("pg");
const cors = require("cors");
const app = express(); // fucn called and stored in app const
// this line creates an express object that is used to define routes/middleware

app.use(express.json());
app.use(cors());

const PORT = 8080;

// PostgreSQL connection configuration
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "root",
  port: 5432,
});

// Test the DB connection
pool
  .connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch((err) => console.error("❌ Connection error", err.stack));

app.get("/", async (req, res) => {
  try {
    const query = "SELECT id, fname, email FROM employee ORDER BY id";
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/", async (req, res) => {
  const { fname, email } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO employee (fname, email) VALUES ($1, $2) RETURNING *",
      [fname, email]
    );
    emitter.emit("userAdded", result.rows[0]);
    res.status(201).json({ emp: result.rows[0] });
  } catch (err) {
    console.error("Error inserting employee:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get employee by ID
app.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT id, fname, email FROM employee WHERE id = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching employee:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update employee
app.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { fname, email } = req.body;
  try {
    const result = await pool.query(
      "UPDATE employee SET fname = $1, email = $2 WHERE id = $3 RETURNING *",
      [fname, email, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json({ emp: result.rows[0] });
  } catch (err) {
    console.error("Error updating employee:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete employee
app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM employee WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json({ message: "Employee deleted", emp: result.rows[0] });
  } catch (err) {
    console.error("Error deleting employee:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
