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

    function handleCategoryClick(category) {
        setSelectedCategory(category);
    }

    function resetFilters() {
        setSelectedCategory(null);
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
                    cat.push(<DishCard restaurantprice={restaurant.deliveryPricePerUnit} distancetot={restaurant.distance} name={menu.dishes[i].name} price={menu.dishes[i].price} id={menu.dishes[i].id}/>)
                }
            }
            res.push(cat);
        }
        return res;
    }

    return(
        <>
            <div className="row gy-5 ms-4 mt-1 p-4 me-3" style={{ backgroundColor: '#fff', color: '#000' }}>
                <div className="col-3 p-4">
                    <h5 className="text-uppercase" style={{fontWeight: 'bold' }}>Categories:</h5>
                    <hr></hr>
                    <div>  
                        {categories && categories.map((c, index) => (
                            <div key={index} style={{ marginBottom: '5px' }}>
                                <div
                                    className={`col ${selectedCategory === c ? 'selected-category' : ''}`}  
                                    style={{ cursor: 'pointer', padding: '5px', margin: '5px', display: 'block', fontFamily: 'Arial, sans-serif' }} // Rimuovi bordi e aggiungi stile del testo
                                    onClick={() => handleCategoryClick(c)}
                                >
                                    {c}
                                </div>
                                {index !== categories.length - 1 && <hr />} {/* Aggiungi HR tranne per l'ultimo elemento */}
                            </div>
                        ))}
                    </div> 
                    <hr />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <button className="btn" onClick={resetFilters} style={{ marginBottom: '10px'}}> 
                            <strong style={{fontWeight: 'bold'}}>Reset -&gt;</strong>
                            <img src="https://m.media-amazon.com/images/I/91YvoWlpgYL.jpg" alt="Search" style={{ width: '70px', height: '70px' }} />
                        </button>
                        <button className="btn " style={{ marginBottom: '10px' }}>
                            <strong style={{fontWeight: 'bold'}}>Go Back -&gt;</strong>
                            <Link className="text-white" to="/restaurantlogged">
                                <img src="https://png.pngtree.com/png-clipart/20191120/original/pngtree-restaurant-icon-vector-png-image_5045307.jpg" style={{ width: '70px', height: '70px' }} />
                            </Link>
                        </button>
                    </div>
                </div>
                <div className="col-9">
                    <div className="row row-cols-4 g-4" style={{ marginTop: "0%" }}>
                        {menu.dishes &&
                            menu.dishes
                                .filter((dish) => !selectedCategory || dish.category === selectedCategory) // Filtra i piatti per categoria
                                .map((m, index) => (
                                    <div key={index} className="col-12 col-md-3 mb-4"> {/* Imposta 4 colonne su dispositivi md e 12 colonne su dispositivi più piccoli */}
                                        <DishCard restaurantprice={restaurant.deliveryPricePerUnit} distancetot={restaurant.distance} {...m} />
                                    </div>
                                ))}
                    </div>
                </div>
            </div>
        </>
    );
}