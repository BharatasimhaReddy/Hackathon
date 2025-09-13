import React, { useContext } from 'react'
import { UserContext } from './context/UserContext';
import Cart from './components/user/Cart';
import Product from './components/user/Product';
import Navbar from './components/user/Navbar';

const App = () => {

  const { user, setUser } = useContext(UserContext);


  return (
    <div>
      <Navbar />
      <h1>Shop</h1>
      
      <Product id={1} name="Laptop" price={50000} />
      <Product id={2} name="Phone" price={20000} />
      <Product id={3} name="Headphones" price={3000} />

      <hr />

      <Cart />
    </div>
  )
}

export default App