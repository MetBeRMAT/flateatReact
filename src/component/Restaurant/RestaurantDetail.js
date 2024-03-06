import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
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

    return (
        <>
            <div className="row gy-5 ms-4 mt-1 p-4 me-3" style={{ backgroundColor: '#fff', color: '#000' }}>
                <div className="col-9">
                    {categories.map((category, index) => (
                        <div key={index} style={{ marginBottom: '130px' }}> {/* Aggiungi un margine inferiore tra le categorie */}
                            <h5 style={{ fontWeight: 'bold', fontSize: '1.8rem', marginBottom: '10px', fontFamily: 'Back to Black, cursive' }}>{category}</h5> {/* Aggiungi un margine inferiore tra le categorie */}
                            <hr />
                            <div className="row row-cols-4 g-4">
                                {menu.dishes
                                    .filter(dish => dish.category === category)
                                    .map((dish, dishIndex) => (
                                        <div key={dishIndex} className="col-12 col-md-3 mb-4">
                                            <DishCard restaurantprice={restaurant.deliveryPricePerUnit} distancetot={restaurant.distance} {...dish} />
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
    
}