import { createContext } from 'react'
import { UserType } from '../../types/user'

export type AuthContextType = {
  user: UserType | null
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean }>
  login: (email: string, password: string) => Promise<{ success: boolean }>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
