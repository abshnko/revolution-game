import express from "express";

const router = express.Router();

router.get("/", (res, req) => {
  res.json({ ok: "ok" });
});

export default router;
