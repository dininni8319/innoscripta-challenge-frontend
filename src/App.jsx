import { Suspense } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes
} from 'react-router-dom'
// import MainNavigation from '@/components/UIElements/Navigation/MainNavigation'
import { AuthContext } from '@/context/auth-context'
import { useAuth } from '@/hooks/auth-hook'
import LoadingSpinner from '@/components/UIElements/Loader'
import Home from './pages/Home'
import Auth from '@/pages/Auth'


const App = () => {
  const { token, login, logout, userId } = useAuth()
  let routes

  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<Home />}/>
        {/* <Navigate to="/" replace /> */}
      </Routes>
    )
  } else {
    routes = (
      <Routes>
        <Route path="/auth" element={<Auth />} />
      </Routes>
    )
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        // name: userData.name,
        login: login,
        logout: logout
      }}
    >
      <Router>
        {/* <MainNavigation /> */}
        <main>
          <Suspense
            fallback={
              <div className="center"><LoadingSpinner /></div>
            }
          >
            {routes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
