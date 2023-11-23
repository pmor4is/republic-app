import "./App.css";
import { AppRoutes } from "./routes/Routes";
import { Sidebar } from "./components/Sidebar/Sidebar";

function App() {
  return (
    <div className="AppBody">
      <Sidebar />
      <div className="AppContent">

        <AppRoutes />
      </div>
    </div>
  );
}

export default App;
