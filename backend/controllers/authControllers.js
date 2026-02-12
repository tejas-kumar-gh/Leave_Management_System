const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const db=require("../config/db")

const login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
      }

      if (data.length === 0) {
        return res.status(401).json({ message: "Invalid email" });
      }

      const user = data[0];

      // ✅ Compare password
      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid password" });
      }

      // ✅ Generate token
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      // ✅ Send role back to frontend
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          maxAge: 24 * 60 * 60 * 1000,
        })
        .json({
          message: "Login successful",
          role: user.role,   // 🔥 returning role
        });
    }
  );
};

 const register = (req, res) => {
  const { name, email, password, role } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = `
    INSERT INTO users (name, email, password, role)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [name, email, hashedPassword, role], (err, result) => {
    if (err) {
      console.log("User Insert Error:", err);
      return res.status(500).json({ message: "Registration error" });
    }

    const userId = result.insertId;

    // ✅ Correct leave_balance insert
    db.query(
      "INSERT INTO leave_balance (user_id) VALUES (?)",
      [userId],
      (err2) => {
        if (err2) {
          console.log("Leave Balance Error:", err2);
          return res.status(500).json({ message: "Leave balance error" });
        }

        res.status(201).json({ message: "User registered successfully" });
      }
    );
  });
};

module.exports = { register, login};


