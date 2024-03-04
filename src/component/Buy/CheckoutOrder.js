import axios from "axios";
import { currentCart, currentRestaurant, currentUser } from "../../App";
import { useAtom } from 'jotai';
import { useState } from "react";
import { useLocation, useSearchParams } from 'react-router-dom';

export default function CheckoutOrder()
{
    const [cartItems, setCartItems] = useAtom(currentCart);
    const [restaurant, setRestaurant] = useAtom(currentRestaurant);
    const [queryParameters] = useSearchParams();
    const [user, setUser] = useAtom(currentUser);

    const [deliverySentBack, setSentBack] = useState([]);

    const [uniqueNames, setNames] = useState([]);

    let notes = queryParameters.get("notes") 
    let orario = queryParameters.get("deliveryTime")
    let pay = queryParameters.get("paymentMethod")

    console.log(notes); //
    console.log(orario);

    const [delivery, setDelivery] = useState({
        distance:restaurant.distance,
        expected_arrival:"",
        notes:notes,
        paymenthMethod:pay,
        restaurant_id:restaurant.id,
        user_id:user.id
    });

    function uniqueCategories(menuPar)
    {
        let names = cartItems.map(c => c.name);
        let nameSet = new Set(names);
        
        let uniqNames = [...nameSet]; 

        setNames(uniqNames);
    }


    function startTransaction()
    {
        axios.post("/delivery", delivery).then(
            (response) =>
            {
                setSentBack(response.data);
            }
        )

        let deliveryID = deliverySentBack.id
        
        let mapOfDishes = {}


        for(let i = 0; i < cartItems.length; i++)
        {                                           
            let quantity = 1;
            for(let k = 0; k < cartItems.length; k++)
            {
                if(cartItems[i].name == cartItems[k].name)
                quantity++;
            }
            mapOfDishes[cartItems[i].id] = quantity;
        }

        let mapSet = new Set(mapOfDishes);
        let ordered = Array.from(mapSet).sort();
        let orderedSet = new Set(ordered);

        for(let counter = 0; orderedSet.length; counter++)
        {
            let dishToDelivery = [{
                dish_id: orderedSet[counter][counter],
                delivery_id: deliveryID,
                price: 15,
                quantity: orderedSet[counter][counter]
            }] 

            axios.post("/dishtodelivery", dishToDelivery)
        }

    }


    return(
        <>
        <div className="d-flex justify-content-center">
            <div className="col-2">
                Shipped at - {orario}
                Expected arrival - {orario + (restaurant.distance)}

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