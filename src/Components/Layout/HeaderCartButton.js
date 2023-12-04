import React,{useContext} from "react";
import CartIcon from "./CartIcon";
import Classes from './HeaderCartButton.module.css';
import CartContext from "../../Store/cart-context";

const HeaderCartButton = (props)=> {
    const ctx = useContext(CartContext);
    console.log(' context from cart context '+JSON.stringify(ctx.items))
    const totalCartItems = ctx.items.reduce((acc,item) => { 
            return acc+item.amount
        },0);
        console.log(totalCartItems);

    return (
        <React.Fragment>
        
        <button className={Classes.button} onClick={props.OpenCart}>
            <span className={Classes.icon}><CartIcon ></CartIcon></span>
            <span>Your Cart</span>
            <span className={Classes.badge}>{totalCartItems} </span>
            </button>
        </React.Fragment>
    );
}

export default HeaderCartButton;