import type { StoryObj } from '@storybook/react'

import AuthLayout from './AuthLayout'
import TextField from 'components/TextField/TextField'
import PasswordField from 'components/PasswordField/PasswordField'
import Button from 'components/Button/Button'
import Checkbox from 'components/Checkbox/Checkbox'
import { useState } from 'react'

const meta = {
  title: 'Inputs/AuthLayout',
  component: AuthLayout,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof AuthLayout>

const Login = () => {
  const [rememberMe, setRememberMe] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <>
      <h1 className="text-[28px] leading-8 font-bold text-center mb-10">
        Welcome
      </h1>
      <div className="w-full">
        <TextField
          className="w-full"
          value={email}
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="w-full mt-4">
        <PasswordField
          className="w-full"
          value={password}
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="text-right mt-5">
        <span className="text-main-3 text-sm font-bold">Forgot password?</span>
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
          disabled={!email || !password}
          onClick={() => {}}
        />
      </div>
      <div className="text-center">
        <span className="inline-block mr-2 text-base leading-5 text-gray-500">
          No account?
        </span>
        <span className="text-main-3 text-sm font-bold">Signup</span>
      </div>
    </>
  )
}
export const Default: Story = {
  args: {
    children: <Login />
  }
}
