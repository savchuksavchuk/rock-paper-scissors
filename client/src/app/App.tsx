import { AuthContextProvider } from '../contexts/AuthContext/AuthContextProvider'
import { GameContextProvider } from '../contexts/GameContext/GameContextProvider'
import { WithAuth } from '../hocs/WithAuth'
import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

function App() {
  const router = createBrowserRouter([
    { path: '*', element: <LoginPage /> },
    {
      path: '/login',
      element: <LoginPage />,
    },
    { path: '/register', element: <RegisterPage /> },
    {
      path: '/home',
      element: (
        <WithAuth>
          <HomePage />
        </WithAuth>
      ),
    },
  ])

  return (
    <AuthContextProvider>
      <GameContextProvider>
        <RouterProvider router={router} />
      </GameContextProvider>
    </AuthContextProvider>
  )
}

export default App
