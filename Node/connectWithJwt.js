const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 8080;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "root",
  port: 5432,
});

// DB connect test
pool
  .connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch((err) => console.error("❌ Connection error", err.stack));

// 🟢 MIDDLEWARE to verify JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token missing" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Token invalid" });
    req.user = user; // attach user to request
    next();
  });
}

// 🟢 Dummy login route (in real you’ll query the DB)
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Hard-coded user for testing:
    const fakeUser = {
      id: 1,
      email: "test@test.com",
      password: await bcrypt.hash("123456", 10), // hashedPasword
    };

    if (email !== fakeUser.email) {
      return res.status(400).json({ error: "Invalid email" });
    }

    const validPass = await bcrypt.compare(password, fakeUser.password);
    if (!validPass) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { id: fakeUser.id, email: fakeUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    console.error("Login error", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/", authenticateToken, async (req, res) => {
  try {
    const query = "SELECT id, fname, email FROM employee ORDER BY id";
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/", authenticateToken, async (req, res) => {
  const { fname, email } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO employee (fname, email) VALUES ($1, $2) RETURNING *",
      [fname, email]
    );
    res.status(201).json({ emp: result.rows[0] });
  } catch (err) {
    console.error("Error inserting employee:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/:id", authenticateToken, async (req, res) => {
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

app.put("/:id", authenticateToken, async (req, res) => {
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

app.delete("/:id", authenticateToken, async (req, res) => {
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
