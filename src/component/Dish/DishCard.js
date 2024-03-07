import { Link } from "react-router-dom";
import { currentCart, currentOpenCart, currentRestaurant } from "../../App";
import { useAtom } from "jotai";
import { useRef, useState } from "react";
import foto from "./poke.png"

export default function DishCard(props) {
  const [cartItems, setCartItems] = useAtom(currentCart);
  const [isCartOpen, setIsCartOpen] = useAtom(currentOpenCart);

  const addToCart = () => {
    const newItem =
    {
      id: props.id,
      name: props.name,
      category: props.category,
      price: props.price,
      quantity: 1
    };


    const existingItem = cartItems.findIndex((item) => item.name == props.name)

    if (existingItem !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItem].quantity++;
      setCartItems(updatedCartItems);
    }
    else {
      setCartItems([...cartItems, newItem]);
    }
    setIsCartOpen(true);
  }

  const refItem = useRef(null);

  return (
    <div className="card card-container" style={{ position: 'relative', height: 'auto' }}>
      <img className="card-img-top" src={foto} alt="Card image cap" style={{ width: '100%', height: 'auto' }} />
      <div className="card-body" style={{ backgroundColor: '#fff' }}>
        <h1 className="card-title" style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '30px' }}>{props.name}</h1>
        <div className="d-flex justify-content-between align-items-center">
          <button type="button" className="btn btn-danger" ref={refItem} onClick={addToCart} >
            Ordina ora
          </button>
        </div>
      </div>
      <div className="status-info" style={{ position: 'absolute', bottom: '0px', right: '3px', padding: '1px' }}>
        <h3 style={{ fontSize: '1.3rem' }}>
          {props.price}&euro;
        </h3>
      </div>
    </div>
  );
};
