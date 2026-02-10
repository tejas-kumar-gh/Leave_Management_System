import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";

export default function AdminDashboard() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all leaves
  const fetchLeaves = async () => {
    try {
      const res = await axios.get("/leaves/all"); // admin only
      setLeaves(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch leaves");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  // Update leave status (approve/reject)
  const handleStatusChange = async (leaveId, status) => {
    try {
      await axios.put("/leaves/update", { leaveId, status });
      alert(`Leave ${status} successfully`);
      fetchLeaves(); // Refresh the list
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update leave");
    }
  };

  if (loading) return <p>Loading leaves...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">All Leave Requests</h2>
      <table className="min-w-full bg-white border border-gray-200 rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Employee</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Start Date</th>
            <th className="px-4 py-2 border">End Date</th>
            <th className="px-4 py-2 border">Reason</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave.id} className="text-center">
              <td className="px-4 py-2 border">{leave.id}</td>
              <td className="px-4 py-2 border">{leave.name}</td>
              <td className="px-4 py-2 border">{leave.email}</td>
              <td className="px-4 py-2 border">{leave.start_date}</td>
              <td className="px-4 py-2 border">{leave.end_date}</td>
              <td className="px-4 py-2 border">{leave.reason}</td>
              <td className="px-4 py-2 border capitalize">{leave.status}</td>
              <td className="px-4 py-2 border space-x-2">
                {leave.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleStatusChange(leave.id, "approved")}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusChange(leave.id, "rejected")}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </>
                )}
                {leave.status !== "pending" && <span>N/A</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
