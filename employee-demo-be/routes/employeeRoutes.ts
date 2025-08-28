import express from "express";

import { getEmployeeById, updateEmployee, } from "../handlers/employeeHandler";

const router = express.Router();
router.get("/:id", async (req, res) => {
  const employee = await getEmployeeById(req.params.id);
  if (!employee) return res.status(404).json({ message: "Employee not found" });
  res.json(employee);
});

router.put("/:id", async (req, res) => {
  const updated = await updateEmployee(req.params.id, req.body);
  res.json(updated);
});



export default router;
