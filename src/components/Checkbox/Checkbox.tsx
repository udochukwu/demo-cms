import React, { ChangeEvent, useId } from 'react'
import clsx from 'clsx'
import { BiCheck } from 'react-icons/bi'

interface CheckboxProps {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void | null
  checked: boolean
  className?: string
  label?: string
  [key: string]: unknown
}

const Checkbox: React.FC<CheckboxProps> = ({
  onChange = () => {},
  checked,
  className,
  label,
  ...rest
}) => {
  const uniqueId = useId()
  return (
    <div className={clsx('flex items-center', className)} {...rest}>
      <input
        type="checkbox"
        id={uniqueId}
        className="hidden"
        checked={checked}
        onChange={onChange}
      />
      <label
        htmlFor={uniqueId}
        className={clsx(
          'flex h-5 w-5 cursor-pointer items-center justify-center rounded border checked:bg-main-3 border-dark transition duration-300 mr-2',
          checked && 'bg-main-3 border-main-3'
        )}
      >
        {checked && <BiCheck className="text-white" />}
      </label>
      {label && <span className="text-sm text-dark">{label}</span>}
    </div>
  )
}

export default Checkbox
