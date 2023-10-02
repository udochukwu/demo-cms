import { IconType } from 'react-icons'

export type NavigationSection = {
  id: string | number
  title: string
  navigationItems: NavigationItem[]
}

export type NavigationItem = {
  id: string | number
  label: string
  path: string
  icon?: string | IconType
}
