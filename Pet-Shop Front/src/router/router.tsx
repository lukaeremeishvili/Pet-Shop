import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import AboutPage from '../AboutPage/AboutPage'; 
import CategoriesPage from '../CategoriesPage/CategoriesPage';
import Details from '../Details/Details';
import Layout from '../components/Layout';
import WishlistPage from '../components/WishlistPage';
import CartPage from '../components/CartPage';

const Router = () => {
  return (
    <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/details/:id/:source" element={<Details />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;