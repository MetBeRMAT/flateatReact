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
    const [selectedCategory, setSelectedCategory] = useState(null);
    
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

    function handleCategoryClick(category) {
        setSelectedCategory(category);
    }

    function resetFilters() {
        setSelectedCategory(null);
    }

    // function showColCategories()        //'sta funzione ne grafica uno perchè al return esce, se qualcuno trova un modo per farla graficare dieci volte abbiamo le colonne
    // {
    //     for(let i = 0; i < menu.dishes.length; i++)
    //     {
    //         for(let k = 0; k < categories.length; k++)
    //         {
    //             if(categories[k] == menu.dishes[i].category)
    //             {
                    
    //                 {<div>{menu.dishes[i].name}</div>}
                
    //             }
    //         }
    //     }
    // }

    // function showCategoryName(name)       //Questa voleva aiutare la funzione sopra ma non so come
    // {
    //     return(
    //         <div>{name}</div>
    //     );
    // }

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
                    <div className="col-sm-15">
                        <h5 className="text-uppercase">Categories:</h5>
                        <div style={{ display: 'flex', flexWrap: 'wrap', width:'106%'}}>
                            <button className="btn btn-bg btn-primary" type="button" onClick={resetFilters}>
                                Reset Filtri
                            </button>   
                            {categories && categories.map((c, index) => (
                                <div
                                    key={index}
                                    className={`col-sm-2 ${selectedCategory === c ? 'selected-category' : ''}`}  
                                    style={{ cursor: 'pointer', border: '1px solid #ccc', padding: '5px', margin: '5px' }}
                                    onClick={() => handleCategoryClick(c)}
                                >
                                    {c}
                                </div>
                            ))}
                        </div>                            
                    </div>

                    

                    <div className="col-sm-9" style={{ width: "100%" }}>
                        <div className="row row-cols-1 row-cols-md-3 g-4">
                            {menu.dishes &&
                                menu.dishes
                                    .filter((dish) => !selectedCategory || dish.category === selectedCategory) // Filtra i piatti x categoria
                                    .map((m, index) => (
                                        <div key={index} className="col">
                                            <DishCard restaurantprice={restaurant.deliveryPricePerUnit} distancetot={restaurant.distance} {...m} />
                                        </div>
                                    ))}
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
            
               {/* {categories && showColCategories()} */}

        </>
    );
}