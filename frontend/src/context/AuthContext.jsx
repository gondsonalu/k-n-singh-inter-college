import { createContext, useContext, useState, useEffect } from 'react'
import API from '../utils/api'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const stored = localStorage.getItem('admin')
    if (token && stored) {
      setAdmin(JSON.parse(stored))
      API.get('/auth/me')
        .then(res => setAdmin(res.data.admin))
        .catch(() => { localStorage.removeItem('token'); localStorage.removeItem('admin') })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    const res = await API.post('/auth/login', { email, password })
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('admin', JSON.stringify(res.data.admin))
    setAdmin(res.data.admin)
    return res.data
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('admin')
    setAdmin(null)
  }

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
