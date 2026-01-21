import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";

function App() {
  return (
    <div style={{ maxWidth: "1100px", margin: "auto", padding: "30px" }}>
      <h1>HRMS Lite</h1>
      <Employees />
      <Attendance />
    </div>
  );
}
export default App;