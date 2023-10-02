import React from 'react'
import clsx from 'clsx'
import { FaSpinner } from 'react-icons/fa'
interface LoaderProps {
  className?: string
}
const Loader: React.FC<LoaderProps> = ({ className }) => {
  return <FaSpinner className={clsx('animate-spin duration-300', className)} />
}

export default Loader
