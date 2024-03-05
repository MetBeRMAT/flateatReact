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
            <div className="row gy-5 ms-3 mt-1 p-4 me-3" style={{ backgroundColor: '#fff', color: '#000' }}>
                <div className="col-3 p-4">
                <hr />
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
                <div className="input m-3 align-items-center">
                    <span className="input me-2" id="basic-addon2">
                    <strong>Recensioni:</strong>
                    </span>
                    <div>
                    <input
                        type="radio"
                        id="ascending"
                        name="reviewOrder"
                        value="asc"
                    />
                    <label htmlFor="ascending">Crescente</label>
                    </div>
                    <div>
                    <input
                        type="radio"
                        id="descending"
                        name="reviewOrder"
                        value="desc"
                    />
                    <label htmlFor="descending">Decrescente</label>
                    </div>
                </div>
                <hr />
                <button className="btn" style={{ marginTop: '10px'}}> 
                    <strong>Search -&gt;</strong>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/CapShield05.jpg/220px-CapShield05.jpg" alt="Search" style={{ width: '70px', height: '70px' }} />
                    
                </button>
                <br></br>
                <button className="btn" onClick={resetFilters} style={{ marginTop: '10px'}}> 
                    <strong style={{fontWeight: 'bold'}}>Reset -&gt;</strong>
                    <img src="https://m.media-amazon.com/images/I/91YvoWlpgYL.jpg" alt="Search" style={{ width: '70px', height: '70px' }} />
                </button>
            </div>

                    <div className="col-sm-15">
                        <h5 className="text-uppercase">Categories:</h5>
                        <div style={{ display: 'flex', flexWrap: 'wrap', width:'106%'}}>
                            <button className="btn btn-bg btn-primary" type="button">
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