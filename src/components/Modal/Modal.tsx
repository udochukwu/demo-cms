import React, { Fragment, ReactNode, useState } from 'react'
import clsx from 'clsx'
import { Dialog, Transition } from '@headlessui/react'
import { MdOutlineClose } from 'react-icons/md'
interface ModalProps {
  className?: string
  titleClassName?: string
  isOpen: boolean
  title?: string
  children: ReactNode
  showClose?: boolean
  onClose: () => void
  titleBorder?: boolean
}

const Modal: React.FC<ModalProps> = ({
  className,
  titleClassName,
  isOpen,
  title,
  children,
  showClose,
  onClose,
  titleBorder
}) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        open={isOpen}
        onClose={onClose}
        className="fixed inset-0 z-30 overflow-y-auto"
      >
        {/* Use one Transition.Child to apply one transition to the backdrop... */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-dark/70 z-50" />
        </Transition.Child>

        {/*
          ...and another Transition.Child to apply a separate transition
          to the contents.
        */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 flex w-screen items-center justify-center z-50 p-5  md:p-0">
            <Dialog.Panel
              as="div"
              className={clsx('bg-white rounded-xl relative', className)}
            >
              {title && (
                <div
                  className={clsx(
                    'flex items-center justify-between px-5 md:px-6 py-4',
                    { 'border-b border-butter': titleBorder }
                  )}
                >
                  <Dialog.Title
                    className={clsx(
                      'text-dark font-bold text-2xl',
                      titleClassName
                    )}
                  >
                    {title}
                  </Dialog.Title>
                  {showClose && (
                    <button onClick={onClose}>
                      <MdOutlineClose className="h-4 w-4" />
                    </button>
                  )}
                </div>
              )}
              {!title && showClose && (
                <button className="absolute top-4 right-4" onClick={onClose}>
                  <MdOutlineClose className="h-4 w-4" />
                </button>
              )}
              {children}
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}

export default Modal
