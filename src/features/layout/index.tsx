import { Outlet, useLocation } from 'react-router-dom'
import SideNavigation from './SideNavigation'
import Header from './Header'
import { useEffect, useState } from 'react'

const Layout = () => {
  const [showSidebar, setShowSidebar] = useState(true)
  const displaySidebar = () => setShowSidebar(true)
  const hideSidebar = () => setShowSidebar(false)

  const location = useLocation()

  useEffect(() => {
    hideSidebar()
  }, [location.pathname])
  return (
    <div className="flex">
      {/* Side Navigation */}
      <SideNavigation show={showSidebar} hideSidebar={hideSidebar} />

      {/* Page Component */}
      <div className="flex flex-col w-full bg-gray-25 ml-0  lg:ml-64 min-h-screen">
        {/* Header */}
        <Header displaySidebar={displaySidebar} />

        {/* Main Page */}
        <main className="bg-gray-50 h-full px-4 md:px-10 lg:px-20 py-6">
          <Outlet />
        </main>
      </div>
      {showSidebar && (
        <div
          className="fixed bg-gray-900/50 top-0 left-0 h-screen w-screen"
          onClick={() => setShowSidebar(false)}
        ></div>
      )}
    </div>
  )
}

export default Layout
