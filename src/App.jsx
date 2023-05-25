import { Suspense } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'

// import MainNavigation from '@/components/UIElements/Navigation/MainNavigation'
import { AuthContext } from '@/ontext/auth-context'
import { useAuth } from '@/hooks/auth-hook'
// import LoadingSpinner from './shared/components/UIElements/LoadingSpinner'

const Auth = React.lazy(() => import('@/pages/Auth'))

const App = () => {
  const { token, login, logout, userId } = useAuth()
  let routes

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId" exact>
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
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
      <ConfigProvider>
        <Router>
          <MainNavigation />
          <main>
            <Suspense
              fallback={
                <div className="center">{/* <LoadingSpinner /> */}</div>
              }
            >
              {routes}
            </Suspense>
          </main>
        </Router>
      </ConfigProvider>
    </AuthContext.Provider>
  )
}

export default App
