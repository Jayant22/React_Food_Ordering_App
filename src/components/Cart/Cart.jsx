import React, { useContext, useState } from 'react';

import classes from './Cart.module.css';
import Modal from './../UI/Modal';
import CartContext from './../../store/Cart-context';
import CartItem from './CartItem';
import CheckOut from './CheckOut';
import useFetch from './../../hooks/useFetch';

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const { isLoading, sendHttpRequest: sendTaskRequest } = useFetch();
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (orderData) => {
    sendTaskRequest({
      url: 'https://react--http-f960e-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        userOrder: orderData,
        orderedItems: cartCtx.items,
      },
    });
    setRequestSubmitted(true);
    cartCtx.clearCart();
  };

  let idx = 0;

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id + '-' + idx++}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {!isCheckout && cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <CheckOut onSubmit={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isLoading && !requestSubmitted && cartModalContent}
      {isLoading && requestSubmitted && <p>Sending order data...</p>}
      {!isLoading && requestSubmitted && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
