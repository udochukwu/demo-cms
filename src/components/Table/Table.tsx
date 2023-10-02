import React from 'react'
import clsx from 'clsx'

export interface Column {
  label?: string
  render: (item: any) => React.ReactNode
  className?: string
}
export interface TableProps {
  className?: string
  columns: Column[]
  items: any[]
}
const Table: React.FC<TableProps> = (props) => {
  const { className, columns, items } = props

  return (
    <div className="w-full overflow-x-scroll">
      <table className="min-w-full overflow-hidden">
        <thead className="bg-[#FDF4FF]  uppercase text-xs leading-normal font-normal">
          <tr className="border-b border-gray-50 hover:bg-gray-100">
            {columns.map((column: Column) => {
              return (
                <th
                  className="py-3 px-6 text-left text-dark"
                  key={column.label}
                >
                  {column.label}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody className="bg-white shadow-md">
          {items?.map((item, index) => {
            return (
              <tr
                className="border-b border-gray-50 hover:bg-gray-50"
                key={index}
              >
                {columns.map((column: Column, index) => (
                  <td
                    className="py-6 px-4 text-left text-sm font-normal text-dark whitespace-normal"
                    key={index}
                  >
                    <div className={clsx('flex text-sm', column?.className)}>
                      {column.render(item)}
                    </div>
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Table
