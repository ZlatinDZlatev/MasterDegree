import {
    Routes,
    Route
  } from "react-router-dom";
import Home from '../pages/Home'
import About from '../pages/About'
import Cart from '../pages/Cart'
import Contacts from '../pages/Contacts'
import Offers from '../pages/Offers'
import Products from '../pages/Products'
import Laptops from "../pages/Laptops";
import Product from "../pages/Product";
import Monitors from "../pages/Monitors";
import Profile from "../pages/Profile"
import { Navigate } from "react-router-dom";


  
  export default function Router() {
  return(
      <Routes>
          <Route exact path="/"  element={ <Home /> } />
          <Route exact path="/contacts" element= { <Contacts/> } />
          <Route exact path="/about" element= { <About/> } />
          <Route exact path="/cart" element= { <Cart/> }/>
          <Route exact path="/offers" element= { <Offers/> } />
          <Route exact path="/products" element= { <Products/> } />
          <Route exact path="/products/laptops" element= { <Laptops/> } />
          <Route exact path="/products/monitors" element= { <Monitors/> } />
          <Route path="/products/:id" element={<Product />} /> 
          <Route exact path="/profile" element= {localStorage.getItem("user")? <Profile/>:<Navigate to= {{pathname:"/"}}/> } />
      </Routes>
  )
  }