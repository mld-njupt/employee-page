import express from "express";
import { updateExperiences } from "../handlers/experienceHandler";

const router = express.Router({ mergeParams: true });

router.put("/", async (req, res) => {
  const exp = await updateExperiences(
    (req.params as { id: string }).id,
    req.body
  );
  res.json(exp);
});

export default router;
