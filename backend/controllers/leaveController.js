const db = require('../config/db');

const applyLeave = (req, res) => {
  const { start_date, end_date, reason } = req.body;
  const userId = req.user.id;

  const sql = "INSERT INTO leaves (user_id,start_date,end_date,reason) VALUES (?,?,?,?)";
  db.query(sql, [userId, start_date, end_date, reason], (err) => {
    if(err) return res.status(500).json(err);
    res.status(201).json({ message: "Leave applied successfully" });
  });
};

const getMyLeaves = (req, res) => {
  const sql = "SELECT * FROM leaves WHERE user_id = ?";
  db.query(sql, [req.user.id], (err, results) => { // fixed typo 'Id' → 'id'
    if(err) return res.status(500).json(err);
    res.json(results);
  });
};

module.exports = { applyLeave, getMyLeaves };
