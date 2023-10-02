import React, { MouseEvent } from 'react'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'
interface TabButtonProps {
  label: string
  className?: string
  active?: boolean
  tag?: React.ReactNode
  to?: string
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void | null
}
const TabButton: React.FC<TabButtonProps> = ({
  className,
  active,
  tag,
  label,
  to,
  onClick = () => {}
}) => {
  const navigate = useNavigate()

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (to) {
      navigate(to)
    } else {
      onClick(event)
    }
  }
  return (
    <button
      className={clsx(
        { 'border-main-3': active },
        { 'border-transparent': !active },
        'flex gap-2 items-center text-dark/80 text-sm px-4 py-2 border-b-4',
        className
      )}
      onClick={handleClick}
    >
      <span className={clsx({ 'font-bold text-main-3': active })}>{label}</span>
      {tag && (
        <span className="bg-main-1 h-5 w-5 flex items-center justify-center text-white text-xs rounded-full">
          {tag}
        </span>
      )}
    </button>
  )
}

export default TabButton
