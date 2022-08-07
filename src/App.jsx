import React, { useState } from 'react';

import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';

const App = () => {
  const [cartIsActive, setCartIsActive] = useState(false);

  const activateCart = () => {
    setCartIsActive(true);
  };

  const deactivateCart = () => {
    setCartIsActive(false);
  };

  return (
    <React.Fragment>
      {cartIsActive && <Cart onClose={deactivateCart} />}
      <Header onActiveCart={activateCart} />
      <main>
        <Meals />
      </main>
    </React.Fragment>
  );
};

export default App;
