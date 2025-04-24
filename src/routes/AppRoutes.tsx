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
import { SelectUnitPage } from "@/pages/login/SelectUnitPage";
import UserListPage from "@/pages/user/UserList";
import UserFormPage from "@/pages/user/UserForm";
import SubjectListPage from "@/pages/subject/SubjectList";
import SubjectFormPage from "@/pages/subject/SubjectForm";
import CourseListPage from "@/pages/course/CourseList";
import CourseFormPage from "@/pages/course/CourseForm";

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/select-unit" element={<SelectUnitPage />} />

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
            <Route path="/profiles/:id" element={<ProfileFormPage />} />
            <Route path="/users" element={<UserListPage />} />
            <Route path="/users/new" element={<UserFormPage />} />
            <Route path="/users/edit" element={<UserFormPage />} />
            <Route path="/subjects" element={<SubjectListPage />} />
            <Route path="/subjects/new" element={<SubjectFormPage />} />
            <Route path="/subjects/:id" element={<SubjectFormPage />} />
            <Route path="/course" element={<CourseListPage />} />
            <Route path="/course/new" element={<CourseFormPage />} />
            <Route path="/course/:id" element={<CourseFormPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

