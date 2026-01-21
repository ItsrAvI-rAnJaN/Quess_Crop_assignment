import { useEffect, useState } from "react";
import api from "../services/api";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  const fetchEmployees = async () => {
    const res = await api.get("/employees/");
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const submit = async () => {
    await api.post("/employees/", form);
    setForm({ employee_id: "", full_name: "", email: "", department: "" });
    fetchEmployees();
  };

  const remove = async (id) => {
    await api.delete(`/employees/${id}/`);
    fetchEmployees();
  };

  return (
    <div>
      <h2>Employees</h2>

      <input placeholder="Employee ID" value={form.employee_id}
        onChange={e => setForm({...form, employee_id: e.target.value})} />

      <input placeholder="Name" value={form.full_name}
        onChange={e => setForm({...form, full_name: e.target.value})} />

      <input placeholder="Email" value={form.email}
        onChange={e => setForm({...form, email: e.target.value})} />

      <input placeholder="Department" value={form.department}
        onChange={e => setForm({...form, department: e.target.value})} />

      <button onClick={submit}>Add</button>

      <ul>
        {employees.map(e => (
          <li key={e.id}>
            {e.full_name} ({e.department})
            <button onClick={() => remove(e.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
