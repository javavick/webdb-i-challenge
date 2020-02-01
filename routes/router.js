const express = require("express");
const router = express.Router();
// Data
const db = require("../data/dbConfig.js");

// GET ("/api/accounts")
router.get("/", async (req, res, next) => {
  try {
    res.json(await db("accounts"));
  } catch (err) {
    next(err);
  }
});

// GET ("/api/accounts/:id")
router.get("/:id", async (req, res, next) => {
  try {
    res.json(
      await db("accounts")
        .where("id", req.params.id)
        .first()
    );
  } catch (err) {
    next(err);
  }
});

// POST ("/api/accounts")
router.post("/", async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget
    };

    const [id] = await db("accounts").insert(payload);

    res.json(
      await db("accounts")
        .where("id", id)
        .first()
    );
  } catch (err) {
    next(err);
  }
});

// DELETE ("/api/accounts/:id")
router.delete("/:id", async (req, res, next) => {
  try {
    await db("accounts")
      .where("id", req.params.id)
      .del();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

// PUT ("/api/accounts/:id")
router.put("/:id", async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget
    };

    await db("accounts")
      .where("id", req.params.id)
      .update(payload);

    res.json(
      await db("accounts")
        .where("id", req.params.id)
        .first()
    );
  } catch (err) {
    next(err);
  }
});

module.exports = router;
