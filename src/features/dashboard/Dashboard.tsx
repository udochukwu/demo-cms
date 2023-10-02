import { MdViewList, MdInventory, MdStart } from 'react-icons/md'
import clsx from 'clsx'
import useCurrentUser from 'features/auth/hooks/useCurrentUser'

const Dashboard = () => {
  const { user } = useCurrentUser()
  const quickLinks = [
    {
      id: 1,
      title: 'Manage Dealers',
      description:
        'Add a product to your inventory and expand your product catalogue.',
      icon: <MdViewList className="" />
    },
    {
      id: 2,
      title: 'View Applications',
      description:
        'Check out the loan applications and their application status.',
      whiteBg: true,
      icon: <MdViewList />
    },
    {
      id: 3,
      title: 'Manage Products',
      description:
        'Find out which motorcycle for you to buy by answering a few questions.',
      whiteBg: true,
      icon: <MdInventory />
    },
    {
      id: 4,
      title: 'Start An Application',
      description:
        'Kickstart a loan application by searching for the motorcycle you have in mind!',
      icon: <MdStart />
    }
  ]
  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Hello, Nelson</h1>
      </div>
      <div className="bg-white p-4">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-2">
            {quickLinks.map((link) => (
              <div
                className={clsx(
                  'p-4 cursor-pointer bg-white border-b md:border-0 border-butter/50 hover:bg-main-5',
                  { 'md:bg-white md:hover:bg-main-5/40': link.whiteBg },
                  { 'md:bg-main-5 md:hover:bg-main-5/70': !link.whiteBg }
                )}
                key={link.id}
              >
                <p className="font-medium text-xl text-main-3 flex items-center gap-1">
                  {link.icon}
                  {link.title}
                </p>
                <p className="text-sm leading-6 text-dark/80">
                  {link.description}
                </p>
              </div>
            ))}
          </div>
          <div className="border-l border-gray-100/40">
            <p></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
