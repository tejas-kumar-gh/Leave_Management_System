import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ManagerDashboard() {
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const handleLogout = async () => {
    await axios.post(`${API}/auth/logout`, {}, { withCredentials: true });
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-purple-700 text-white p-5">
        <h2 className="text-xl font-bold mb-6">Manager Panel</h2>
        <ul className="space-y-4">
          <li className="hover:underline cursor-pointer">Dashboard</li>
          <li className="hover:underline cursor-pointer">View Leave Requests</li>
          <li className="hover:underline cursor-pointer">Approve / Reject</li>
          <li
            className="hover:underline cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Welcome Manager 👋</h1>

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-semibold">Total Requests</h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">25</p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-semibold">Pending Requests</h3>
            <p className="text-3xl font-bold text-yellow-500 mt-2">6</p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-semibold">Approved Today</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">3</p>
          </div>
        </div>
      </div>
    </div>
  );
}
