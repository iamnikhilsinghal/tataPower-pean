const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const authModel = require("../models/authModel");
const pool = require("../db");

exports.signup = async (req, res) => {
  const { fname, email, password } = req.body;

  try {
    const userExist = await authModel.getUserByEmail(email);
    if (userExist.rows.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPwd = await bcrypt.hashSync(password, 10);
    const newUser = await authModel.signup(fname, email, hashedPwd);
    res.status(201).json({ message: "User Created", user: newUser.rows[0] });
  } catch (err) {
    console.error("Signup Error-", err);
    res.status(500).json({ message: "Signup Server Error" });
  }
};

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
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ token });
  } catch (err) {
    console.error("Login Error-", err);
    res.status(500).json({ error: "Login Server Error" });
  }
};
