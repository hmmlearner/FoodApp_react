import React, {useState} from 'react';
import Header from "./Components/Layout/Header";
import Meals from './Components/Meals/Meals';
import Cart from './Components/Cart/Cart';
import CartProvider from './Store/CartProvider';

function App() {

  const [showCartModal, setShowCartModal] = useState(false);
  const OpenShoppingCartHandler = ()=>{
    setShowCartModal(true);
  }
  const CloseShoppingCartHandler= ()=>{
    setShowCartModal(false);
  }

  return (
    <CartProvider>
      {showCartModal && <Cart OnCloseCart={CloseShoppingCartHandler}  />}
      <Header OpenCart={OpenShoppingCartHandler}/>
      <main>
      <Meals/>
      </main>
      </CartProvider>
  );
}

export default App;
