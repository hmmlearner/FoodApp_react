import React,{ useReducer} from "react";
import CartContext from "./cart-context";
import { act } from "react-dom/test-utils";

const defaultCartItems = {
    items:[],
    totalAmount: 0
}

const cartReducer = (state, action) => {
  if (action.type === "ADD_TO_CART") {
    console.log(" All items " + JSON.stringify(state.items));
    console.log(" current item " + JSON.stringify(action.item));
    const updatedTotalAmount =
      state.totalAmount + action.item.amount * action.item.price;
    const itemsExists = state.items.filter((item) => {
      return item.id === action.item.id;
    });
    if (itemsExists.length > 0) {
      let index = state.items.findIndex((el) => {
        return el.id === action.item.id;
      });
      state.items[index].amount = state.items[index].amount + 1;
      return {
        items: state.items,
        totalAmount: updatedTotalAmount,
      };
    } else {
      const updatedItems = state.items.concat(action.item);
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }
  } else if (action.type === "REMOVE_FROM_CART") {
    //remove item that matchs state.id from state.items
    let index = state.items.findIndex((el) => {
      return el.id === action.id;
    });
    const updatedTotalAmount = state.totalAmount - state.items[index].price;
    if (state.items[index].amount > 1) {
      state.items[index].amount = state.items[index].amount - 1;
      const newItems = [...state.items];
      return {
        items: newItems,
        totalAmount: updatedTotalAmount,
      };
    } else {
      const newItems = [...state.items];
      newItems.splice(action.id, 1);
      return {
        items: newItems,
        // totalAmount: updatedTotalAmount,
      };
    }
  }
  if (action.type === "CLEAR") {
    return defaultCartItems;
  }
  return defaultCartItems;
};



export const CartProvider = (props)=>{
    const [cartState, cartDispatch] = useReducer(cartReducer, defaultCartItems);

    const OnAddItemHandler = (item)=>{
        cartDispatch({type: 'ADD_TO_CART', item: item});
        
        //setAddSItem((prevState) => { return [...prevState,item]});
    }
    const OnRemoveItemHandler = (id) =>{
        cartDispatch({type:'REMOVE_FROM_CART', id:id})
        //filter .
    }
    const OnClearCartHandler = () =>{
      cartDispatch({type: 'CLEAR'})
    }
    const cartContext = {
        items:cartState.items, 
        totalAmount:cartState.totalAmount,
        addItem:OnAddItemHandler, 
        removeItem:OnRemoveItemHandler, 
        clearCart: OnClearCartHandler
    };
    return (
        <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>

    )
}
export default CartProvider;