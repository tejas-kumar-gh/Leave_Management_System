const express = require('express');
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const admin=require("../middleware/adminMiddleware")
const {
    applyLeave,
   getMyLeaves,
   getAllLeaves,
   updateLeaveStatus

 } = require("../controllers/leaveController");

// employee routes
router.post("/apply", auth, applyLeave);
router.get("/my", auth, getMyLeaves);

//admin routes
router.get("/all",auth,admin,getAllLeaves)
router.put('/update',auth,admin,updateLeaveStatus)
module.exports = router;
