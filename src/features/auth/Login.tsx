import { Link } from 'react-router-dom'
import TextField from 'components/TextField/TextField'
import PasswordField from 'components/PasswordField/PasswordField'
import Checkbox from 'components/Checkbox/Checkbox'
import Button from 'components/Button/Button'
import { useState } from 'react'
import AuthLayout from 'components/AuthLayout/AuthLayout'
import { useForm, Controller } from 'react-hook-form'
import { isValidEmail } from 'helpers/formValidation'
import { useLogin } from './authAPI'
import { toast } from 'react-toastify'

const Login = () => {
  type LoginFormData = {
    email: string
    password: string
  }
  const {
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<LoginFormData>({ mode: 'all' })
  const [rememberMe, setRememberMe] = useState(false)
  const { mutate: loginMutation, isLoading } = useLogin()
  const handleLogin = async (data: { email: string; password: string }) => {
    loginMutation(data, {
      onSuccess() {
        return toast.success('Logged in successfully')
      },
      onError(error: any) {
        toast.error(error.message)
      }
    })
  }

  const onSubmit = handleSubmit((data) => handleLogin(data))

  return (
    <AuthLayout>
      <h1 className="text-[28px] leading-8 font-bold text-center mb-10">
        Welcome
      </h1>
      <div className="w-full">
        <Controller
          name="email"
          rules={{
            required: 'Email Address is required',
            validate: isValidEmail
          }}
          control={control}
          render={({ field }) => (
            <TextField
              className="w-full"
              label="Email"
              hasErrors={!!errors?.email}
              error={errors?.email?.message as string}
              {...field}
            />
          )}
        />
      </div>
      <div className="w-full mt-4">
        <Controller
          name="password"
          rules={{ required: 'Password is required.' }}
          control={control}
          render={({ field }) => (
            <PasswordField
              className="w-full"
              label="Password"
              hasErrors={!!errors?.password}
              error={errors?.password?.message as string}
              {...field}
            />
          )}
        />
      </div>
      <div className="text-right mt-5">
        <Link to="#" className="text-main-3 text-sm font-bold">
          Forgot password?
        </Link>
      </div>

      <Checkbox
        checked={rememberMe}
        onChange={(e) => setRememberMe(e.target.checked)}
        label="Remember me?"
      />

      <div className="my-10">
        <Button
          label="Log in"
          className="w-full"
          size="md"
          type="submit"
          disabled={!isValid || isLoading }
          onClick={onSubmit}
          isLoading={isLoading}
        />
      </div>

      <div className="text-center">
        <span className="inline-block mr-2 text-base leading-5 text-gray-500">
          No account?
        </span>
        <Link to="#" className="text-main-3 text-sm font-bold">
          Signup
        </Link>
      </div>
    </AuthLayout>
  )
}

export default Login
