import React from 'react'
import clsx from 'clsx'
import logoUrl from './logo-light.png'
interface LogoProps {
  className?: string
}
const Logo: React.FC<LogoProps> = ({ className }) => {
  return <img className={clsx('relative', className)} src={logoUrl} />
}

export default Logo
