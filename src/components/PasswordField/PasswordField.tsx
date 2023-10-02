import React, { ChangeEvent, Ref, forwardRef, useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import clsx from 'clsx'

interface PasswordFieldProps {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void | null
  value?: string | number
  className?: string
  label?: string
  hasErrors?: boolean
  error?: string
  disabled?: boolean
  [key: string]: unknown
}
const PasswordField: React.ForwardRefExoticComponent<
  PasswordFieldProps
> = forwardRef(
  (
    {
      onChange = () => {},
      value,
      className,
      label,
      hasErrors = false,
      error,
      disabled,
      ...rest
    },
    ref: Ref<HTMLInputElement>
  ) => {
    const [show, setShow] = useState(false)
    return (
      <div className={clsx('relative', className)}>
        {label && (
          <label className="text-sm mb-2 inline-block text-dark/80">
            {label}
          </label>
        )}
        <div className={clsx('relative')}>
          <input
            className={clsx(
              'rounded px-4 py-2 text-base border-2 border-gray-200 focus:ring-0  focus:outline-none  w-full text-dark ring-0',
              { 'border border-red-800': hasErrors }
            )}
            type={show ? 'text' : 'password'}
            onChange={onChange}
            disabled={disabled}
            value={value}
            {...rest}
          />
          <div className="absolute right-0 top-[50%] translate-y-[-50%] mr-4 text-gray-500 cursor-pointer">
            {show ? (
              <AiOutlineEyeInvisible
                className="h-5 w-5"
                onClick={() => setShow(false)}
              />
            ) : (
              <AiOutlineEye className="h-5 w-5" onClick={() => setShow(true)} />
            )}
          </div>
        </div>
        {!disabled && hasErrors && (
          <span className={clsx('mt-1 block text-sm text-red-800')}>
            {error}
          </span>
        )}
      </div>
    )
  }
)
PasswordField.displayName = 'PasswordField'

export default PasswordField
