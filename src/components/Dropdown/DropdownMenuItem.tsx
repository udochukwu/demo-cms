import React, { Fragment, ReactNode } from 'react'
import clsx from 'clsx'
import { Menu } from '@headlessui/react'
import { IconType } from 'react-icons'
import { Link } from 'react-router-dom'

interface DropdownMenuItemProps {
  className?: string
  icon?: string | IconType
  iconClassName?: string
  label?: ReactNode
  onClick?: () => void
  path?: string
}
const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({
  className,
  iconClassName,
  icon,
  label,
  onClick,
  path
}) => {
  return (
    <Menu.Item
      as={path ? Link : 'div'}
      {...(path ? { to: path } : { onClick })}
    >
      <span
        className={clsx(
          'flex items-center gap-3 p-3 cursor-pointer hover:bg-slate-100',
          className
        )}
      >
        {icon &&
          React.createElement(
            icon,
            {
              className: clsx('h-5 w-5 text-dark/80', iconClassName)
            },
            null
          )}
        {label && (
          <span className={clsx('text-dark/80 text-sm font-medium')}>
            {label}
          </span>
        )}
      </span>
    </Menu.Item>
  )
}

export default DropdownMenuItem
