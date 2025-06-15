// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

//  للمكونات اللي داخله (auth)بيغلف التطبيق أو جزء منه ويوفر بيانات السياق 
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  //Check localStorage when app loads: if data exsit => setUser, setToken
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'))
    const storedToken = localStorage.getItem('token')
    if (storedUser && storedToken) {
      setUser(storedUser)
      setToken(storedToken)
    }
  }, [])

  //Save to localStorage when token/user change
  useEffect(() => {
    if (token && user) {
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }, [token, user])

  //Login function
  const login = (userData, token) => {
    setUser(userData)
    setToken(token)
  }

  //Logout function
  const logout = () => {
    setUser(null)
    setToken(null)
  }

  return (


    // { user, token, login, logout }ونعطيه القيمة AuthContext.Providerبنرجع 
    // childrenعشان تكون متاحة لأي مكون داخل الـ 
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

//Hook to use AuthContext
//useAuth: value={{ user, token, login, logout }}بيرجع القيم ال حطتها ف
export const useAuth = () => useContext(AuthContext)
