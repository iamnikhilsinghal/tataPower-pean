const pool = require("../db");

exports.getAllEmployees = () => {
  return pool.query("SELECT id, fname, email FROM employee ORDER BY id");
};

exports.getEmployeeById = (id) => {
  return pool.query("SELECT id, fname, email FROM employee WHERE id = $1", [
    id,
  ]);
};

exports.createEmployee = (fname, email) => {
  return pool.query(
    "INSERT INTO employee (fname, email) VALUES ($1, $2) RETURNING *",
    [fname, email]
  );
};

exports.updateEmployee = (id, fname, email) => {
  return pool.query(
    "UPDATE employee SET fname = $1, email = $2 WHERE id = $3 RETURNING *",
    [fname, email, id]
  );
};

exports.deleteEmployee = (id) => {
  return pool.query("DELETE FROM employee WHERE id = $1 RETURNING *", [id]);
};
