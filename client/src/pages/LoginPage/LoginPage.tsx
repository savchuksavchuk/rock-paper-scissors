import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext/useAuth'

type LoginFormInputs = {
  email: string
  password: string
}

export const LoginPage = () => {
  const { login } = useAuth()
  const navigate = useNavigate()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormInputs>()

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    const { success } = await login(data.email, data.password)

    if (success) {
      navigate('/home')
    }
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full max-w-[400px] flex flex-col gap-3">
        <form
          className="flex flex-col gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Email is required!',
              pattern: {
                value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                message: 'Invalid email format!',
              },
            }}
            render={({ field }) => (
              <Input
                value={field.value}
                label="Email"
                onChange={field.onChange}
                placeholder="johndoe@mail.com"
                type="text"
                error={errors.email !== undefined}
                errorMessage={errors.email?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{
              required: 'Password is required!',
              minLength: {
                value: 8,
                message: 'Password must be at least 6 characters',
              },
              validate: (value) => {
                if (!/\d/.test(value)) {
                  return 'Email must contain at least one numeric digit'
                }
                return true
              },
            }}
            render={({ field }) => (
              <Input
                value={field.value}
                label="Password"
                onChange={field.onChange}
                type="password"
                error={errors.password !== undefined}
                errorMessage={errors.password?.message}
              />
            )}
          />
          <Button
            type="submit"
            text="Login"
            className="bg-green-500 border-green-600 w-full"
          />
        </form>
        <Button
          type="button"
          text="Sign Up"
          className="bg-blue-500 border-blue-600 w-full"
          onClick={() => navigate('/register')}
        />
      </div>
    </div>
  )
}
