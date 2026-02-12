const express = require('express');
const cors = require('cors');
const cookie = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require("./routes/authRoutes");
const leaveRoutes = require("./routes/leaveRoutes");

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(cookie());

app.use("/api/auth", authRoutes);
app.use("/api/leaves", leaveRoutes);

app.listen(3000, () => console.log("Server running on  3000 port "));
