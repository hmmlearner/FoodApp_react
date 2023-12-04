import React from "react";
import classes from './CartItem.module.css';



const CartItem = (props) => {
    const currentCartItem = {...props};
    const price = `$${currentCartItem.cartItem.price.toFixed(2)}`;
    console.log(currentCartItem);
    return (
      <li className={classes["cart-item"]}>
        <div>
          <h2>{currentCartItem.cartItem.name}</h2>
          <div className={classes.summary}>
          <span className={classes.price}> {price}</span>
          <span className={classes.amount}>x{currentCartItem.cartItem.amount}</span>
          </div>
          </div>
          <div className={classes.actions}>
            <button onClick={props.onIncrement}>+</button>
            <button onClick={props.onDecrement}>-</button>
          </div>
      </li>
    );

}

export default CartItem;