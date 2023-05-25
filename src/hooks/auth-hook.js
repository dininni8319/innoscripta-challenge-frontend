import { useState, useCallback, useEffect } from 'react'

let logoutTimer

export const useAuth = () => {
  const [tokenExpirationDate, setTokenExpirationDate] = useState()
  const [userData, setUserData] = useState({
    uid: '',
    token: '',
    email: '',
    name: '',
  })

  const login = useCallback((uid, token, email, name, expirationDate) => {
    setUserData((prevState) => ({
      ...prevState,
      uid: uid,
      token: token,
      email: email,
      name: name,
    }))
  
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60) // add one hour to the current date

    setTokenExpirationDate(tokenExpirationDate)
    localStorage.setItem(
      'user',
      JSON.stringify({
        uid: uid,
        token: token,
        email: email,
        name: name,
        // expiration: tokenExpirationToString
      })
    )
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('user')
    setTokenExpirationDate(null)
    setUserData({
      token: '',
      email: '',
      name: '',
      uid: ''
    })
  }, [])

  useEffect(() => {
    if (userData.token && tokenExpirationDate) {
      //tokenExpirationDate.getTime() time in millisecond sinze 1970
      const remainingTime = tokenExpirationDate.getTime() - new Date()
      logoutTimer = setTimeout(logout, remainingTime)
    } else {
      clearTimeout(logoutTimer)
    }
  }, [userData.token, logout, tokenExpirationDate])

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('user')) 
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration > new Date())
    ) {
      login(
        storedData.uid,
        storedData.token,
        storedData.email,
        storedData.name,
        new Date(storedData.expiration)
      )
    }
  }, [login]) //this function will run once, after the render cicle

  return {
    token: userData.token,
    login,
    logout,
    userId: userData.uid,
    name: userData.name
  }
}
