import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '@/context/auth-context'

// middleware for the protected route
const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext)
  const navigate = useNavigate()
  if (token) {
    return children
  } else {
    navigate("/login")
  }
}

export default ProtectedRoute
