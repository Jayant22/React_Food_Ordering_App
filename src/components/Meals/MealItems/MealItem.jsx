import { useContext } from 'react';

import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';
import CartContext from '../../../store/Cart-context';

const MealItem = (props) => {
  const CArtCtx = useContext(CartContext);

  const price = `${props.price.toFixed(2)}`;

  const AddToCartHandler = (enteredAmount) => {
    CArtCtx.addItem({
      id: props.id,
      name: props.name,
      amount: enteredAmount,
      price: props.price,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={AddToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
