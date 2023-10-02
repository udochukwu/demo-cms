import React, { ChangeEvent, Ref, forwardRef , ReactNode} from 'react'
import clsx from 'clsx'


interface SearchProps {
  onChange?: (val: string) => void | null
  value?: string | number
  className?: string
  inputClassName?:string
  placeholder:string
  [key: string]: unknown
  icon?: ReactNode
  reverseRows?: boolean
}
const Search: React.ForwardRefExoticComponent<SearchProps> = forwardRef(
  (
    {
      onChange = () => {},
      value,
      className,
      inputClassName,
      placeholder,
      reverseRows=false,
      icon,
      ...rest
    },
    ref: Ref<HTMLInputElement>
  ) => {

    return (
       <div className={`${className} ${reverseRows ? 'flex flex-row-reverse' : 'flex flex-row'}`}>
          <input
            type="text"
            placeholder={placeholder}
            className={inputClassName}
            value={value}
               onChange={(e) => onChange(e.target.value)}/>
        <div className='px-2 flex items-center'>{icon}</div>
        </div>
    )
  }
)

Search.displayName = 'Search'

export default Search
