import { ReactNode, useState } from 'react'
import { AuthContext } from './AuthContext'
import { UserType } from '../../types/user'
import { AuthService } from '../../services/AuthService'

export type AuthContextProviderType = {
  children: ReactNode
}

export const AuthContextProvider = ({ children }: AuthContextProviderType) => {
  const [user, setUser] = useState<UserType | null>(null)

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await AuthService.registration(username, email, password)

      const { user, token } = response.data

      sessionStorage.setItem('token', token)

      setUser(user)
      return {
        success: true,
      }
    } catch (e) {
      console.log(e)
      return {
        success: false,
      }
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await AuthService.login(email, password)

      const { user, token } = response.data

      sessionStorage.setItem('token', token)

      setUser(user)
      return {
        success: true,
      }
    } catch (e) {
      console.log(e)
      return {
        success: false,
      }
    }
  }

  const contextValue = {
    user,
    register,
    login,
  }
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
