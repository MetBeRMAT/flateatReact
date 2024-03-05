import { Link } from "react-router-dom";
import { currentCart, currentRestaurant } from "../../App";
import { useAtom } from "jotai";
import { useRef, useState } from "react";
import foto from  "./poke.png"

export default function DishCard(props)
{
    const [cartItems, setCartItems] = useAtom(currentCart);

    const addToCart = () =>
    {
        const newItem = 
        {
            id : props.id,
            name: props.name,
            category: props.category,
            price: props.price,
            quantity: 1
        };
        setCartItems([...cartItems,newItem])
    }

    const refItem = useRef(null);

    return (
        <body>

          <main role="main">

<div className="card card-container">
    <img className="card-img-top" src={foto} alt="Card image cap" />
      <div className="card-body bg-warning">
        <h3 className="card-title">{props.name} 
        </h3>
          <p className="card-text">Restaurant price: &euro;{props.restaurantprice}</p>
          <p className="card-text">Prezzo distanza: </p>
      <div className="d-flex justify-content-between align-items-center">
          <button type="button" className="btn btn-danger" ref={refItem} onClick={addToCart}>
            ORDINA ORA
          </button>
          <button type="button" className="btn btn-sm">
            CONSEGNA: &euro;{props.distancetot * props.restaurantprice}
          </button>
          <button type="button" className="btn btn-success">
            PREZZO: &euro;{props.price}
          </button>
      </div>
      </div>
</div>
            </main>
        </body>
      );
    };
