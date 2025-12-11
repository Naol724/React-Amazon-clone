import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './Pages/Landing/Landing';
import Singup from './Pages/Auth/Singup';
import Orders from './Pages/Orders/Orders';
import Cart from './Pages/Cart/Cart';
import Payment from './Pages/Payment/Payment';
import ProductDetail from './Pages/ProductDetail/ProductDetail';
import ProductCard from './Components/Product/ProductCard';

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Singup />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/products/:id" element={<ProductCard />} />
      </Routes>
    </Router>
  );
}

export default Routing;
