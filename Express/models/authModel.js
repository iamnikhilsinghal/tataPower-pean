const pool = require("../db");

exports.getUserByEmail = (email) => {
  return pool.query("SELECT * FROM employee where email = $1", [email]);
};

exports.signup = (fname, email, hashedPwd, roleid) => {
  return pool.query(
    "INSERT INTO employee (fname, email, password, roleid) VALUES ($1, $2, $3, $4) RETURNING *",
    [fname, email, hashedPwd, roleid]
  );
};

exports.getAllRoleMaster = () => {
  return pool.query("select RoleID,RoleName from Role_Master order by id");
};
