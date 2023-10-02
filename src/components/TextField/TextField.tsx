import React, { ChangeEvent, Ref, forwardRef, useState } from 'react'
import clsx from 'clsx'

interface TextFieldProps {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void | null
  value?: string | number
  className?: string
  type?: string
  label?: string
  placeholder?: string
  secondaryLabel?: string
  hasErrors?: boolean
  error?: string
  disabled?: boolean
  maxCharacters?: number
  readOnly?: boolean
  [key: string]: unknown
}
const TextField: React.ForwardRefExoticComponent<TextFieldProps> = forwardRef(
  (
    {
      onChange = () => {},
      value,
      className,
      label,
      placeholder,
      type = 'text',
      secondaryLabel,
      hasErrors = false,
      error,
      disabled,
      maxCharacters,
      readOnly,
      ...rest
    },
    ref: Ref<HTMLInputElement>
  ) => {
    const [characterCount, setCharacterCount] = useState(
      value ? String(value).length : 0
    )

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value

      if (
        typeof inputValue === 'string' &&
        maxCharacters &&
        inputValue.length > maxCharacters
      ) {
        const truncatedInput = inputValue.slice(0, maxCharacters)
        event.target.value = truncatedInput

        setCharacterCount(maxCharacters)

        return
      }

      setCharacterCount(inputValue.length)

      onChange(event)
    }

    return (
      <div className={clsx('relative', className)}>
        {label && (
          <label className="text-sm mb-2 inline-block text-dark/80">
            {label}
          </label>
        )}
        {secondaryLabel && (
          <span className="text-xs mb-2 block text-dark/80">
            {secondaryLabel}
          </span>
        )}
        <div className={clsx('relative')}>
          <input
            className={clsx(
              'rounded px-4 py-2 text-base border border-gray-200 focus:ring-0  focus:outline-none  w-full text-dark ring-0',
              { 'border border-red-800': hasErrors },
              { 'bg-gray-25': readOnly || disabled }
            )}
            type={type}
            onChange={handleInputChange}
            placeholder={placeholder}
            value={value}
            readOnly={readOnly || disabled}
            {...rest}
          />
        </div>
        {!disabled && hasErrors && (
          <span className={clsx('mt-1 block text-sm text-red-800')}>
            {error}
          </span>
        )}
        {maxCharacters && (
          <span className={clsx('mt-1 text-sm text-gray-400 flex justify-end')}>
            {characterCount}/{maxCharacters}
          </span>
        )}
      </div>
    )
  }
)

TextField.displayName = 'TextField'

export default TextField
