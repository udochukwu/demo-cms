import React, { ChangeEvent, Ref, forwardRef } from 'react'
import clsx from 'clsx'

interface SelectProps {
  onChange?: (val: string) => void | null
  options: { label: string; value: string }[]
  value?: string | number
  className?: string
  label?: string
  secondaryLabel?: string
  hasErrors?: boolean
  error?: string
  disabled?: boolean
  showBorder?: boolean
  [key: string]: unknown
}
const Select: React.ForwardRefExoticComponent<SelectProps> = forwardRef(
  (
    {
      onChange = () => {},
      value,
      className,
      label,
      secondaryLabel,
      hasErrors = false,
      error,
      disabled,
      options,
      showBorder = true,
      ...rest
    },
    ref: Ref<HTMLInputElement>
  ) => {
    return (
      <div className={clsx(className)}>
        {label && (
          <label className="text-sm mb-2 block text-dark/80">{label}</label>
        )}
        {secondaryLabel && (
          <label className="text-xs mb-2 block text-dark/80">
            {secondaryLabel}
          </label>
        )}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={clsx(
            { 'border-2 border-gray-200': showBorder },
            'inline-block w-full py-2 px-4 rounded-md shadow-sm bg-white focus:ring-0 focus:outline-0 h-max min-h-[44px]'
          )}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    )
  }
)

Select.displayName = 'Select'

export default Select
