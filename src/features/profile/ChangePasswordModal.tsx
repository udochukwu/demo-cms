import clsx from 'clsx'
import Button from 'components/Button'
import Modal from 'components/Modal'
import PasswordField from 'components/PasswordField/PasswordField'
import { useState } from 'react'
import { toast } from 'react-toastify'
interface ChangePasswordModalProps {
  isOpen: boolean
  onClose: () => void
}
const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isOpen,
  onClose
}) => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handlePasswordChange = () => {
    toast.success('Password successfully updated')
    handleClose()
  }

  const handleClose = () => {
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    onClose()
  }

  return (
    <Modal
      className="w-[500px]"
      isOpen={isOpen}
      title="Change Password"
      onClose={handleClose}
      titleClassName="m-aut font-semibold"
      titleBorder
    >
      <div className="py-7 px-5 md:px-6">
        <div className="grid grid-cols-1 gap-6">
          <PasswordField
            label="Old"
            onChange={(e) => setCurrentPassword(e.target.value)}
            value={currentPassword}
            autoComplete={false}
          />
          <PasswordField
            label="New password"
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
          />
          <PasswordField
            label="Confirm new password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </div>
      </div>
      <div className="flex justify-between gap-4 p-6 border-t border-butter">
        <Button
          label="Cancel"
          appearance="outline"
          className="w-[150px]"
          onClick={handleClose}
        />
        <Button
          label="Save changes"
          className={clsx('w-[150px]')}
          disabled={!currentPassword || !newPassword || !confirmPassword}
          onClick={handlePasswordChange}
        />
      </div>
    </Modal>
  )
}
export default ChangePasswordModal
