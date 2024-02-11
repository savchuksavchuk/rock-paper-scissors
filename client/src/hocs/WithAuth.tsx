import { ReactNode } from 'react'
import { useAuth } from '../contexts/AuthContext/useAuth'
import { Navigate } from 'react-router-dom'

type WithAuthProps = {
  children: ReactNode
}

export const WithAuth = ({ children }: WithAuthProps) => {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" />
  }

  return children
}
