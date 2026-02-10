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

const getAllLeaves=(req,res)=>{
  const sql="select l.id,l.user_id,l.start_date,l.end_date,l.reason,l.status,u.name,u.email from leaves l join users u on l.user_id=u.id"
  db.query(sql,(err,results)=>{
    if(err) return res.status(500).json(err)
    
      res.json(results)
  })
}

const updateLeaveStatus= (req,res)=>{
  const {leaveId,status}=req.body;
  if(!['approved','rejected'].includes(status)){
    return res.status(400).json({message:"Invalid status"})
  }
  const sql='update leaves set status = ? where id = ?';
  db.query(sql,[status,leaveId],(err,result)=>{
    if(err) return res.status(500).json(err)
    
      res.json({message:`leave ${status} successfully`})
  })
}

module.exports = { applyLeave, getMyLeaves, getAllLeaves ,updateLeaveStatus};
