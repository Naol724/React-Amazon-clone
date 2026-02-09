import React from 'react';
import { BrowserRouter as Router, Routes, Route, redirect } from 'react-router-dom';
import Landing from './Pages/Landing/Landing';
import Auth from './Pages/Auth/Auth';
import Payment from './Pages/Payment/Payment';
import Orders from './Pages/Orders/Orders';
import Cart from './Pages/Cart/Cart';
import Results from './Pages/Results/Results';
import Product from './Pages/Products/Product';  
import ProductDetail from './Pages/ProductDetail/ProductDetail';
import Deals from './Pages/Deals/Deals';
import CustomerService from './Pages/CustomerService/CustomerService';
import Registry from './Pages/Registry/Registry';
import GiftCards from './Pages/GiftCards/GiftCards';
import Sell from './Pages/Sell/Sell';
// import {CheckoutProvider} from '@stripe/react-stripe-js/checkout';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';


// Get Stripe publishable key from environment
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

// Debug: Log the Stripe key being used (first few characters only for security)
console.log("Stripe key loaded:", stripePublishableKey?.substring(0, 20) + "...");
console.log("Full key length:", stripePublishableKey?.length);

if (!stripePublishableKey) {
  console.error("VITE_STRIPE_PUBLISHABLE_KEY is not set in environment variables!");
}

const stripePromise = loadStripe(stripePublishableKey);

// Debug: Log the Stripe key being used (first few characters only for security)
console.log("Stripe key loaded:", import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY?.substring(0, 20) + "...");


function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route 
          path="/payments" 
          element={
            <ProtectedRoute msg={"you must log in to pay"} redirect={"/payments"}>

              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
            }
        />

        <Route 
          path="/orders" 
          element={
            <ProtectedRoute
              msg={"you must log in to access your orders"}
              redirect={"/orders"}
            >
          <Orders />
            </ProtectedRoute>
          
          } />

        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />   
        <Route path="/cart" element={<Cart />}/>
        <Route path="/category/deals" element={<Deals />} />
        <Route path="/customer-service" element={<CustomerService />} />
        <Route path="/registry" element={<Registry />} />
        <Route path="/gift-cards" element={<GiftCards />} />
        <Route path="/sell" element={<Sell />} />            
      </Routes>
    </Router>
  );
}

export default Routing;
