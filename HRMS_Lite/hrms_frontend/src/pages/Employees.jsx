import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

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
    try {
      await api.post("/employees/", form);

      toast.success("Employee added successfully ✅");

      // reload page after short delay
      setTimeout(() => {
        window.location.reload();
      }, 1500);

    } catch (err) {
      const errors = err.response?.data;

      if (errors) {
        // Loop over backend error object
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

  const remove = async (id) => {
    await api.delete(`/employees/${id}/`);
    fetchEmployees();
  };

  return (
    <div className="card">
      <h2>Employees</h2>

      <div className="form-grid">
        <input
          placeholder="Employee ID"
          value={form.employee_id}
          onChange={(e) =>
            setForm({ ...form, employee_id: e.target.value })
          }
        />

        <input
          placeholder="Full Name"
          value={form.full_name}
          onChange={(e) =>
            setForm({ ...form, full_name: e.target.value })
          }
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          placeholder="Department"
          value={form.department}
          onChange={(e) =>
            setForm({ ...form, department: e.target.value })
          }
        />
      </div>

      <button onClick={submit}>Add Employee</button>

      <table className="table" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {employees.map((e) => (
            <tr key={e.id}>
              <td>{e.employee_id}</td>
              <td>{e.full_name}</td>
              <td>{e.department}</td>
              <td>{e.email}</td>
              <td>
                <button onClick={() => remove(e.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}