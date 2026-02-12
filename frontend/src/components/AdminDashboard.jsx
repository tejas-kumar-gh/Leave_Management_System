import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const handleLogout = async () => {
    try {
      await axios.post(`${API}/auth/logout`, {}, { withCredentials: true });
      localStorage.removeItem("role");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-red-700 text-white p-6">
        <h2 className="text-xl font-bold mb-8">Admin Panel</h2>

        <ul className="space-y-4">
          <li className="hover:underline cursor-pointer">Dashboard</li>
          <li className="hover:underline cursor-pointer">Manage Users</li>
          <li className="hover:underline cursor-pointer">All Leave Requests</li>
          <li className="hover:underline cursor-pointer">Reports</li>
          <li
            className="hover:underline cursor-pointer text-yellow-300"
            onClick={handleLogout}
          >
            Logout
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-8">Welcome Admin 👑</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-semibold">Total Employees</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">40</p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-semibold">Total Managers</h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">5</p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-semibold">Total Leave Requests</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">120</p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-semibold">Pending Requests</h3>
            <p className="text-3xl font-bold text-yellow-500 mt-2">8</p>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="mt-10 bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• Manager approved 3 leave requests</li>
            <li>• New employee registered</li>
            <li>• 2 leave requests pending review</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
