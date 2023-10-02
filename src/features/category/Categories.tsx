import Table from 'components/Table/Table'
import { getCategoryTableColumns } from './utils'
import Loader from 'components/Loader/Loader'
import { useCategorys } from './categoryApi'
import { Link } from 'react-router-dom'

const Categories = () => {
  const { data: categories, isLoading } = useCategorys()

  return isLoading ? (
    <div className="flex items-center justify-center h-80 ">
      <Loader className="h-5 w-5" />
    </div>
  ) : (
    <>
      <div className="flex justify-end mb-5">
        <div className="flex gap-4">
          <Link
            to="/catalogue/category/new"
            className="bg-main-3 text-white font-semibold text-sm px-4 py-2.5 gap-2 rounded"
          >
            + Add Category
          </Link>
        </div>
      </div>
      {categories && (
        <Table columns={getCategoryTableColumns()} items={categories} />
      )}
    </>
  )
}

export default Categories
