import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "../pages/Login";
import DashboardPage  from "../pages/Dashboard";
import { ProtectedRoute } from "../components/ProtectedRoute";

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          {/* outras rotas protegidas aqui */}
        </Route>
      </Routes>
    </Router>
  );
}