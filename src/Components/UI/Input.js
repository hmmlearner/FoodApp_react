import React, {useImperativeHandle, useRef} from 'react';
import classes from './Input.module.css';

const Input =(props, ref)=> {
  const inputRef = useRef();
  useImperativeHandle(ref, () => {
    console.log('in the imperativeHandler '+inputRef.current.value);
    return{
      inputRef: inputRef.current.value
    };
  });

  return (
    <div className={classes}>
        <label htmlFor={props.input.id}>{props.label}</label>
        <input {...props.input} ref={inputRef}></input>
    </div>
  );
}

export default React.forwardRef(Input);
