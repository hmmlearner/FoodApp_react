import React, {useRef, useState} from 'react';
import classes from './Checkout.module.css';

const isEmpty = (value) => value !== '';
const isPostcode5Char = (value) => value.length === 5;

const Checkout = (props)=>{
const [formValid, setFormValid] = useState({
name: true,
street: true,
postCode: true,
city: true
});
const nameInputRef = useRef();
const streetInputRef = useRef();
const postcodeInputRef = useRef();
const cityInputRef = useRef();
const confirmHandler =(e)=>{
    e.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostcode = postcodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    setFormValid({
        name: isEmpty(enteredName),
        street: isEmpty(enteredStreet),
        postCode: isPostcode5Char(enteredPostcode),
        city: isEmpty(enteredCity)
    })
    props.onConfirm({
        name: enteredName,
        street: enteredStreet,
        postCode: enteredPostcode,
        city: enteredCity
    });

    //props.orderConfirm({})
}
const nameControlClasses = `${classes.control} ${formValid.name ? '' : classes.invalid }`;
const streetControlClasses = `${classes.control} ${formValid.street ? '' : classes.invalid }`;
const postCodeControlClasses = `${classes.control} ${formValid.postCode ? '' : classes.invalid }`;
const cityControlClasses = `${classes.control} ${formValid.city ? '' : classes.invalid }`;

console.log(nameControlClasses);

return (
  <form className={classes.form} onSubmit={confirmHandler}>
    <div className={nameControlClasses}>
      <label htmlFor="name">Name</label>
      <input id="name" type="text" ref={nameInputRef}></input>
      {!formValid.name && <p>Name not valid</p> }
    </div>
    <div className={streetControlClasses}>
      <label htmlFor="street">Street</label>
      <input id="street" type="text" ref={streetInputRef}></input>
      {!formValid.street && <p>Street not valid</p> }
    </div>
    <div className={postCodeControlClasses}>
      <label htmlFor="postcode">Postcode</label>
      <input id="postcode" type="text" ref={postcodeInputRef}></input>
      {!formValid.postCode && <p>Postcode not valid</p> }
    </div>
    <div className={cityControlClasses}>
      <label htmlFor="city">City</label>
      <input id="city" type="text" ref={cityInputRef}></input>
      {!formValid.city && <p>City not valid</p> }
    </div>
    <div className={classes.actions}>
      <button className={classes.submit}>Confirm</button>
      <button type="button" onClick={props.Cancel}>
        Cancel
      </button>
    </div>
  </form>
);
}
export default Checkout;