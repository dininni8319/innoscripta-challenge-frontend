import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainNavigation from '@/components/UIElements/Navigation/MainNavigation'
import { AuthContext } from '@/context/auth-context'
import { useAuth } from '@/hooks/auth-hook'
import Home from './pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import ArticleDetail from '@/pages/ArticleDetail'
import PrivateRoute from './PrivateRoute'

const App = () => {
  const { token, login, logout, userId, name } = useAuth()
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        name: name,
        login: login,
        logout: logout
      }}
    >
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/article/:slag"
            element={
              <>
                <MainNavigation />
                <ArticleDetail />
              </>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <MainNavigation />
                <Home />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
