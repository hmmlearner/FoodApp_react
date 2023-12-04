import React, {useContext} from 'react';
import MealItemForm from './MealItemForm';
import classes from './Meal.module.css';
import CartContext from "../../Store/cart-context";

const Meal = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  const ctx = useContext(CartContext);

      //
 const AddToCartHandler = (amount)=>{
    console.log(amount + ' AddtoCartHandler item '+amount)
    ctx.addItem({id:props.id, name: props.name, price: props.price, amount:amount });
 }

  return (
    <React.Fragment>
      <li className={classes.meal}>
        <div>
          <h3>{props.name}</h3>
          <div className={classes.description}>{props.description}</div>
          <div className={classes.price}>{price}</div>
        </div>
        <div>
          <MealItemForm id={props.id} OnEnteredQuantity={AddToCartHandler}/>
        </div>
      </li>
    </React.Fragment>
  );
};
export default Meal;