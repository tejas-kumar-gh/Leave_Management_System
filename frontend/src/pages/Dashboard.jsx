import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import EmployeeDashboard from "../components/EmployeeDashboard";
import AdminDashboard from "../components/AdminDashBoard";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("/auth/me")
      .then(res => setUser(res.data))
      .catch(err => console.log(err));
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}</h1>
      {user.role === "admin" ? <AdminDashboard /> : <EmployeeDashboard />}
    </div>
  );
}
