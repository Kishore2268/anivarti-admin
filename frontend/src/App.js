import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Clients from "./pages/Clients";
import InteractionLog from "./pages/InteractionLog";
import UserManagement from "./pages/UserManagement";

const App = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<ProtectedRoute roles={["admin", "superadmin"]}><Register /></ProtectedRoute>} />
      <Route path="/clients" element={<Clients />} />
      <Route path="/logs" element={<InteractionLog />} />
      <Route path="/users" element={<ProtectedRoute roles={["admin", "superadmin"]}><UserManagement /></ProtectedRoute>} />
    </Routes>
  </>
);

export default App;

