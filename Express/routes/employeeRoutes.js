const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const {
  authenticateToken,
  authorizeRoles,
} = require("../middleware/authMiddleware");

router.post("/", employeeController.createStudnet);
router.get("/", employeeController.getStudents);

// router.get("/", authenticateToken, employeeController.getAll);
// router.get("/:id", authenticateToken, employeeController.getById);
// router.post("/", authenticateToken, employeeController.create);
// router.put("/:id", authenticateToken, employeeController.update);
// router.delete("/:id", authenticateToken, employeeController.remove);

// router.get(
//   "/admin-info",
//   authenticateToken,
//   authorizeRoles([1, 3, 4]),
//   employeeController.adminData
// );

module.exports = router;

// let obj = [
//   {
//     route: "/admin-info",
//     roles: [1],
//   },
// ];
