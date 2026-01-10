import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const authToken = localStorage.getItem('adminAuthToken')
    const authExpiry = localStorage.getItem('adminAuthExpiry')
    
    if (authToken && authExpiry) {
      const now = new Date().getTime()
      if (now < parseInt(authExpiry)) {
        setIsAuthenticated(true)
      } else {
        // Token expired, clear it
        localStorage.removeItem('adminAuthToken')
        localStorage.removeItem('adminAuthExpiry')
      }
    }
    setIsLoading(false)
  }, [])

  const login = (password) => {
    // Default admin password (can be changed)
    // In a real app, this would be verified on the backend
    const adminPassword = localStorage.getItem('adminPassword') || 'admin123'
    
    if (password === adminPassword) {
      const token = 'admin_' + Date.now()
      const expiry = new Date().getTime() + 24 * 60 * 60 * 1000 // 24 hours
      
      localStorage.setItem('adminAuthToken', token)
      localStorage.setItem('adminAuthExpiry', expiry.toString())
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem('adminAuthToken')
    localStorage.removeItem('adminAuthExpiry')
    setIsAuthenticated(false)
  }

  const changePassword = (oldPassword, newPassword) => {
    const adminPassword = localStorage.getItem('adminPassword') || 'admin123'
    
    if (oldPassword === adminPassword) {
      localStorage.setItem('adminPassword', newPassword)
      return true
    }
    return false
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        login,
        logout,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

