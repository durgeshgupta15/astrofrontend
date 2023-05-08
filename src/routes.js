import Home from './pages/Home'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'
// import Courses from './pages/Courses'
const routes = [
  { path: '/', exact: true, name: 'Home', element: Home },

  // { path: '/courses', exact: true, name: 'Home', element: Courses },


  { path: '/product-list', exact: true, name: 'Home', element: ProductList },
  { path: '/product-detail', exact: true, name: 'Home', element: ProductDetail },
]
export default routes
