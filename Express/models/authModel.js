const pool = require("../db");

exports.getUserByEmail = (email) => {
  return pool.query("SELECT * FROM employee where email = $1", [email]);
};

exports.signup = (fname, email, hashedPwd) => {
  return pool.query(
    "INSERT INTO employee (fname, email, password) VALUES ($1, $2, $3) RETURNING *",
    [fname, email, hashedPwd]
  );
};
