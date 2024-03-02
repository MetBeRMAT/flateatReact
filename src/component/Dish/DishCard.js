import { currentCart } from "../../App";
import { useAtom } from "jotai";
import { useRef, useState } from "react";
import foto from  "./poke.png"

export default function DishCard(props)
{
    const [cartItems, setCartItems] = useAtom(currentCart);

    // function addToCart()
    // {
    //     let clone = [cartItems];
    //     clone.push(refItem.current.value);
    //     setCartItems(clone);
    // }
    const addToCart = () =>
    {
        const newItem = 
        {
            id : props.id,
            name: props.name,
            category: props.category,
            price: props.price,
        };
        setCartItems([...cartItems,newItem])
    }

    const refItem = useRef(null);

    // const addToCart = (product) => 
    // {
    //     setCartItems([...cartItems, product]);
    // };


    return (
        <body>

          <main role="main">

      {/* <section class="jumbotron text-center">
          <div class="container">
          <h1 class="jumbotron-heading">HO RISOLTO LOREEEEEE</h1>
          <p class="lead text-muted">INTANTO VADO IN BAGNO</p>
          <p>
              <a href="#" class="btn btn-primary my-2">diteme voi</a>
              <a href="#" class="btn btn-secondary my-2">te posso canta na canzone</a>
          </p>
          </div>
      </section> */}

<div className="card card-container">
    <img className="card-img-top" src={foto} alt="Card image cap" />
      <div className="card-body bg-warning">
        <h3 className="card-title">{props.name} 
          <button type="button" className="btn btn-info" ref={refItem} onClick={addToCart}>
            DETTAGLI
          </button>
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
