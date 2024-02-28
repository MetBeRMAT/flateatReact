import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function RestaurantDetail()
{
    let {id} = useParams();
    const [restaurant, setRestaurant] = useState([]);
    useEffect(
        ()=>
        {
            axios.get("/restaurants/"+id).then(
                (response)=>
                {
                    setRestaurant(response.data);
                }
            );
        },
        []
    )

    return(
        <>
        <div> Ristorante# {restaurant.id} </div>
        <div> Nome: {restaurant.name} <p>({restaurant.positionX},{restaurant.positionY})</p></div>
        <div> Opening at: {restaurant.openingHour} - Closing at: {restaurant.closingHour}</div>
        </>
    );
}