const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// Dummy user for testing (replace with DB call later)
const fakeUser = {
  id: 1,
  email: "test@test.com",
  password: bcrypt.hashSync("123456", 10),
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (email !== fakeUser.email) {
    return res.status(400).json({ error: "Invalid email" });
  }

  const valid = await bcrypt.compare(password, fakeUser.password);
  if (!valid) {
    return res.status(400).json({ error: "Invalid password" });
  }

  const token = jwt.sign(
    { id: fakeUser.id, email: fakeUser.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  res.json({ token });
};

// signup
