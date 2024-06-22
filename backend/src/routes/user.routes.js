import { Router } from "express";

const router = Router();

router.get("/random", (req, res) => {
  res.send("Hello World! random route");
});

export default router;
