import express from "express";
import { updateEducations } from "../handlers/educationHandler";

const router = express.Router({ mergeParams: true });

router.put("/", async (req, res) => {
  const edu = await updateEducations(
    (req.params as { id: string }).id,
    req.body
  );
  res.json(edu);
});

export default router;
