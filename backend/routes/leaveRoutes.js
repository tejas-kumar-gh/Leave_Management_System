const express = require('express');
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { applyLeave, getMyLeaves } = require("../controllers/leaveController");

router.post("/apply", auth, applyLeave);
router.get("/my", auth, getMyLeaves);

module.exports = router;
