import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from 'app/hooks/useAppDispath'
import { logout } from 'features/auth/authSlice'
import { AiOutlineMenu } from 'react-icons/ai'
import Dropdown from 'components/Dropdown/Dropdown'
import {
  PiArrowSquareRightDuotone,
  PiCaretDownBold,
  PiUserCircleGearDuotone,
  PiUserSquareDuotone
} from 'react-icons/pi'
import { useState } from 'react'
import Button from 'components/Button/Button'
import Modal from 'components/Modal/Modal'
import ChangePasswordModal from 'features/profile/ChangePasswordModal'
import useCurrentUser from 'features/auth/hooks/useCurrentUser'

type HeaderProps = {
  displaySidebar: () => void
}

const Header: React.FC<HeaderProps> = ({ displaySidebar }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const { user } = useCurrentUser()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }
  const dropdownItems = [
    {
      id: 1,
      label: 'Profile',
      icon: PiUserSquareDuotone,
      path: '/profile'
    },
    {
      id: 2,
      label: 'Password',
      icon: PiUserCircleGearDuotone,
      onClick: () => setShowPasswordModal(true)
    },
    {
      id: 3,
      label: 'Logout',
      icon: PiArrowSquareRightDuotone,
      onClick: () => setShowLogoutModal(true)
    }
  ]

  return (
    <>
      <header className="h-14 w-full sticky top-0 bg-gray-25 flex justify-between p-4 md:px-10 lg:px-20  items-center z-10">
        <div className="cursor-pointer">
          <AiOutlineMenu
            onClick={() => displaySidebar()}
            className="block lg:hidden"
          />
        </div>
        <div className="flex gap-6 h-full items-center">
          <p className="text-gray-800 text-sm flex items-center tracking-wide">
            <span className="inline-block mr-1">Hello,</span>{' '}
            <span className="font-bold"> {user &&  `${user?.firstname}!`}</span>
          </p>
          <hr className="h-full border-solid border-gray-100 border-r" />
          <Dropdown
            menuButton={
              <div className="flex gap-2 items-center cursor-pointer">
                <div className="rounded-full h-6 w-6 bg-orange-600 flex justify-center items-center text-[10px] font-medium text-white">
                  NN
                </div>
                <PiCaretDownBold className="w-3 h-3" />
              </div>
            }
            items={dropdownItems}
            classNameMenuItems="mt-4"
          />
        </div>
      </header>
      <Modal
        isOpen={showLogoutModal}
        title={'Logout'}
        onClose={() => setShowLogoutModal(false)}
        showClose
      >
        <div className="py-8 px-5 md:px-6 pt-0">
          <p className="pb-6 text-dark">Are you sure you want to logout?</p>
          <div className="flex justify-between gap-4">
            <Button
              label="Cancel"
              appearance="outline"
              className="w-[150px]"
              onClick={() => setShowLogoutModal(false)}
            />
            <Button label="Yes" className="w-[150px]" onClick={handleLogout} />
          </div>
        </div>
      </Modal>
      <ChangePasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </>
  )
}

export default Header
