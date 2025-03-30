import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/user/Home'
import Login from './pages/shared/Login'
import Signup from './pages/shared/Signup'
import AdminDashboard from './pages/admin/AdminDashboard'
import Navbar from "./components/Navbar"
import Footer from './components/Footer'
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import Products from './pages/shared/Products'
import Cart from './pages/user/Cart'
import NotFound from './pages/user/NotFound'
import ProductPage from './pages/shared/ProductPage'

const App = () => {


  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/products' element={<Products />} />
            <Route path='/product/:id' element={<ProductPage />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/*' element={<NotFound />} />
            <Route path='/adminDashboard' element={<AdminDashboard />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
