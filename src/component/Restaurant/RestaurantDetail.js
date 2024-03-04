import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import OurMenu from "../Menu/OurMenu";
import { useAtom } from "jotai";
import { currentRestaurant, currentUser } from "../../App";
import DishCard from "../Dish/DishCard";

export default function RestaurantDetail()
{
    let {restaurantId} = useParams();

    const [user, setUser] = useAtom(currentUser);
    const [restaurant, setRestaurant] = useState([]);
    const [menu, setMenu] = useState([]);
    const [categories, setCategories] = useState([]);
    const [ristoranteAttuale, setRistoranteAttuale] = useAtom(currentRestaurant);
    
    // const [menuItems, setThisShit] = useState([]);

    useEffect(
        ()=>
        {
            axios.get("/restaurant/"+restaurantId+"/"+user.id).then(
                (response)=>
                {
                    setRestaurant(response.data);
                    setRistoranteAttuale(response.data)
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
                    uniqueCategories(response.data);
                }
            );
            
        },
        []
    )
    
    function uniqueCategories(menuPar)
    {
        let categories = menuPar.dishes.map(c => c.category);
        let categoriesSet = new Set(categories);
        
        let uniqueCategory = [...categoriesSet]; 

        setCategories(uniqueCategory);
    }

    function showColCategories()       
    {
        let res = [];
        for(let k = 0; k < categories.length; k++)
        {

            let cat = [];
            cat.push(<div className="">{categories[k]}</div>)
            for(let i = 0; i < menu.dishes.length; i++)
            {
                if(categories[k] == menu.dishes[i].category)
                {
                    cat.push(            <DishCard restaurantprice={restaurant.deliveryPricePerUnit} distancetot={restaurant.distance} name={menu.dishes[i].name}/>)
                }
            }
            res.push(cat);
        }
        return res;
    }

    return(
        <>
            <section className="jumbotron text-center">
                <div className="container">
                    <h1 className="jumbotron-heading">{restaurant.name}'s Restaurant</h1>
                    <h4> Opening at: {restaurant.openingH} - Closing at: {restaurant.closingH}</h4>
                    <h3> {restaurant.open ? "OPEN" : "CLOSED"} </h3>
                </div>
            </section> 
            <dl className="row text-bg-warning m-3" style={{width:"100%"}}>
                <dt className="col-sm-3"></dt>
                <dt className="col-sm-2"></dt>
            </dl>
            <div className="container mt-4">
                <h2 className="text-center mb-4">Menù del Ristorante</h2>
                
                <div className="row">
                


                <div className="col-sm-9 " style={{width:"100%"}}>
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                    {categories && showColCategories()}
                        {/* {menu.dishes && 
                        menu.dishes.map((m, index) => (

                        <div key={index} className="col">
                            <DishCard {...m} />
                        </div>
                        ))} */}
                    </div>
                    </div>
                </div>

    

                <div className="mt-4">
                    <button className="btn btn-primary" type="button">
                    <Link className="text-white" to="/restaurantlogged">
                        Torna al Ristorante
                    </Link>
                    </button>
                </div>
               </div>

               

        </>
    );
}