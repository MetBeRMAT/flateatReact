import { Link } from "react-router-dom";
import { currentCart } from "../../App";
import { useAtom } from "jotai";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { currentRestaurant } from "../../App";

export default function DishCard(props)
{
    const [cartItems, setCartItems] = useAtom(currentCart);
    const [restaurant,setRestaurant] = useAtom(currentRestaurant)

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


    return(
        <>
        <div class="col-md-3" style={{marginLeft:"5%"}}>
            <div className="card text-center mb-3" style={{width:"17rem", marginLeft:"-15%", marginTop:"5%"}}>
                        <div className="col-12"> 
                            <label for="quest" className="form-label">Our sexy Dish# {props.id}</label>
                        </div>
                        <div className="col-12"> 
                            <label for="quest" className="form-label">{props.name}</label>
                            <p> Category: {props.category}</p>
                            <p> prezzo piatto: {props.price}</p>
                            <p> restaurant price: {props.restaurantprice}</p>
                            <p> prezzo distanza: {restaurant.deliveryPricePerUnit}</p>
                            <button className="btn btn-primary" onClick={addToCart}>+</button>
                        </div>
            </div>
        </div>
        </>
    );
}