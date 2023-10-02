import React from 'react'
import Modal from 'components/Modal/Modal'
import Button from 'components/Button/Button'
interface InfoModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  info: string
}

const InfoModal: React.FC<InfoModalProps> = ({
  isOpen,
  title,
  onClose,
  info
}) => {
  return (
    <Modal
      isOpen={isOpen}
      title={title}
      onClose={() => onClose()}
      titleClassName="font-semibold"
      className='w-[500px]'
      titleBorder
    >
      <div className="py-8 px-5 md:px-6 pt-0 ">
        <p className="pb-6 text-dark mt-3">{info}</p>
        <div className="flex justify-end gap-4">
          <Button
            label="Okay"
            appearance="outline"
            className="w-[150px]"
            onClick={() => onClose()}
          />
        </div>
      </div>
    </Modal>
  )
}

export default InfoModal
