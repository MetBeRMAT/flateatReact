import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import OurMenu from "../Menu/OurMenu";
import { useAtom } from "jotai";
import { currentUser } from "../../App";
import DishCard from "../Dish/DishCard";

export default function RestaurantDetailNoLogin()
{
    let {id} = useParams();

    const [restaurant, setRestaurant] = useState([]);
    const [menu, setMenu] = useState([]);

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

    useEffect(
        () =>
        {
            axios.get("/menu/"+id).then(
                (response)=>
                {
                    setMenu(response.data);
                }
            );
        },
        []
    )

    let dishes = [];
    dishes = menu.dishes; 

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
            <dd> Opening at: {restaurant.openingH} - Closing at: {restaurant.closingH}</dd>
            <dd> {restaurant.open ? "OPEN" : "CLOSED"} </dd>
            <dd class="row"> Our Menu:  </dd> <div> {menu.dishes && menu.dishes.map(m => <DishCard {...m}/>)} </div>
            <p><button class="btn btn-info " type="button"><Link class="nav-link" to={"/restaurant"}>Back</Link></button></p>
        </dl>
        </>
    );
}