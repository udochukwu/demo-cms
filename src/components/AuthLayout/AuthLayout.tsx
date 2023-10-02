import React, { ReactNode } from 'react'
import Logo from 'components/Logo'
interface AuthLayoutProps {
  children: ReactNode
}
const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between h-screen md:h-auto">
      <div className="h-72 md:h-screen bg-gradient-to-b  from-[#542F85] from-30%  to-[#AE5FBE] to-100% md:w-1/2 flex justify-center items-center px-6 lg:px-[120px]  xl:px-[194px] ">
        <div>
          <Logo className="w-1/2 md:w-full mx-auto" />
          <p className="text-center text-white text-base md:text-[28px] md:leading-10 font-light md:font-semibold ">
            We&apos;ll help you keep your finances on the right path.
          </p>
        </div>
      </div>
      <div className="h-full md:h-screen bg-white w-full md:w-1/2  px-4 md:px-[76px] flex justify-center items-center  py-10 md:py-0">
        <div className="max-w-[430px] w-full mx-auto">{children}</div>
      </div>
    </div>
  )
}

export default AuthLayout
