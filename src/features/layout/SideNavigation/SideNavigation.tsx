import React from 'react'

import { Link, useLocation } from 'react-router-dom'
import Logo from 'components/Logo'
import { SlLogout } from 'react-icons/sl'
import { FiUsers } from 'react-icons/fi'
import { BsShop } from 'react-icons/bs'
import { MdProductionQuantityLimits } from 'react-icons/md'
import { HiOutlineClipboardList } from 'react-icons/hi'
import { TbDeviceAnalytics } from 'react-icons/tb'
import { NavigationSection } from './types'
import clsx from 'clsx'
import useCurrentUser from 'features/auth/hooks/useCurrentUser'

type SideNavigationProps = {
  show: boolean
  hideSidebar: () => void
}
const SideNavigation: React.FC<SideNavigationProps> = ({
  show,
  hideSidebar
}) => {
  const location = useLocation()
  const { user } = useCurrentUser()
  const navigationSections: NavigationSection[] = [
    {
      id: 'user_m',
      title: 'User management',
      navigationItems: [
        {
          id: 'users',
          icon: FiUsers,
          label: 'users',
          path: '/users'
        },
        {
          id: 'roles',
          icon: FiUsers,
          label: 'roles',
          path: '/roles'
        }
      ]
    },
    {
      id: 'inventory_management',
      title: 'inventory management',
      navigationItems: [
        {
          id: 'products',
          icon: MdProductionQuantityLimits,
          label: 'products management',
          path: '/products'
        },
        {
          id: 'catalogue',
          icon: MdProductionQuantityLimits,
          label: 'catalogue',
          path: '/catalogue'
        },
      ]
    },
    {
      id: 'other',
      title: 'Loan Management',
      navigationItems: [
        {
          id: 'loans',
          icon: BsShop,
          label: 'loan processing',
          path: '/loans'
        },
        {
          id: 'onboarding',
          icon: TbDeviceAnalytics,
          label: 'agent onboarding',
          path: '/sales-agents'
        },
      ]
    }
  ]

  return (
    <aside
      className={clsx(
        { block: show },
        { hidden: !show },
        'fixed top-0 z-30 h-screen w-64 bg-main-2 rounded-tr-2xl lg:block ease-in-out duration-300'
      )}
    >
      <div className="h-10 w-full text-white p-4">
        <SlLogout className="cursor-pointer" onClick={hideSidebar} />
      </div>
      <div className="pl-2 pr-4 py-2 border-b border-main-1">
        <Link to="/" className="">
          <Logo className="w-36" />
        </Link>
      </div>
      <div
        className={clsx('p-4 border-b border-main-1', {
          'bg-main-1': location.pathname === '/profile'
        })}
      >
        {/* Avatar Component */}
        <Link to="/profile">
          <div className="flex gap-2">
            <div className="rounded-full h-12 w-12 min-h-[48px] min-w-[48px] bg-main-4 flex justify-center items-center text-lg font-medium text-main-1">
              NN
            </div>
            <div>
              <span className="font-medium text-sm text-main-5 leading-5 inline-flex">
                {user?.firstname} {user?.lastname}
              </span>
              <span className="font-normal text-xs text-main-5 leading-4 inline-flex">
                Super Administrator
              </span>
            </div>
          </div>
        </Link>
        {/* End Avatar Component */}
      </div>

      <ul>
        {navigationSections?.map((navigationSection) => (
          <div key={navigationSection.id}>
            <li
              key={navigationSection.id}
              className="px-4 text-white text-[10px] py-8 uppercase opacity-70 font-semibold tracking-widest"
            >
              {navigationSection.title}
            </li>
            {navigationSection?.navigationItems?.map((navigationItem) => (
              <li
                className={clsx('px-4 hover:bg-main-1', {
                  'bg-main-1': location.pathname === navigationItem.path
                })}
                key={navigationItem.id}
              >
                <Link to={navigationItem.path} className="flex py-2 px-1 gap-4">
                  {navigationItem.icon &&
                    React.createElement(
                      navigationItem.icon,
                      {
                        className: clsx('h-4 w-4 text-main-4')
                      },
                      null
                    )}
                  <span className="text-white text-sm capitalize">
                    {navigationItem.label}
                  </span>
                </Link>
              </li>
            ))}
          </div>
        ))}
      </ul>
    </aside>
  )
}

export default SideNavigation
