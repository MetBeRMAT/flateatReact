import axios from "axios";
import { currentCart, currentPrice, currentRestaurant, currentUser } from "../../App";

import { useAtom } from 'jotai';
import { useState } from "react";
import { useLocation, useSearchParams } from 'react-router-dom';

export default function CheckoutOrder()
{
    const [cartItems, setCartItems] = useAtom(currentCart);
    const [restaurant, setRestaurant] = useAtom(currentRestaurant);
    const [queryParameters] = useSearchParams();
    const [user, setUser] = useAtom(currentUser);
    const [deliveryTotal, setTotalPrice] = useAtom(currentPrice)

    const [deliverySentBack, setSentBack] = useState([]);

    const [uniqueNames, setNames] = useState([]);

    let notes = queryParameters.get("notes") 
    let orario = queryParameters.get("deliveryTime")
    let pay = queryParameters.get("paymentMethod")

    let splittato = orario.split(":");
    let minuti = splittato[1];

    const [delivery, setDelivery] = useState({
        distance:restaurant.distance,
        expected_arrival: new Date(),
        notes:notes,
        paymenthMethod:pay,
        restaurant_id:restaurant.id,
        user_id:user.id
    });

    function startTransaction()
    {
        let deliveryId;
        axios.post("/delivery", delivery).then(
            (response) =>
            {
                setSentBack(response.data);
                deliveryId = response.data.id;
                let list = [...cartItems];
        let countedItems = {};

        for (let i = 0; i < cartItems.length; i++) 
        {
            let quantity = 0;
            for (let k = 0; k < cartItems.length; k++) 
            {
                if (i !== k && cartItems[i].name === cartItems[k].name) 
                {
                    quantity++;
                }
            }
            list[i].quantity = quantity + 1;
            countedItems[cartItems[i].name] = true;
        }

        list = list.filter((item, index) => {
            return cartItems.findIndex(d => d.name === item.name) === index;
        });
        console.log(list);
        
        
        for(let j = 0; j < list.length; j++)
        {
            let dishToDelivery = {
                dish_id: list[j].id,
                delivery_id: deliveryId,
                price: deliveryTotal,
                quantity: list[j].quantity
            }

            console.log(dishToDelivery);

            axios.post("/dishToDelivery", dishToDelivery)
        }
            }
        )

        

    }


    return(
        <>
        <div className="d-flex justify-content-center">
            <div className="col-2">
                Shipped at - {orario}
                Expected arrival - {orario + (restaurant.distance*2)}

                Your notes - {notes}
            </div>
            <div className="row row-cols-3 g-4" style={{marginTop:"0%"}}>
                {cartItems.map(i => <ShowCart {...i}/>)}
                Total price: 
            </div>
            <button className="btn btn-success" onClick={startTransaction}>PAGAH</button>
        </div>
        </>
    );

    function ShowCart(props)
    {
        return(
            <>
                <div> {props.name} </div>
            </>
        )
    }
}