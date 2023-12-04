import React, {useContext, useState} from "react";
import classes from './Cart.module.css';
import CartItem from './CartItem';
import Modal from "../UI/Modal";
import CartContext from "../../Store/cart-context";
import Checkout from "./Checkout";
const Cart = (props) => {
    const ctx = useContext(CartContext);
    const cartItemList = ctx.items;//[{id:'c1', name: 'Sushi', amount: 2, price: 12.99}];
    const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
    const hasItems = ctx.items.length > 0 ;
    
    const [showCheckout, setShowCheckout] = useState(false);
    const IncrementQuantityHandler = (item)=>{
        //ctx.addItem(); //need to use ref?? to access cartItem.id??
        console.log(JSON.stringify(item));
        ctx.addItem(item);
    }
    const DecrementQuantityHandler= (id) =>{
        ctx.removeItem(id);
    }

    const orderHandler = () =>{
        setShowCheckout(true);
    }
    
    const submitOrderHandler = async (userData) =>{
        const request = await fetch('https://moviesapi-ad08f-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json',{
            method: 'POST',
            //headers: 'Content-type: json',
            body: JSON.stringify({
                user: userData,
                orderedItems : cartItemList})
        });
        ctx.clearCart();
    }

    
    
    const cartItems = cartItemList.map((cartItem) => {
        return  <CartItem key={cartItem.id} cartItem={cartItem} 
                    onIncrement={IncrementQuantityHandler.bind(null,cartItem)} 
                    onDecrement={DecrementQuantityHandler.bind(null,cartItem.id)}/> 
        // return <li key={cartItem.id}>{cartItem.name}</li>
    });
    console.log(cartItems);
    return (
        <Modal onClose={props.OnCloseCart}>
        <div className={classes['cart-items']}>
            <ul>
                {cartItems}
            </ul>         
        </div>
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {showCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.OnCloseCart}/>}
        {!showCheckout && <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.OnCloseCart}>Close</button>
            {hasItems && <button onClick={orderHandler} className={classes['button']}>Order</button>}
        </div>}
        </Modal>
    );

}
export default Cart;