import React, { RefObject, MouseEvent, ReactElement } from 'react'
import clsx from 'clsx'
import { FaSpinner as SpinnerIcon } from 'react-icons/fa'
import { IconType } from 'react-icons'
enum ButtonSize {
  'xs',
  'sm',
  'md'
}

interface ButtonProps {
  label?: string
  size?: 'xs' | 'sm' | 'md'
  appearance?: 'primary' | 'outline' | 'basic'
  icon?: string | IconType
  iconPosition?: 'left' | 'right'
  onClick?: (event: MouseEvent<HTMLButtonElement>) => any
  isLoading?: boolean
  className?: string
  iconClassName?: string
  mRef?: RefObject<HTMLButtonElement> | null
  disabled?: boolean
  [key: string]: unknown
}
const Button: React.FC<ButtonProps> = ({
  label = '',
  size = 'xs',
  appearance = 'primary',
  icon = null,
  iconPosition = 'left',
  onClick = () => {},
  isLoading = false,
  disabled,
  className,
  iconClassName,
  ...rest
}) => {
  const clsSpinnerSize = {
    [ButtonSize.xs]: 'h-2 w-2',
    [ButtonSize.sm]: 'h-3 w-3',
    [ButtonSize.md]: 'h-4 w-4'
  }
  const clsButtonSpacing = {
    xs: 'px-4 h-9 py-2.5 text-xs font-medium',
    sm: 'px-4 h-10 text-sm font-medium',
    md: 'px-[1.40625rem] h-10 text-md font-medium'
  }

  const clsButtonAppearance = {
    primary:
      'border-transparent bg-main-3 text-white hover:bg-main-2 active:bg-main-2',
    outline: 'border-2 border-main-4 text-main-3 hover:border-main-3',
    basic: 'text-main-1 hover:text-main-2 bg-transparent border-0 px-0'
  }

  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded border',
        clsButtonSpacing[size],
        clsButtonAppearance[appearance],
        { '!bg-main-4': disabled && appearance === 'primary' },
        { 'cursor-not-allowed': disabled },
        className
      )}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      <>
        {icon &&
          iconPosition === 'left' &&
          React.createElement(
            icon,
            {
              className: clsx('mr-1', iconClassName)
            },
            null
          )}
        {isLoading && (
          <SpinnerIcon
            className={clsx(clsSpinnerSize, '-ml-1 mr-2 animate-spin')}
          />
        )}
        {label}
        {icon &&
          iconPosition === 'right' &&
          React.createElement(
            icon,
            {
              className: clsx('ml-1', iconClassName)
            },
            null
          )}
      </>
    </button>
  )
}

Button.displayName = 'Button'

export default Button
