import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import OurMenu from "../Menu/OurMenu";

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
        <dl class="row text-bg-warning m-3">
            <dt class="col-sm-3"></dt>
                <dd class="col-sm-9">
                    <p></p>
                    <p></p>
                </dd>
            <dt style={{fontFamily:"Times New Roman,Serif"}} class="col-sm-3">Restaurant: {restaurant.name}</dt>
            <dt class="col-sm-3"></dt>
            <dd style={{fontFamily:"Times New Roman,Serif"}} class="col-sm-3">WeFlat are on: ({restaurant.positionX} - {restaurant.positionY})</dd>
            <dd> Opening at: {restaurant.openingHour} - Closing at: {restaurant.closingHour}</dd>
            {/* <dd class="row"> Our Menu: {restaurant.menu.map(m => <OurMenu {...m}/>)} </dd> */}
            <p><button class="btn btn-info " type="button"><Link class="nav-link" to={"/restaurant"}>Back</Link></button></p>
        </dl>
        </>
    );
}