import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "../pages/login/Login";
import DashboardPage from "../pages/dashboard/Dashboard";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { Layout } from "../layouts/Layout";
import StudentsPage from "../pages/students/Student";
import TeachersPage from "../pages/teacher/Teacher";
import SubjectsPage from "../pages/subject/Subject";
import SubjectDetailPage from '../pages/dashboard/SubjectDetail';

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/student" element={<StudentsPage />} />
            <Route path="/teacher" element={<TeachersPage />} />
            <Route path="/subject" element={<SubjectsPage />} />
            <Route path="/subject/:id" element={<SubjectDetailPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

