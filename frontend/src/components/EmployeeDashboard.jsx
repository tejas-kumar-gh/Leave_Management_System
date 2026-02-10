import { useState, useEffect } from "react";
import axios from "../api/axiosInstance";

export default function EmployeeDashboard() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    start_date: "",
    end_date: "",
    reason: "",
  });

  // Fetch my leave history
  const fetchLeaves = async () => {
    try {
      const res = await axios.get("/leaves/my");
      setLeaves(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch leave history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  // Apply for leave
  const handleApply = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/leaves/apply", form);
      alert("Leave applied successfully!");
      setForm({ start_date: "", end_date: "", reason: "" });
      fetchLeaves();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to apply leave");
    }
  };

  if (loading) return <p>Loading leave history...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Apply for Leave</h2>
      <form
        onSubmit={handleApply}
        className="mb-6 bg-white p-4 rounded shadow-md w-full max-w-md"
      >
        <div className="mb-2">
          <label>Start Date:</label>
          <input
            type="date"
            value={form.start_date}
            onChange={(e) => setForm({ ...form, start_date: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-2">
          <label>End Date:</label>
          <input
            type="date"
            value={form.end_date}
            onChange={(e) => setForm({ ...form, end_date: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-2">
          <label>Reason:</label>
          <input
            type="text"
            value={form.reason}
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Apply Leave
        </button>
      </form>

      <h2 className="text-xl font-bold mb-4">My Leave History</h2>
      <table className="min-w-full bg-white border border-gray-200 rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Start Date</th>
            <th className="px-4 py-2 border">End Date</th>
            <th className="px-4 py-2 border">Reason</th>
            <th className="px-4 py-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave.id} className="text-center">
              <td className="px-4 py-2 border">{leave.id}</td>
              <td className="px-4 py-2 border">{leave.start_date}</td>
              <td className="px-4 py-2 border">{leave.end_date}</td>
              <td className="px-4 py-2 border">{leave.reason}</td>
              <td className={`px-4 py-2 border capitalize ${leave.status === 'approved' ? 'text-green-600' : leave.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'}`}>
                {leave.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
