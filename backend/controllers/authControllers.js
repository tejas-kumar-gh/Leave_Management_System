const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const db=require("../config/db")

const login=(req,res)=>{
  const {email,password} = req.body;
  db.query(
    "select * from users where email = ?",
  [email],
  (err,data)=>{
    if(err|| data.length ===0) return res.status(401).json("Invalid credentials")

      const user=data[0]

      const isMatch=bcrypt.compareSync(password,user.password)
      if(!isMatch)
        return res.status(401).json("Invalid credentials")

      const token=jwt.sign({
        id:user.id,role:user.role},
        process.env.JWT_SECRET,
        {expiresIn:"1d"})
  
  res.cookie("token",token,{
    httpOnly:true,
    secure:false,
    sameSite:"lax",
    maxAge:24*60*60*1000
  })
  .json({
    message:"Login successfully",
    role:user.role
  })
}
  )}
  const register = (req, res) => {
  const { name, email, password, role } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = `
    INSERT INTO users (name, email, password, role)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [name, email, hashedPassword, role], (err, result) => {
    if (err) return res.status(500).json(err);

    const userId = result.insertId;

    db.query(
      "INSERT INTO leave_balance (user_id) VALUES (?)",
      [userId]
    );

    res.status(201).json({ message: "User registered successfully" });
  });
};
const logout = (req, res) => {
  res.clearCookie("token").json({ message: "Logged out" });
};

module.exports = { register, login, logout };

  module.exports={login,register,logout}
