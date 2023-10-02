import React from 'react'
import clsx from 'clsx'
interface TemplateProps {
  className?: string
}
const Template: React.FC<TemplateProps> = ({ className }) => {
  return <span className={clsx(className)}>Starter Template </span>
}

export default Template
