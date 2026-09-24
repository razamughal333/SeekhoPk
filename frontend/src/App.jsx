import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';

import Home from './pages/Home';
import CourseListing from './pages/CourseListing';
import CourseDetail from './pages/CourseDetail';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

import StudentDashboard from './pages/dashboards/StudentDashboard';
import InstructorDashboard from './pages/dashboards/InstructorDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import CourseForm from './pages/dashboards/CourseForm';
import LessonManager from './pages/dashboards/LessonManager';
import CourseLearn from './pages/CourseLearn';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<CourseListing />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard/student"
          element={
            <ProtectedRoute roles={['student']}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/instructor"
          element={
            <ProtectedRoute roles={['instructor', 'admin']}>
              <InstructorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/instructor/courses/new"
          element={
            <ProtectedRoute roles={['instructor', 'admin']}>
              <CourseForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses/:id/edit"
          element={
            <ProtectedRoute roles={['instructor', 'admin']}>
              <CourseForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/instructor/courses/:id/lessons"
          element={
            <ProtectedRoute roles={['instructor', 'admin']}>
              <LessonManager />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses/:id/learn"
          element={
            <ProtectedRoute roles={['student']}>
              <CourseLearn />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute roles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}
