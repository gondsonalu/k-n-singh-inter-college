import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './context/AuthContext'
import { useState, useEffect } from 'react'

// 🔥 Loader import
import PageLoader from './components/public/PageLoader'

// Public pages
import PublicLayout from './components/public/PublicLayout'
import HomePage from './pages/public/HomePage'
import AboutPage from './pages/public/AboutPage'
import CoursesPage from './pages/public/CoursesPage'
import FacultyPage from './pages/public/FacultyPage'
import FacilitiesPage from './pages/public/FacilitiesPage'
import GalleryPage from './pages/public/GalleryPage'
import NoticesPage from './pages/public/NoticesPage'
import ContactPage from './pages/public/ContactPage'

// Admin pages
import AdminLayout from './components/admin/AdminLayout'
import LoginPage from './pages/admin/LoginPage'
import DashboardPage from './pages/admin/DashboardPage'
import AdminNotices from './pages/admin/AdminNotices'
import AdminFaculty from './pages/admin/AdminFaculty'
import AdminCourses from './pages/admin/AdminCourses'
import AdminGallery from './pages/admin/AdminGallery'
import AdminMessages from './pages/admin/AdminMessages'
import AdminAbout from './pages/admin/AdminAbout'

// 🔐 Protected Route
const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return admin ? children : <Navigate to="/admin/login" replace />
}

export default function App() {
  const [loading, setLoading] = useState(true)

  // 🔥 Page Loader Timer
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* 🔥 Loader */}
      {loading && <PageLoader />}

      <AuthProvider>
        <BrowserRouter>

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '14px',
                background: '#020617',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.1)'
              }
            }}
          />

          <Routes>

            {/* 🌐 Public */}
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="courses" element={<CoursesPage />} />
              <Route path="faculty" element={<FacultyPage />} />
              <Route path="facilities" element={<FacilitiesPage />} />
              <Route path="gallery" element={<GalleryPage />} />
              <Route path="notices" element={<NoticesPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Route>

            {/* 🔐 Admin */}
            <Route path="/admin/login" element={<LoginPage />} />

            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="notices" element={<AdminNotices />} />
              <Route path="faculty" element={<AdminFaculty />} />
              <Route path="courses" element={<AdminCourses />} />
              <Route path="gallery" element={<AdminGallery />} />
              <Route path="messages" element={<AdminMessages />} />
              <Route path="about" element={<AdminAbout />} />
            </Route>

            {/* ❌ 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}