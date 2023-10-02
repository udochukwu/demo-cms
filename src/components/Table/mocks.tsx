import { Column } from './Table'

export const ITEMS = [
  {
    id: 1,
    name: 'Nelson Nnaji',
    email: 'nelson.nnaji@gitstart.dev',
    role: 'Super Administrator',
    date: 'July 1, 2023',
    time: '02:09:31 PM'
  },
  {
    id: 2,
    name: 'Marian Magsaysay',
    email: 'marian@csb.com.ph',
    role: 'Admin',
    date: 'July 1, 2023',
    time: '02:09:31 PM'
  },
  {
    id: 3,
    name: 'Katheleen Ona',
    email: 'kato@csb.com.ph',
    role: 'Admin',
    date: 'July 1, 2023',
    time: '02:09:31 PM'
  },
  {
    id: 4,
    name: 'Margret Resma',
    email: 'margret@csb.com.ph',
    role: 'Admin',
    date: 'July 1, 2023',
    time: '02:09:31 PM'
  },
  {
    id: 5,
    name: 'Josiah Diaz',
    email: 'josiah@csb.com.ph',
    role: 'Admin',
    date: 'July 1, 2023',
    time: '02:09:31 PM'
  },
  {
    id: 6,
    name: 'Marc Aguila',
    email: 'marc@csb.com.ph',
    role: 'Admin',
    date: 'July 1, 2023',
    time: '02:09:31 PM'
  },
  {
    id: 7,
    name: 'Reuben Bautista',
    email: 'robb@csb.com.ph',
    role: 'Admin',
    date: 'July 1, 2023',
    time: '02:09:31 PM'
  },
  {
    id: 8,
    name: 'Veronica Velasco',
    email: 'vee@csb.com.ph',
    role: 'Admin',
    date: 'July 1, 2023',
    time: '02:09:31 PM'
  },
  {
    id: 9,
    name: 'Juan dela Cruz',
    email: 'juan@csb.com.ph',
    role: 'Admin',
    date: 'July 1, 2023',
    time: '02:09:31 PM'
  },
  {
    id: 10,
    name: 'Jonash de Vivar',
    email: 'nash@csb.com.ph',
    role: 'Admin',
    date: 'July 1, 2023',
    time: '02:09:31 PM'
  }
]

type User = {
  id: number
  name: string
  email: string
  role: string
  date: string
  time: string
}
export const COLUMNS: Column[] = [
  {
    label: 'Name',
    render: (user: User) => user.name
  },
  {
    label: 'Email',
    render: (user: User) => user.email
  },
  {
    label: 'Role',
    render: (user: User) => user.role
  },
  {
    label: 'Date Added',
    render: (user: User) => (
      <div>
        <span className="block text-dark">{user.date}</span>
        <span className="block text-dark/60">{user.time}</span>
      </div>
    )
  }
]
