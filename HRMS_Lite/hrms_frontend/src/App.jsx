import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>HRMS Lite</h1>

      <Employees />
      <Attendance />
    </div>
  );
}

export default App;
