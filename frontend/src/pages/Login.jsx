import { useState } from "react";
import axios from "axios";

import { useNavigate ,Link} from "react-router-dom";

export default function Login() {
  const API = import.meta.env.VITE_API_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      `${API}/auth/login`,
      { email, password },
      { withCredentials: true }
    );

    const role = res.data.role;

    alert(res.data.message);

    // 🔥 Role-based navigation
    if (role === "employee") {
      navigate("/employee-dashboard");
    } else if (role === "manager") {
      navigate("/manager-dashboard");
    } else if (role === "admin") {
      navigate("/admin-dashboard");
    } else {
      navigate("/dashboard"); // fallback
    }

  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  }
};


  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
    <form
  onSubmit={handleLogin}
  className="bg-white p-8 rounded shadow-md w-96"
>
  <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

  <input
    type="email"
    placeholder="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="w-full p-2 mb-4 border rounded"
    required
  />

  <input
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="w-full p-2 mb-4 border rounded"
    required
  />

  <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
    Login
  </button>

  <p className="text-center mt-4 text-sm">
    Don't have an account?{" "}
    <Link to="/register" className="text-blue-600 hover:underline font-medium">
      Register
    </Link>
  </p>
</form>

      

    </div>
    
  );
}
