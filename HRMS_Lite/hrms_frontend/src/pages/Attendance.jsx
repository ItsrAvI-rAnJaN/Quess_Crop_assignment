import { useEffect, useState } from "react";
import api from "../services/api";

export default function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({
    employee: "",
    date: "",
    status: "Present",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const res = await api.get("/employees/");
    setEmployees(res.data);
  };

  const fetchAttendance = async (empId) => {
    const res = await api.get(`/attendance/?employee_id=${empId}`);
    setRecords(res.data);
  };

  const submitAttendance = async () => {
    if (!form.employee || !form.date) {
      alert("Select employee and date");
      return;
    }

    await api.post("/attendance/", form);
    fetchAttendance(form.employee);
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Attendance Management</h2>

      <select
        value={form.employee}
        onChange={(e) => {
          setForm({ ...form, employee: e.target.value });
          fetchAttendance(e.target.value);
        }}
      >
        <option value="">Select Employee</option>
        {employees.map((e) => (
          <option key={e.id} value={e.id}>
            {e.full_name}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />

      <select
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      >
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
      </select>

      <button onClick={submitAttendance}>Mark Attendance</button>

      <h3 style={{ marginTop: "20px" }}>Attendance Records</h3>

        {records.length > 0 && (
        <p>
            <strong>Total Present Days:</strong>{" "}
            {records.filter(r => r.status === "Present").length}
        </p>
        )}

        {records.length === 0 ? (
        <p>No attendance records</p>
        ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.id}>
                <td>{r.date}</td>
                <td>{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
