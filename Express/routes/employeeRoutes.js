const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const authenticateToken = require("../middleware/authMiddleware");

router.get("/", authenticateToken, employeeController.getAll);
router.get("/:id", authenticateToken, employeeController.getById);
router.post("/", authenticateToken, employeeController.create);
router.put("/:id", authenticateToken, employeeController.update);
router.delete("/:id", authenticateToken, employeeController.remove);

module.exports = router;
