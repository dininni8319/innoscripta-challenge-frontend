import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '@/context/auth-context'

// middleware for the protected route
const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext)
 
  if (token) {
    return children
  } else {
    return <Navigate to="/login" />
  }
}

export default ProtectedRoute
