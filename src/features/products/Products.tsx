import React from 'react'
import Button from 'components/Button'
import TabButton from 'components/TabButton/TabButton'
import Table from 'components/Table/Table'
import { MdOutlineContentCopy } from 'react-icons/md'
import { PiExportBold } from 'react-icons/pi'
import { getProductsTableColumns } from './utils'
import { Link } from 'react-router-dom'
import { useProducts } from './productsApi'
import Loader from 'components/Loader/Loader'

const Products = () => {
  const [activeTab, setActiveTab] = React.useState<
    'active' | 'soldout' | 'drafts' | 'archived'
  >('active')

  const { data: products, isLoading } = useProducts()
  return (
    <div>
      <div className="flex justify-between gap-x-24 sm:gap-x-0 items-center mb-4 w-full">
        <h1 className="sm:text-2xl text-base font-bold">Products</h1>
        <div className="flex gap-4 items-center">
          <Button
            appearance="outline"
            className="sm:flex hidden"
            icon={PiExportBold}
            label="Batch upload"
          />
          <Button
            appearance="outline"
            className="sm:flex hidden"
            icon={MdOutlineContentCopy}
            label="Export CSV"
          />
          <span>
            <Link
              to="/products/new"
              className="bg-main-3 text-white font-semibold text-sm px-4 py-2.5 gap-2 rounded"
            >
              + New Product
            </Link>
          </span>
        </div>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center h-80 ">
          <Loader className="h-5 w-5" />
        </div>
      ) : (
        <>
          <div className="flex mb-6">
            <TabButton
              label="Active"
              active={activeTab == 'active'}
              onClick={() => setActiveTab('active')}
            />
            <TabButton
              label="Sold Out"
              active={activeTab == 'soldout'}
              onClick={() => setActiveTab('soldout')}
            />
            <TabButton
              label="Drafts"
              active={activeTab == 'drafts'}
              onClick={() => setActiveTab('drafts')}
            />
            <TabButton
              label="Archived"
              active={activeTab == 'archived'}
              onClick={() => setActiveTab('archived')}
            />
          </div>
          {products && (
            <Table columns={getProductsTableColumns()} items={products} />
          )}
        </>
      )}
    </div>
  )
}

export default Products
