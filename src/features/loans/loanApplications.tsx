import Button from 'components/Button'
import TabButton from 'components/TabButton'
import Table from 'components/Table'
import React, { useEffect, useState } from 'react'
import { MdOutlineContentCopy } from 'react-icons/md'
import { PiExportBold } from 'react-icons/pi'
import { RiAddLine } from 'react-icons/ri'
import { AiOutlineSearch } from 'react-icons/ai'
import {CiFilter} from 'react-icons/ci'
import { getLoanApplicationsTableColumns, mockLoanApplications } from './utils'
import Loader from 'components/Loader'
import Select from 'components/Select'
import Search from 'components/Search'


const LoanApplications = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortingOption, setSortingOption] = useState('1');
  const [filterValue, setFilterValue] = useState('');

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Loan applications</h1>
        <div className="gap-4 hidden md:flex">
          <Button
            appearance="outline"
            icon={PiExportBold}
            label="Batch upload"
          />
          <Button
            appearance="outline"
            icon={MdOutlineContentCopy}
            label="Export CSV"
          />
          <Button
            label="Start new application"
            onClick={() => {}}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 lg:flex lg:flex-row mb-6 gap-6 ">
        <Search
          value={searchQuery}
          onChange={(searchValue) => setSearchQuery(searchValue)}
          placeholder='Search name or ID'
          className='bg-white rounded'
          inputClassName='w-full px-4 py-2 h-full rounded-md outline-0 border-0 ring-0 text-base'
          icon={<AiOutlineSearch className="text-main-3 w-6 h-6" />}

        />
        <Select
          className="max-w-[220px]"
          options={[
               { label: 'Sort by A to Z', value: '1' },
               { label: 'Sort by Z to A', value: '2' }
              ]}
          value={sortingOption}
          onChange={(selectedValue) => setSortingOption(selectedValue)}
          showBorder={false}
        />

        <Search
          value={filterValue}
          onChange={(filteredValue) => setFilterValue(filteredValue)}
          placeholder='Filter search'
          className='flex flex-row bg-none border-2 border-main-5 px-2 gap-2 rounded w-fit'
          inputClassName='w-full py-2 bg-gray-50 placeholder:text-main-3 font-bold outline-0 border-0 ring-0'
          icon={<CiFilter className='text-main-3' />}
          reverseRows={true}
        />

      </div>
    <Table
    columns={getLoanApplicationsTableColumns()}
    items={mockLoanApplications
    .filter((application) =>
      (application.id.includes(searchQuery) ||
      application.accountName.toLowerCase().includes(searchQuery.toLowerCase()))
      &&
      (
        filterValue === '' ||
        application.status.toLowerCase().includes(filterValue.toLowerCase()) ||
        application.date.includes(filterValue) ||
        application.time.includes(filterValue) ||
        application.decileScore.toString().includes(filterValue) ||
        application.loanAvailed.toLowerCase().includes(filterValue.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (sortingOption === '1') {
        return a.accountName.localeCompare(b.accountName);
      } else if (sortingOption === '2') {
        return b.accountName.localeCompare(a.accountName);
      } else {
        return 0;
      }
    })}
/>


    </div>
  )
}

export default LoanApplications
