import React, {useRef, useState} from "react";
import classes from './MealItemForm.module.css';
import Input from "../UI/Input";


const MealItemForm =(props) =>{
    console.log(props);
    const inputCRef = useRef();
    
    const [validQuantity, setValidQuantity] = useState(false); // this is temp i belive this needs to go to context
    const OnInputEnteredHandler = (event) =>{
        event.preventDefault();
        const enteredAmount = +inputCRef.current.inputRef;
        if(enteredAmount < 0 || enteredAmount > 5){
            setValidQuantity(false)
            return; 
        }
           //setCartItems(inputCRef.current.inputRef)
        console.log(inputCRef.current.inputRef+ ' Form addtocart '+JSON.stringify(inputCRef));
        props.OnEnteredQuantity(enteredAmount);
    }

return (
    <form className={classes.form} onSubmit={OnInputEnteredHandler}>
    <Input label= "quantity" ref={inputCRef} input={{
        type:"number",
        id:"quantity_"+props.id,
        min: 1,
        max:5,
        step:1,
        defaultValue:1
    }}/>
    <button>+ Add</button>
    {!validQuantity && <p>Please enter valid quantity</p>}
    </form>
);
}

export default MealItemForm;