import { useState, useCallback, useEffect } from 'react'

export const useAuth = () => {
  const [userData, setUserData] = useState({
    uid: '',
    token: '',
    email: '',
    name: ''
  })

  const login = useCallback((uid, token, email, name) => {
    setUserData((prevState) => ({
      ...prevState,
      uid: uid,
      token: token,
      email: email,
      name: name
    }))

    localStorage.setItem(
      'user',
      JSON.stringify({
        uid: uid,
        token: token,
        email: email,
        name: name
  
      })
    )
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('user')
    setUserData({
      token: '',
      email: '',
      name: '',
      uid: ''
    })
  }, [])

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('user'))
  
    if (
      storedData &&
      storedData.token 
    ) {
      login(
        storedData.uid,
        storedData.token,
        storedData.email,
        storedData.name,
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
