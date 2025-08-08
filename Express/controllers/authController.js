const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const authModel = require("../models/authModel");
const pool = require("../db");

exports.signup = async (req, res) => {
  const { fname, email, password, roleid } = req.body;

  try {
    const userExist = await authModel.getUserByEmail(email);
    if (userExist.rows.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPwd = await bcrypt.hashSync(password, 10);
    const newUser = await authModel.signup(
      fname,
      email,
      hashedPwd,
      Number(roleid)
    );
    res.status(201).json({ message: "User Created", user: newUser.rows[0] });
  } catch (err) {
    console.error("Signup Error-", err);
    res.status(500).json({ message: "Signup Server Error" });
  }
};

// return user information along with token
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExist = await authModel.getUserByEmail(email);
    if (userExist.rows.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid Credentials- Email does not exist" });
    }

    const user = userExist.rows[0];

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.roleid },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ token, user: user.roleid });
  } catch (err) {
    console.error("Login Error-", err);
    res.status(500).json({ message: "Login Server Error" });
  }
};

exports.getRole = async (req, res) => {
  try {
    const result = await authModel.getAllRoleMaster();
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Role Master not found" });
    }
    res.json(result.rows);
  } catch (err) {
    console.error("Error Role Deatils:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
