import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

export default function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({
    employee: "",
    date: "",
    status: "Present",
  });

  useEffect(() => {
    api.get("/employees/")
      .then(res => setEmployees(res.data))
      .catch(() => toast.error("Failed to load employees"));
  }, []);

  const fetchAttendance = async (empId) => {
    try {
      const res = await api.get(`/attendance/?employee_id=${empId}`);
      setRecords(res.data);
    } catch {
      toast.error("Failed to fetch attendance");
    }
  };

  const submitAttendance = async () => {
    // frontend safety check
    if (!form.employee || !form.date) {
      toast.error("Employee and date are required");
      return;
    }

    try {
      await api.post("/attendance/", form);

      toast.success("Attendance marked successfully ✅");

      fetchAttendance(form.employee);

    } catch (err) {
      const errors = err.response?.data;

      if (errors) {
        Object.keys(errors).forEach((field) => {
          errors[field].forEach((message) => {
            toast.error(`${field}: ${message}`);
          });
        });
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="card">
      <h2>Attendance</h2>

      <div className="form-grid">
        <select
          value={form.employee}
          onChange={(e) => {
            setForm({ ...form, employee: e.target.value });
            if (e.target.value) {
              fetchAttendance(e.target.value);
            } else {
              setRecords([]);
            }
          }}
        >
          <option value="">Select Employee</option>
          {employees.map(e => (
            <option key={e.id} value={e.id}>
              {e.full_name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={form.date}
          onChange={e => setForm({ ...form, date: e.target.value })}
        />

        <select
          value={form.status}
          onChange={e => setForm({ ...form, status: e.target.value })}
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>

        <button onClick={submitAttendance}>Mark</button>
      </div>

      {records.length > 0 && (
        <p>
          <strong>Total Present:</strong>{" "}
          {records.filter(r => r.status === "Present").length}
        </p>
      )}

      {records.length === 0 ? (
        <p>No attendance records</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map(r => (
              <tr key={r.id}>
                <td>{r.date}</td>
                <td
                  className={
                    r.status === "Present"
                      ? "badge-present"
                      : "badge-absent"
                  }
                >
                  {r.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}