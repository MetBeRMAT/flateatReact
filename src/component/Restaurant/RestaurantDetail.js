import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import OurMenu from "../Menu/OurMenu";
import { useAtom } from "jotai";
import { currentUser } from "../../App";
import DishCard from "../Dish/DishCard";

export default function RestaurantDetail()
{
    let {restaurantId} = useParams();

    const [user, setUser] = useAtom(currentUser);
    const [restaurant, setRestaurant] = useState([]);
    const [menu, setMenu] = useState([]);

    useEffect(
        ()=>
        {
            axios.get("/restaurant/"+restaurantId+"/"+user.id).then(
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
            axios.get("/menu/"+restaurantId).then(
                (response)=>
                {
                    setMenu(response.data);
                }
            );
        },
        []
    )
    
    function setCategories()
    {
        let categories = menu.dishes.map(c => c.category);
        let category = []; let counter = 0;
        category.push(categories[0]);
        for(let i = 0; i < categories.size; i++)
        {
            if(categories[i] == category[counter])
                counter++;
        }
    }

    return(
        <>
        <dl class="row text-bg-warning m-3" style={{width:"50%"}}>
            <dt class="col-sm-3"></dt>
            <dt style={{fontFamily:"Times New Roman,Serif"}} class="col-sm-3">{restaurant.name}'s Restaurant</dt>
            <dt class="col-sm-2"></dt>
            <dd> Opening at: {restaurant.openingH} - Closing at: {restaurant.closingH}</dd>
            <dd> {restaurant.open ? "OPEN" : "CLOSED"} </dd>
            <p class=""> Our Menu:  </p> {menu.dishes && menu.dishes.map(c => <div> Category - {c.category} </div>)}
            <div className="row cols-4 g-4 p-2"> {menu.dishes && menu.dishes.map(m => <DishCard {...m}/>)} </div>
            <p><button class="btn btn-info " type="button"><Link class="nav-link" to={"/restaurantlogged"}>Back</Link></button></p>
        </dl>
        </>
    );
}