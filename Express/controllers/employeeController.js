const employeeModel = require("../models/employeeModel");

exports.getAll = async (req, res) => {
  try {
    const result = await employeeModel.getAllEmployees();
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching employees:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await employeeModel.getEmployeeById(id);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching employee:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.create = async (req, res) => {
  try {
    const { fname, email } = req.body;
    const result = await employeeModel.createEmployee(fname, email);
    res.status(201).json({ emp: result.rows[0] });
  } catch (err) {
    console.error("Error creating employee:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { fname, email } = req.body;
    const result = await employeeModel.updateEmployee(id, fname, email);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json({ emp: result.rows[0] });
  } catch (err) {
    console.error("Error updating employee:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await employeeModel.deleteEmployee(id);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json({ message: "Employee deleted", emp: result.rows[0] });
  } catch (err) {
    console.error("Error deleting employee:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.adminData = (req, res) => {
  res.json({ message: "This is Admin data" });
};
