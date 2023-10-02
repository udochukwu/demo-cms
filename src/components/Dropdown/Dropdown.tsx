import React, {
  ElementType,
  Fragment,
  ReactElement,
  ReactNode,
  useRef,
  useState
} from 'react'
import clsx from 'clsx'
import { Menu, Portal, Transition } from '@headlessui/react'
import { usePopper } from 'react-popper'
import DropdownMenuItem from 'components/Dropdown/DropdownMenuItem'
import { IconType } from 'react-icons'
interface DropdownProps {
  className?: string
  classNamePortal?: string
  classNameMenuItems?: string
  as?: ElementType
  menuButton: ReactNode
  position?:
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'right-start'
  offset?: [number, number]
  items?: {
    id: number | string
    label: string
    wrapper?: ReactElement
    onClick?: () => void
    path?: string
    icon?: string | IconType
    iconClassName?: string
  }[]
  children?: ReactNode
}
const Dropdown: React.FC<DropdownProps> = ({
  className,
  classNamePortal,
  classNameMenuItems,
  as = 'div',
  menuButton,
  position = 'bottom-end',
  offset = [0, 8],
  items = [],
  children
}) => {
  const popperElRef = useRef(null)
  const [targetElement, setTargetElement] = useState(null)
  const [popperElement, setPopperElement] = useState(null)

  const { styles, attributes } = usePopper(targetElement, popperElement, {
    placement: position,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset
        }
      }
    ]
  })

  return (
    <Menu
      as={as}
      className={clsx('relative inline-block text-left', className)}
    >
      {/* @ts-ignore */}
      <div ref={setTargetElement}>
        <Menu.Button as={Fragment}>{menuButton}</Menu.Button>
      </div>
      <Portal>
        <div
          className={clsx('z-[9999]', classNamePortal)}
          ref={popperElRef}
          style={styles.popper}
          {...attributes.popper}
        >
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
            beforeEnter={() => setPopperElement(popperElRef.current)}
            afterLeave={() => setPopperElement(null)}
          >
            <Menu.Items
              className={clsx(
                'absolute right-0 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-medium w-fit focus:outline-none',
                { 'min-w-max': !!items?.length },
                classNameMenuItems
              )}
            >
              {items?.length > 0 ? (
                <div className={clsx('')}>
                  {items?.map((item, index) => (
                    <DropdownMenuItem key={index} {...item} />
                  ))}
                </div>
              ) : (
                children
              )}
            </Menu.Items>
          </Transition>
        </div>
      </Portal>
    </Menu>
  )
}

export default Dropdown
