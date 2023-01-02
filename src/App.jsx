import { useState } from 'react';

import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import CartProvider from './store/CartProvider';

const App = () => {
  const [cartIsActive, setCartIsActive] = useState(false);

  const activateCart = () => {
    setCartIsActive(true);
  };

  const deactivateCart = () => {
    setCartIsActive(false);
  };

  return (
    // Using the Context to Store the Data and providing the Data to all Components
    <CartProvider>
      {cartIsActive && <Cart onClose={deactivateCart} />}
      <Header onActiveCart={activateCart} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
};

export default App;
