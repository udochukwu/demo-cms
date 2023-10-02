import TabButton from 'components/TabButton/TabButton'
import Brands from 'features/brands/Brands'
import Categories from 'features/category/Categories'

interface CataloguePageProps {
  catalogue?: 'category' | 'brand'
}
const CataloguePage = (props: CataloguePageProps) => {
  const { catalogue = 'category' } = props

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-2xl font-bold">Catalogue</h1>
      </div>

      <div className="flex mb-6">
        <TabButton
          label="Category"
          active={catalogue == 'category'}
          to="/catalogue/category"
        />
        <TabButton
          label="Brand"
          active={catalogue == 'brand'}
          to="/catalogue/brand"
        />
      </div>

      {catalogue == 'category' && <Categories />}
      {catalogue == 'brand' && <Brands />}
    </div>
  )
}

export default CataloguePage
