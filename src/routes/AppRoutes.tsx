import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "../pages/login/Login";
import DashboardPage from "../pages/dashboard/Dashboard";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { Layout } from "../layouts/Layout";
import StudentsPage from "../pages/students/Student";
import TeachersPage from "../pages/teacher/Teacher";
import SubjectsPage from "../pages/subject/Subject";
import SubjectDetailPage from '../pages/subject/SubjectDetail';
import PermissionListPage from "@/pages/permissions/PermissionList";
import PermissionFormPage from "@/pages/permissions/PermissionForm";
import ProfileListPage from "@/pages/profile/ProfileList";
import ProfileFormPage from "@/pages/profile/ProfileForm";

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/student" element={<StudentsPage />} />
            <Route path="/teacher" element={<TeachersPage />} />
            <Route path="/subject" element={<SubjectsPage />} />
            <Route path="/subject/:id" element={<SubjectDetailPage />} />
            <Route path="/permissions" element={<PermissionListPage />} />
            <Route path="/permissions/new" element={<PermissionFormPage />} />
            <Route path="/profiles" element={<ProfileListPage />} />
            <Route path="/profiles/new" element={<ProfileFormPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

