import { useState } from 'react'
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import {
  FaTachometerAlt, FaBell, FaChalkboardTeacher, FaBookOpen,
  FaImages, FaEnvelope, FaInfoCircle, FaBars, FaTimes,
  FaSignOutAlt, FaUser, FaExternalLinkAlt
} from 'react-icons/fa'

const navItems = [
  { to: '/admin/dashboard', icon: FaTachometerAlt, label: 'Dashboard' },
  { to: '/admin/notices',   icon: FaBell,             label: 'Notices' },
  { to: '/admin/faculty',   icon: FaChalkboardTeacher, label: 'Faculty' },
  { to: '/admin/courses',   icon: FaBookOpen,          label: 'Courses' },
  { to: '/admin/gallery',   icon: FaImages,            label: 'Gallery' },
  { to: '/admin/messages',  icon: FaEnvelope,          label: 'Messages' },
  { to: '/admin/about',     icon: FaInfoCircle,        label: 'About' },
]

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { admin, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/admin/login') }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-college-gold rounded-xl flex items-center justify-center text-college-navy font-heading font-bold">KN</div>
          <div>
            <p className="text-white font-heading font-bold text-sm leading-none">KN Singh College</p>
            <p className="text-gray-400 text-xs mt-0.5">Admin Panel</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive ? 'bg-college-gold text-college-navy shadow-sm' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`
            }>
            <Icon size={16} /> {label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-college-gold/20 rounded-full flex items-center justify-center"><FaUser className="text-college-gold" size={12} /></div>
          <div className="min-w-0">
            <p className="text-white text-xs font-medium truncate">{admin?.name}</p>
            <p className="text-gray-400 text-xs truncate">{admin?.email}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link to="/" target="_blank" className="flex-1 flex items-center justify-center gap-1 text-xs text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg transition">
            <FaExternalLinkAlt size={10} /> View Site
          </Link>
          <button onClick={handleLogout} className="flex-1 flex items-center justify-center gap-1 text-xs text-red-400 hover:text-white bg-red-500/10 hover:bg-red-500/20 px-3 py-2 rounded-lg transition">
            <FaSignOutAlt size={10} /> Logout
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-college-navy flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
            <motion.aside initial={{ x: -240 }} animate={{ x: 0 }} exit={{ x: -240 }} transition={{ type: 'tween', duration: 0.25 }}
              className="fixed top-0 left-0 h-full w-60 bg-college-navy z-40 lg:hidden flex flex-col">
              <button className="absolute top-4 right-4 text-gray-400 hover:text-white" onClick={() => setSidebarOpen(false)}><FaTimes /></button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 h-14 flex items-center px-4 gap-4 flex-shrink-0">
          <button className="lg:hidden p-2 text-gray-500 hover:text-college-navy" onClick={() => setSidebarOpen(true)}><FaBars /></button>
          <div className="flex-1" />
          <span className="text-sm text-gray-500 hidden sm:block">Welcome, <span className="font-medium text-college-navy">{admin?.name}</span></span>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
