import { useState } from "react";
import DishCard from "../Dish/DishCard";

export default function(props)
{
    const [dish,setNewDish] = useState([]);
    
    let dishes = props.dishes

    function MenuGrid()
    {
        <div className="row row-cols-2 g-4" style={{marginTop:"0%"}}>
            {
                dishes.map(d=><DishCard {...d} />)
            }
        </div>
    }
    return(
        <MenuGrid/>
    );
}