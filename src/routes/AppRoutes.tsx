
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { Layout } from "../layouts/Layout";
import { Spinner } from "@/components/ui/spinner";

const LoginPage = lazy(() => import("../pages/login/Login"));
const DashboardPage = lazy(() => import("../pages/dashboard/Dashboard"));
const StudentsPage = lazy(() => import("../pages/students/Student"));
const TeachersPage = lazy(() => import("../pages/teacher/Teacher"));
const SubjectsPage = lazy(() => import("../pages/subject/Subject"));
const SubjectDetailPage = lazy(() => import("../pages/subject/SubjectDetail"));
const PermissionListPage = lazy(() => import("@/pages/permissions/PermissionList"));
const PermissionFormPage = lazy(() => import("@/pages/permissions/PermissionForm"));
const ProfileListPage = lazy(() => import("@/pages/profile/ProfileList"));
const ProfileFormPage = lazy(() => import("@/pages/profile/ProfileForm"));
const SelectUnitPage = lazy(() => import("@/pages/login/SelectUnitPage"));
const UserListPage = lazy(() => import("@/pages/user/UserList"));
const UserFormPage = lazy(() => import("@/pages/user/UserForm"));
const SubjectListPage = lazy(() => import("@/pages/subject/SubjectList"));
const SubjectFormPage = lazy(() => import("@/pages/subject/SubjectForm"));
const CourseListPage = lazy(() => import("@/pages/course/CourseList"));
const CourseFormPage = lazy(() => import("@/pages/course/CourseForm"));
const ClassAssignmentListPage = lazy(() => import("@/pages/class/ClassAssignmentList"));
const ClassAssignmentFormPage = lazy(() => import("@/pages/class/ClassAssignmentForm"));


export function AppRoutes() {
  return (
    <Router>
      <Suspense fallback={<Spinner />}>
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
            <Route path="/class-assignment" element={<ClassAssignmentListPage />} />
            <Route path="/class-assignment/new" element={<ClassAssignmentFormPage />} />
            <Route path="/class-assignment/:id" element={<ClassAssignmentFormPage />} />
          </Route>
        </Route>
      </Routes>
      </Suspense>
    </Router>
  );
}

