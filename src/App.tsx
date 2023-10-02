import AuthCheck from 'features/auth/AuthCheck'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { store } from 'app/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import Dashboard from 'features/dashboard'
import Layout from 'features/layout'
import Login from 'features/auth/Login'
import Products from 'features/products'
import Roles from 'features/roles'
import Users from 'features/users'
import ChangePassword from 'features/changePassword'
import Profile from 'features/profile'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import User from 'features/users/User'
import SalesAgents from 'features/salesAgents'
import CreateProduct from 'features/products/CreateProduct'
import SalesAgent from './features/salesAgents/salesAgent'
import Product from 'features/products/Product'
import LoanApplications from 'features/loans'
import CataloguePage from 'features/catalogue/CataloguePage'
import CreateUpdateBrand from 'features/brands/CreateUpdateBrand'
import CreateUpdateCategory from 'features/category/CreateUpdateCategory'

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  })

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthCheck>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="change-password" element={<ChangePassword />} />
                <Route path="profile" element={<Profile />} />
                <Route path="roles" element={<Roles />} />
                <Route path="users" element={<Users />} />
                <Route path="users/:userId" element={<User />} />
                <Route path="products" element={<Products />} />
                <Route path="products/new" element={<CreateProduct />} />
                <Route
                  path="products/:productId/edit"
                  element={<CreateProduct />}
                />
                <Route path="products/:productId" element={<Product />} />
                <Route path="sales-agents" element={<SalesAgents />} />
                <Route path="sales-agents/:userId" element={<SalesAgent />} />
                <Route path="loans" element={<LoanApplications />} />
                <Route path="/catalogue">
                  <Route index element={<CataloguePage />} />
                  <Route path="category" element={<CataloguePage />} />
                  <Route
                    path="category/new"
                    element={<CreateUpdateCategory />}
                  />
                  <Route
                    path="category/:categoryId"
                    element={<CreateUpdateCategory />}
                  />

                  <Route
                    path="brand"
                    element={<CataloguePage catalogue="brand" />}
                  />
                  <Route path="brand/new" element={<CreateUpdateBrand />} />
                  <Route
                    path="brand/:brandId"
                    element={<CreateUpdateBrand />}
                  />
                </Route>
              </Route>
              <Route path="/login" element={<Login />} />
            </Routes>
          </AuthCheck>
        </BrowserRouter>
        <ToastContainer
          hideProgressBar
          autoClose={5000}
          theme="colored"
          position="top-center"
        />
      </QueryClientProvider>
    </Provider>
  )
}

export default App
