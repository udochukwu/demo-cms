import Button from 'components/Button'
import TabButton from 'components/TabButton/TabButton'
import Table from 'components/Table/Table'
import { useState } from 'react'
import { RiAddLine } from 'react-icons/ri'
import { getBrandTableColumns } from './utils'
import Loader from 'components/Loader/Loader'
import { useBrands } from './brandsApi'
import { Link } from 'react-router-dom'

const Brands = () => {
  const { data: brands, isLoading } = useBrands()

  return isLoading ? (
    <div className="flex items-center justify-center h-80 ">
      <Loader className="h-5 w-5" />
    </div>
  ) : (
    <>
      <div className="flex justify-end mb-5">
        <div className="flex gap-4">
          <Link
            to="/catalogue/brand/new"
            className="bg-main-3 text-white font-semibold text-sm px-4 py-2.5 gap-2 rounded"
          >
            + Add Brand
          </Link>
        </div>
      </div>
      {brands && (
        <Table columns={getBrandTableColumns()} items={brands} />
      )}
    </>
  )
}

export default Brands
